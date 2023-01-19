import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import React from "react";
import { useAppContext } from "../AppContext";
import ChatLog from "./ChatLog";
import IconsWithTooltips from "./IconsWithTooltips";

const Content = () => {
  const {
    form,
    handleChange,
    setChatLog,
    chatLog,
    handleSubmit,
    allowEnterToSubmit,
    toggleCheck,
  } = useAppContext();

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
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextareaAutosize
          placeholder="Write a message..."
          onKeyDown={(e) =>
            e.key === "Enter" && allowEnterToSubmit && handleSubmit(e)
          }
          value={form.text}
          name={"text"}
          onChange={handleChange}
          style={{
            padding: "12px",
            minHeight: "22px",
            maxHeight: "350px",
            resize: "none",
            flex: 1,
            fontFamily: "Noto Sans, sans-serif",
          }}
        />

        <IconsWithTooltips
          sx={{ m: 1, p: 1 }}
          title="Submit"
          Icon={SendIcon}
          onClick={handleSubmit}
        />
        {/* add character count here */}
      </Box>
    </>
  );
};

export default Content;
