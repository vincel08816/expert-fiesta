import { TextareaAutosize } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../contexts/AppContext";
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
          flexShrink: 0,
          m: 2,
          mt: 0,
          p: 0.5,
          pr: 1.5,
          pt: 0.8,
          pb: 0.2,
          display: "flex",
          bottom: 0,
          width: "calc(100% - 45px)",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "5px",
          maxWidth: "1000px",
          boxShadow: "0 0 10px rgba(0,0,0,.1);",
        }}
      >
        <TextareaAutosize
          placeholder="Message @OpenAI"
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
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

        {isSending ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CircularProgress style={{ width: "24px", height: "24px" }} />
            </Box>
            <Typography sx={{ fontSize: 10, mt: 0.5, mb: -0.5, opacity: 0.5 }}>
              Sending...
            </Typography>
          </Box>
        ) : (
          ""
        )}
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
    </>
  );
};

export default Content;
