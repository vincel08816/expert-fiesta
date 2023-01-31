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
  topText:
    "Wrap code blocks in 3 backticks followed by the language and a new line. But don't do that with for non-code responses",
};

const useDebug = (form, chatLog, user) => {
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") console.log("form", form);
  // }, [form]);
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") console.log("chatLog", chatLog);
  // }, [chatLog]);
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "development") console.log("user", user);
  // }, [user]);
};

/*
 * This is a wrapper component that provides context to all the components.
 * This includes user, form, and chatLog.
 */

export const useChat = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(); // selected Conversation index

  const [chatLog, setChatLog] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [openSidebar, setOpenSidebar] = useState(false);
  useDebug(form, chatLog, user);

  // listener for conversation selection; changes when selected or converation length changes
  useEffect(() => {
    if (conversations?.length > 0 && typeof selected !== "undefined") {
      axios
        .get(`/api/message/` + conversations[selected]?._id)
        .then((res) => {
          const messages = res.data.messages.map((message) => {
            return {
              ...message,
              user: message.isBot ? "OpenAI" : user.username,
            };
          });

          setChatLog(messages);
        })
        .catch((err) => console.error(err));
    }
  }, [selected, conversations?.length]);

  // default is new chat without a name
  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { user, conversations } = res.data;
        setUser(user);
        setConversations(conversations);
        console.log(conversations);
      })
      .catch((err) => console.error(err))
      .then((_) => setLoading(false));
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const toggleCheck = (user, index) => {
    setChatLog((prev) => {
      let copy = [...prev];
      copy[index].selected = !copy[index].selected;
      return copy;
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
          `${message.isBot ? "OpenAI:" : "User:"}: ${message.text}${
            message.isBot ? "\n" : ""
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

    const payload =
      form.model === "image-dalle-002"
        ? {
            prompt: form.text,
            n: form.number,
            size: form.size,
          }
        : {
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

    const index = chatLog.length; // index of new message from user
    setChatLog((prev) => [
      ...prev,
      {
        user: user.username,
        isBot: false,
        updatedAt: Date.now(),
        text: form.text,
        selected: true,
      },
    ]);
    setForm((prev) => {
      return { ...prev, text: "" };
    });

    // if (form.model === "image-dalle-002") return submitImage(index);

    console.log(
      "conversationId",
      conversations.length && selected && conversations[selected]._id
    );

    const axiosUrl =
      form.model === "image-dalle-002"
        ? "/api/message/image"
        : "/api/message/text";

    axios
      .post(axiosUrl, {
        payload,
        text: form.text,
        conversationId:
          selected !== undefined ? conversations[selected]._id : undefined,
      })
      .then((response) => {
        const { openAIResponse, conversation, userMessageId } = response.data;
        console.log(response.data);
        setChatLog((prev) => {
          let prevCopy = [...prev];
          prevCopy[index]._id = userMessageId; // replace FE sent message with real message id
          prevCopy.push({ ...openAIResponse, user: "OpenAI", selected: true });
          return prevCopy;
        });

        if (selected === undefined) {
          setConversations((prev) => [conversation, ...prev]);
          setSelected(0);
        }
      })
      .catch((error) => {
        setChatLog((prev) => [
          ...prev,
          {
            user: "OpenAI",
            updatedAt: Date.now(),
            text: "Could not send message.",
            selected: true,
            error: true,
          },
        ]);

        console.error(error);
      })
      .then(() => {
        setIsSending(false);
      });
  };

  return {
    /* User Data */
    user,
    setUser,
    loading,

    /* Selecting Chat */
    conversations,
    setConversations,
    selected,
    setSelected,

    /* Chat Data */
    openSidebar,
    setOpenSidebar,
    chatLog,
    setChatLog,
    isSending,
    setIsSending,
    form,
    setForm,
    handleChange,
    toggleCheck,
    handleSubmit,
  };
};
