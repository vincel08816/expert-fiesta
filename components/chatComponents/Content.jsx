import { TextareaAutosize } from "@mui/base";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SendIcon from "@mui/icons-material/Send";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "../../contexts/FormContext";
import { appendBotMessage, appendChatLog } from "../../store/chatLogSlice";
import {
  prependConversation,
  setSelected,
} from "../../store/conversationsSlice";
import DotLoader from "../DotLoader";
import IconsWithTooltips from "../IconsWithTooltips";
import ChatLog from "./ChatLog";

const SelectType = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectMenu = Boolean(anchorEl);
  const { form, handleChange } = useFormContext();
  const iconSx = { width: 20, height: 20 };
  const iconButtonSx = {
    ml: 1,
    mb: 0.5,
    // border: "2px solid rgba(0,0,0,.1)",
  };

  return (
    <Box>
      <Tooltip title="GPT-3 Or DALL·E 2">
        <IconButton
          sx={iconButtonSx}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          {form.type === "text" ? (
            <TextsmsIcon sx={iconSx} />
          ) : (
            <ImageSearchIcon sx={iconSx} />
          )}
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ borderRadius: "8px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={openSelectMenu}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {[
          {
            title: "GPT3 Text Generation",
            value: "text",
            icon: <TextsmsIcon />,
          },
          {
            title: "DALL·E 2 Image Generation",
            value: "image",
            icon: <ImageSearchIcon />,
          },
        ].map(({ title, value, icon }, index) => (
          <MenuItem
            key={title + index}
            sx={{ fontSize: "12px", display: "flex", alignItems: "center" }}
            name="topText"
            value={value}
            onClick={(e) => {
              handleChange({
                target: { name: "type", value },
                preventDefault: () => {},
              });
              setAnchorEl(null);
            }}
          >
            {icon}
            <Typography variant="body-2" sx={{ ml: 0.5 }}>
              {title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

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
    if (form.type === "image" && form.text.length > 400) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Text must be less than 400 characters",
      });
    }
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
      form.type === "image"
        ? {
            prompt: form.text,
            n: form.n,
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

    handleAppendChatLog({
      isBot: false,
      updatedAt: Date.now(),
      text: form.text,
      selected: true,
      _id: null,
    });

    clearText();

    // console.log(
    //   "conversationId",
    //   conversations.length && selected && conversations[selected]._id
    // );

    axios
      .post(`/api/message/${form.type}`, {
        payload,
        text: form.text,
        conversationId: selected >= 0 ? conversations[selected]._id : undefined,
      })
      .then((response) => {
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
      })
      .catch((error) => {
        handleAppendChatLog({
          updatedAt: Date.now(),
          text: "Could not send message.",
          selected: true,
          error: true,
        });
        console.error(error);
      })
      .then(() => setIsSending(false));
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
            borderRadius: 5,
            boxShadow: "0 0 10px rgba(0,0,0,.1);",
          }}
        >
          <SelectType />
          <TextareaAutosize
            placeholder="Message @OpenAI"
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(e)
            }
            value={form.text}
            name={"text"}
            onChange={handleChange}
            style={{
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
