import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import React from "react";
import { useAppContext } from "../context/AppContext";
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
          m: 2,
          pr: 1,
          pl: 0.5,
          pt: 0.5,
          // pb: 0.2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ebedef",
          borderRadius: "5px",
        }}
      >
        <TextareaAutosize
          placeholder="Message @OpenAI"
          onKeyDown={(e) =>
            e.key === "Enter" && allowEnterToSubmit && handleSubmit(e)
          }
          value={form.text}
          name={"text"}
          onChange={handleChange}
          style={{
            padding: "10px 20px",
            minHeight: "22px",
            maxHeight: "350px",
            resize: "none",
            flex: 1,
            overflow: "auto",
            fontFamily: "Noto Sans, sans-serif",
            backgroundColor: "#ebedef",
            border: "none",
            outline: "none",
          }}
        />
        {form.text?.trim().length > 0 ? (
          <IconsWithTooltips
            sx={{ m: 0, p: 0 }}
            title="Submit"
            Icon={SendIcon}
            onClick={handleSubmit}
          />
        ) : (
          ""
        )}

        {/* add character count here */}
      </Box>
    </>
  );
};

export default Content;
