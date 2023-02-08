import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import Message from "./Message";

const ChatLog = () => {
  const {
    chatLog = [],
    setChatLog,
    toggleCheck,
    loadingMessages,
  } = useAppContext();
  const chatRef = useRef(null);

  const scrollToBottom = () =>
    (chatRef.current.scrollTop = chatRef.current.scrollHeight);

  useEffect(() => {
    scrollToBottom();
  }, [loadingMessages, chatLog?.length]);

  const memoizedChatLog = useMemo(
    () =>
      chatLog.map((data, index) => {
        return (
          <Box key={`message${index}`} sx={{ width: "100%" }}>
            <Message
              {...data}
              index={index}
              setChatLog={setChatLog}
              toggleCheck={toggleCheck}
            />
          </Box>
        );
      }),
    [chatLog]
  );

  if (loadingMessages) {
    return (
      <Box
        ref={chatRef}
        sx={{
          pt: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <CircularProgress style={{ width: "60px", height: "60px" }} />
      </Box>
    );
  }

  return (
    <Box
      ref={chatRef}
      sx={{
        pt: 1,
        mb: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {memoizedChatLog}
    </Box>
  );
};

export default ChatLog;
