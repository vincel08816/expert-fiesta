import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormContext } from "../../contexts/FormContext";
import { appendBotMessage, appendChatLog } from "../../store/chatLogSlice";
import {
  prependConversation,
  setSelected,
} from "../../store/conversationsSlice";
import DotLoader from "../DotLoader";
import IconsWithTooltips from "../IconsWithTooltips";
import ChatLog from "./ChatLog";
import GenerationTypeSelector from "./GenerationTypeSelector";

// what's included in this file?
// ChatLog, chatbox, and footer

const Content = () => {
  const [isSending, setIsSending] = useState(false);
  const { form, handleChange, clearText } = useFormContext();
  const {
    conversations: { conversations, selected, loadingConversations },
    chatLog: { chatLog, autoSelect },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const handlePrepend = (newConversation) =>
    dispatch(prependConversation(newConversation));

  const handleAppendChatLog = (payload) => dispatch(appendChatLog(payload));
  const handleSetSelected = (payload) => dispatch(setSelected(payload));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    const errorMessage = validateForm();
    if (errorMessage) {
      return Swal.fire({ icon: "error", title: "Error", text: errorMessage });
    }

    const payload = createPayload();

    setIsSending(true);
    handleAppendChatLog({
      isBot: false,
      updatedAt: Date.now(),
      text: form.text,
      selected: true,
      _id: null,
    });
    clearText();

    try {
      const response = await sendMessage(payload);
      handleResponse(response);
      setIsSending(false);
    } catch (error) {
      handleErrorMessage(error);
      console.error(error);
      setIsSending(false);
    }
  };

  const validateForm = () => {
    const MAX_IMAGE_PROMPT_LENGTH = 400;
    if (form.type === "image" && form.text.length > MAX_IMAGE_PROMPT_LENGTH)
      return "Text must be less than 400 characters";
    if (!form.text.length || !form.text.trim().length)
      return "Please enter a valid message";
    return null;
  };

  const createPayload = () => {
    if (form.type === "image") {
      return { prompt: form.text, n: form.n, size: form.size };
    }

    const CHAR_PER_TOKEN = 4;
    const MAX_TOKENS = 4096;
    const MAX_CHARACTERS = MAX_TOKENS * CHAR_PER_TOKEN;
    const MAX_MESSAGES = 5;

    let messages = autoSelect
      ? chatLog.slice(length)
      : chatLog.filter((message) => message.selected);

    let currentTotalCharacters = form.text.length + form.promptHeader;
    let i = 0;
    for (i; i < messages.length; i++) {
      const messageIndex = messages.length - i - 1;
      const messageLength = messages[messageIndex].text.length;
      if (
        messageLength + currentTotalCharacters > MAX_CHARACTERS ||
        i >= MAX_MESSAGES
      ) {
        break;
      }
      currentTotalCharacters += messageLength;
    }

    return {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: form.promptHeader },
        ...messages.slice(messages.length - i + 1).map(({ isBot, text }) => {
          return { role: isBot ? "assistant" : "user", content: text };
        }),
        { role: "user", content: form.text },
      ],
    };
  };

  const sendMessage = async (payload) => {
    return await axios.post(`/api/message/${form.type}`, {
      payload,
      text: form.text,
      conversationId: selected >= 0 ? conversations[selected]._id : undefined,
    });
  };

  const handleResponse = (response) => {
    const { openAIResponse, conversation, userMessageId } = response.data;

    const reduxPayload = {
      newElement: { ...openAIResponse, selected: true },
      _id: userMessageId,
    };

    if (selected === -1) {
      handlePrepend(conversation);
      handleSetSelected(0);
    }

    dispatch(appendBotMessage(reduxPayload));
  };

  const handleErrorMessage = () => {
    handleAppendChatLog({
      updatedAt: Date.now(),
      text: "Could not send message.",
      selected: true,
      error: true,
      isBot: true,
    });
  };

  return (
    <>
      {/* chatLog */}
      {loadingConversations ? (
        <Box sx={{ flex: 1 }} />
      ) : (
        <ChatLog isSending={isSending} />
      )}

      {/* input field */}
      <Box data-tut="reactour__chat-input" sx={chatContainerStyle}>
        <Box sx={textAreaBoxStyle}>
          <GenerationTypeSelector />
          <TextareaAutosize
            placeholder="Message @OpenAI"
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(e)
            }
            value={form.text}
            name={"text"}
            onChange={handleChange}
            style={textAreaStyle}
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
        {githubFooter}
      </Box>
    </>
  );
};

const chatContainerStyle = {
  flex: 0,
  margin: "0 15px 20px 15px",
  backgroundColor: "white",
  bottom: 0,
  pt: 1,
};

const textAreaBoxStyle = {
  mt: 0,
  p: 0.5,
  pr: 1.5,
  pt: 0.8,
  pb: 0.2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 50,
  boxShadow: "0 0 10px rgba(0,0,0,.1);",
};

const textAreaStyle = {
  fontSize: "clamp(13px, 2vw, 14px)",
  padding: "10px",
  minHeight: 22,
  maxHeight: 350,
  resize: "none",
  flex: 1,
  overflow: "auto",
  fontFamily: "Noto Sans, sans-serif",
  border: "none",
  outline: "none",
};

const githubFooter = (
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
);

export default Content;
