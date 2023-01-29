import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const initialForm = {
  model: "text-davinci-003",
  size: "256x256",
  n: 1,
  temperature: 1,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  bestOf: 1,
  text: "",
  topText: "",
};

const useDebug = (form, chatLog, user) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") console.log("form", form);
  }, [form]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") console.log("chatLog", chatLog);
  }, [chatLog]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") console.log(user);
  }, [user]);
};

/*
 * This is a wrapper component that provides context to all the components.
 * This includes user, form, and chatLog.
 */

export const useChat = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [chatLog, setChatLog] = useState([]);
  const [allowEnterToSubmit, setAllowEnterToSubmit] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [openSidebar, setOpenSidebar] = useState(false);
  useDebug(form, chatLog, user);

  // useEffect(() => {
  //   const messagesString = localStorage.getItem("messages");
  //   const messagesArray = JSON.parse(messagesString) || [];
  //   setChatLog(messagesArray);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "messages",
  //     JSON.stringify(
  //       chatLog.map((message) => {
  //         return {
  //           ...message,
  //           selected: false,
  //         };
  //       })
  //     )
  //   );
  // }, [chatLog]);

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { messages, user } = res.data;
        console.log(res.messages);
        setUser(user);
        setChatLog(
          messages.map((message) => {
            return {
              ...message,
              user: message.isBot ? "OpenAI" : "User",
              timestamp: message.createdAt,
            };
          })
        );
      })
      .catch((err) => console.error(err))
      .then(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (value[value.length - 1] === "Enter" && allowEnterToSubmit) {
      return handleSubmit(event);
    }
    setForm({ ...form, [name]: value });
  };

  const toggleCheck = (user, index) => {
    setChatLog((prev) => {
      let copy = [...prev];
      const updatedCheck = !copy[index].selected;
      copy[index].selected = updatedCheck;

      // this part of the code is to make sure both the prompt and the answer to the prompt are being submitted to openai
      const isUser = user === "OpenAI" ? -1 : 1;
      copy[index + isUser].selected = updatedCheck;

      return copy;
    });
  };

  const submitImage = () => {
    const payload = {
      prompt: form.text,
      n: form.number,
      size: form.size,
    };

    axios
      .post("/api/message/image", { payload, text: form.text })
      .then((response) => {
        setChatLog((prev) => {
          return [
            ...prev,
            {
              user: "OpenAI",
              timestamp: Date.now(),
              selected: true,
              imageUrl: response.data.image,
            },
          ];
        });
      })
      .catch((error) => {
        console.error(error);
        setChatLog((prev) => {
          return [
            ...prev,
            {
              user: "OpenAI",
              timestamp: Date.now(),
              text: "Could not send message.",
              selected: true,
              error: true,
            },
          ];
        });
      })
      .then(() => {
        setIsSending(false);
      });
  };

  // don't forget to handle edge cases such as empty text field
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return console.log("already sending");
    if (!form.text.length || !form.text.trim().length)
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid message",
      });
    setIsSending(true);

    // parse the prompt into a Q/A pair
    const selectedMessages = chatLog
      .filter((message) => message.selected)
      .map(
        (message) =>
          `${message.user === "OpenAI" ? "A:" : "Q:"}: ${message.text}${
            message.user === "OpenAI" ? "\n" : ""
          }`
      )
      .join("\n");

    const prompt =
      form.topText + "\n" + selectedMessages + "\n" + form.text + "\nA:";

    const max = form.model === "text-davinci-003" ? 3500 : 1500;
    const max_tokens = parseInt(max - prompt.length / 4);

    if (max_tokens <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Prompt is too long",
        text: "Please remove some of the selected messages",
      });
    }

    console.log({ prompt, max_tokens });

    // create payload
    // prompt should be: pinned + selected previous messages + current text

    const payload = {
      model: form.model,
      temperature: form.temperature,
      top_p: form.topP,
      frequency_penalty: form.frequencyPenalty,
      presence_penalty: form.presencePenalty,
      best_of: form.bestOf,
      prompt,
      max_tokens,
    };

    // add new message to chat log and clear form
    // add message to chatLog array
    setChatLog((prev) => {
      return [
        ...prev,
        {
          user: "User",
          timestamp: Date.now(),
          text: form.text,
          selected: true,
        },
      ];
    });
    setForm((prev) => {
      return { ...prev, text: "" };
    });

    if (form.model === "image-dalle-002") return submitImage();

    axios
      .post("/api/message/text", { payload, text: form.text })
      .then((response) => {
        console.log(response.data);
        setChatLog((prev) => {
          return [
            ...prev,
            {
              user: "OpenAI",
              timestamp: Date.now(),
              text: response.data.text,
              selected: true,
            },
          ];
        });
      })
      .catch((error) => {
        setChatLog((prev) => {
          return [
            ...prev,
            {
              user: "OpenAI",
              timestamp: Date.now(),
              text: "Could not send message.",
              selected: true,
              error: true,
            },
          ];
        });

        console.error(error);
      })
      .then(() => {
        setIsSending(false);
      });
  };

  return {
    user,
    setUser,
    loading,

    openSidebar,
    setOpenSidebar,
    chatLog,
    setChatLog,
    allowEnterToSubmit,
    setAllowEnterToSubmit,
    isSending,
    setIsSending,
    form,
    setForm,
    handleChange,
    toggleCheck,
    handleSubmit,
  };
};
