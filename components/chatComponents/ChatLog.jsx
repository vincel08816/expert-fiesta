import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const ChatLog = () => {
  const chatRef = useRef(null);

  const { chatLog, loadingChatLog } = useSelector((state) => state.chatLog);

  const scrollToBottom = () =>
    (chatRef.current.scrollTop = chatRef.current.scrollHeight);

  useEffect(() => {
    scrollToBottom();
  }, [loadingChatLog, chatLog?.length]);

  const memoizedChatLog = useMemo(
    () =>
      chatLog.map((data, index) => {
        return (
          <Box key={`message${index}`} sx={{ width: "100%" }}>
            <Message {...data} index={index} />
          </Box>
        );
      }),
    [chatLog]
  );

  if (loadingChatLog) {
    return (
      <Box ref={chatRef} sx={loadingSx}>
        <CircularProgress style={{ width: 60, height: 60 }} />
      </Box>
    );
  }

  return (
    <Box ref={chatRef} sx={chatContainerSx}>
      {memoizedChatLog}
    </Box>
  );
};

export default ChatLog;

const chatContainerSx = {
  pt: 1,
  mb: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
};

const loadingSx = {
  pt: 5,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
};
