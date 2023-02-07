import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useFormContext } from "../../contexts/FormContext";
import useWindowSize from "../../hooks/useWindowSize";
import { useUserContext } from "../../pages/_app";
import DotLoader from "../DotLoader";
import IconsWithTooltips from "../IconsWithTooltips";
import ChatLog from "./ChatLog";

const Content = () => {
  const { user, conversations, setConversations } = useUserContext();
  const { form, handleChange, clearText } = useFormContext();
  const {
    setChatLog,
    chatLog,
    toggleCheck,
    autoSelect,
    selected,
    setSelected,
    // isSending,
  } = useAppContext();
  const { width } = useWindowSize();

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;
    if (!form.text.length || !form.text.trim().length)
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid message",
      });
    setIsSending(true);

    // 1. Manually selecting messages to send as chat history.
    const max = form.model === "text-davinci-003" ? 3500 : 1500;

    const length = 6 > chatLog.length ? 0 : chatLog.length - 6;
    let selectedMessages = autoSelect
      ? chatLog.slice(length)
      : chatLog.filter((message) => message.selected);

    while (selectedMessages?.length) {
      const temp = selectedMessages
        .map(
          (message) =>
            `${message.isBot ? "\n AI:" : "\n Human:"}: ${message.text}${
              message.isBot ? "\n" : ""
            }`
        )
        .join("\n");
      const prompt =
        form.topText + "\n" + temp + "Human:\n" + form.text + "\nAI:";
      const max_tokens = parseInt(max - prompt.length / 4);

      if (max_tokens >= 0) {
        break;
      } else {
        selectedMessages.shift();
      }
    }

    selectedMessages = selectedMessages.map(
      (message) =>
        `\n${message.isBot ? "\n AI" : "\n Human"}: ${message.text}${
          message.isBot ? "\n" : ""
        }`
    );

    const prompt =
      form.topText +
      "\n" +
      selectedMessages +
      "\n Human:" +
      form.text +
      "\nAI:";

    const max_tokens = parseInt(max - prompt.length / 4);

    if (max_tokens <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Prompt is too long",
        text: "Please remove some of the selected messages",
      });
    }

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
            stop: [" Human:", " AI:"],
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

    clearText();

    // console.log(
    //   "conversationId",
    //   conversations.length && selected && conversations[selected]._id
    // );

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

  return (
    <>
      {/* chatLog */}
      <ChatLog
        chatLog={chatLog}
        setChatLog={setChatLog}
        toggleCheck={toggleCheck}
      />

      {/* input field */}
      <Box
        data-tut="reactour__chat-input"
        sx={{
          flex: 0,
          margin: "0 15px 20px 15px",
          backgroundColor: "white",
          bottom: 0,
          pt: 1,
        }}
      >
        <Box
          sx={{
            mt: 0,
            p: 0.5,
            pr: 1.5,
            pt: 0.8,
            pb: 0.2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,.1);",
          }}
        >
          <TextareaAutosize
            placeholder="Message @OpenAI"
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(e)
            }
            value={form.text}
            name={"text"}
            onChange={handleChange}
            style={{
              fontSize: width > 600 ? 14 : 13,
              padding: "10px 20px",
              minHeight: 22,
              maxHeight: 350,
              resize: "none",
              flex: 1,
              overflow: "auto",
              fontFamily: "Noto Sans, sans-serif",
              border: "none",
              outline: "none",
            }}
          />

          {isSending ? <DotLoader /> : ""}

          {form.text?.trim().length > 0 && !isSending ? (
            <IconsWithTooltips
              sx={{ m: 0, p: 0, mt: -0.5 }}
              title="Submit"
              Icon={SendIcon}
              onClick={handleSubmit}
            />
          ) : (
            ""
          )}

          {/* add character count here */}
        </Box>
        <Box
          sx={{
            textAlign: "center",
            lineHeight: 0.5,
            mt: 1,
            mb: -1,
            flex: 0,
          }}
        >
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            Check out my project on{" "}
            <a
              style={{ color: "inherit" }}
              href="https://github.com/vincel08816/expert-fiesta"
              target="_blank"
            >
              GitHub
            </a>
            . Please visit my{" "}
            <a
              style={{ color: "inherit" }}
              href="https://linkedin.com/in/vincentlee28/"
              target="_blank"
            >
              LinkedIn
            </a>{" "}
            page if you are hiring, I'd love to talk more!
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Content;
