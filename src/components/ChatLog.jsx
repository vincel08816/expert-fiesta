import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useAppContext } from "../AppContext";

/**
 * @function formatDate
 * @param {string} dateString - A string representing the date to be formatted
 * @returns {string} A string representing the date in the format 'Today at 11:24 PM', 'Yesterday at 9:32 PM', '01/13/2023 7:31 PM', '09/10/2018 9:32 PM'
 * @description The function takes a date string as an input and returns a string representing the date in the format 'Today at 11:24 PM', 'Yesterday at 9:32 PM', '01/13/2023 7:31 PM', '09/10/2018 9:32 PM'
 */

function formatDate(dateString) {
  if (!dateString || dateString?.length === 0) return;
  const date = new Date(dateString);
  const today = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
    return `Today at ${hour12}:${minutes.toString().padStart(2, 0)} ${ampm}`;
  } else if (
    date.setHours(0, 0, 0, 0) ==
    new Date(today.getTime() - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
  ) {
    return `Yesterday at ${hour12}:${minutes
      .toString()
      .padStart(2, 0)} ${ampm}`;
  } else {
    return `${month}/${day}/${year} ${hour12}:${minutes
      .toString()
      .padStart(2, 0)} ${ampm}`;
  }
}

/* */
const Message = ({
  user,
  timestamp,
  text,
  selected,
  index,
  toggleCheck,
  error,
  imageUrl,
}) => {
  console.log(text);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mb: 0.5,
            alignItems: "center",
            wordBreak: "break-word",
          }}
        >
          <Typography sx={{ mr: 1.5, fontWeight: "bold" }}>{user}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            {formatDate(timestamp) || ""}
          </Typography>
        </Box>
        {/* <Typography color={error ? "error" : ""}>{text}</Typography> */}
        {imageUrl ? (
          <StyledImage src={imageUrl} />
        ) : (
          <ReactMarkdown>{text}</ReactMarkdown>
        )}
      </Box>
      <Tooltip title="Copy to clipboard">
        <IconButton
          sx={{ w: 5, h: 5 }}
          onClick={() =>
            navigator.clipboard.writeText(imageUrl ? imageUrl : text)
          }
        >
          <ContentCopyIcon style={{ width: "18px", height: "18px" }} />
        </IconButton>
      </Tooltip>
      <Checkbox
        checked={selected}
        onChange={() => toggleCheck(user, index)}
        size={"small"}
      />
    </Box>
  );
};

const ChatLog = () => {
  const { chatLog = [], setChatLog, toggleCheck } = useAppContext();
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog?.length]);

  return (
    <Box
      ref={chatRef}
      sx={{
        mt: 7,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "scroll",
        ml: 2,
      }}
    >
      {chatLog.map((data, index) => {
        return (
          <Box
            key={`message${index}`}
            sx={{
              opacity: !index % 2 && chatLog.length === index + 1 ? 0.6 : 1,
            }}
          >
            <Message
              {...data}
              index={index}
              setChatLog={setChatLog}
              toggleCheck={toggleCheck}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatLog;

const StyledImage = styled.img`
  width: 256px;
  height: 256px;
`;
