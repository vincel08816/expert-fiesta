import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import DotLoader from "../DotLoader";
import IconsWithTooltips from "../IconsWithTooltips";
import ChatLog from "./ChatLog";

const Content = () => {
  const {
    form,
    handleChange,
    setChatLog,
    chatLog,
    handleSubmit,
    toggleCheck,
    isSending,
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
          margin: "0 15px 20px 15px",
          backgroundColor: "white",
          // position: "fixed",
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
              padding: "10px 20px",
              minHeight: "22px",
              maxHeight: "350px",
              resize: "none",
              flex: 1,
              overflow: "auto",
              fontFamily: "Noto Sans, sans-serif",
              // backgroundColor: "#ebedef",
              border: "none",
              outline: "none",
            }}
          />

          {isSending ? <DotLoader /> : ""}

          {form.text?.trim().length > 0 ? (
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
      </Box>
    </>
  );
};

export default Content;
