import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { Checkbox, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { formatDate } from "../utils/util";

const Message = ({
  user,
  timestamp,
  text,
  selected,
  index,
  toggleCheck,
  error,
  imageUrl,
  bookmarked,
}) => {
  const [show, setShow] = useState(false);

  const handleMouseOver = () => setShow(true);
  const handleMouseOut = () => setShow(false);

  const display = show ? "flex" : "none";

  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "reverse",
        mr: 1,
        mb: 0.5,
        p: 0.5,
        borderRadius: 2,
        backgroundColor: selected && "#fbfbfb",
        border: `1px solid ${selected ? "#bcdbfd" : "transparent"}`,
        "&:hover": {
          backgroundColor: "rgba(52,53,65,0.05)",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          mt: 1.5,
          mr: 1,
          width: 50,
          height: 50,
        }}
      >
        <StyledUserLogo
          src={
            user === "User"
              ? "https://media.discordapp.net/attachments/594312779545051221/1068575020361715774/sticker2.png"
              : "https://media.discordapp.net/attachments/594312779545051221/1068574850203009144/sticker29.png"
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: 1,
            alignItems: "center",
            wordBreak: "break-word",
            mb: -1.5,
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{user}</Typography>
          {user === "OpenAI" ? (
            <Badge>
              <DoneIcon
                style={{ height: "14px", width: "14px", marginRight: "2px" }}
              />
              Bot
            </Badge>
          ) : (
            <Box sx={{ width: 8 }} />
          )}
          <Typography sx={{ opacity: 0.8, fontSize: 12 }}>
            {formatDate(timestamp) || ""}
          </Typography>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "row-reverse" }}>
            <Box
              sx={{
                border: "1px solid #dfe1e3",
                borderRadius: 1.5,
                position: "sticky",
                mt: "-40px",
                mr: "8px",
                backgroundColor: " white",
                display,
                color: "#505761",
                height: 25,
              }}
            >
              <Tooltip title="Bookmark">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25px",
                    height: "25px",
                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "#dfe1e3",
                    },
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(imageUrl ? imageUrl : text)
                  }
                >
                  {bookmarked ? (
                    <BookmarkIcon sx={{ width: "18px", height: "18px" }} />
                  ) : (
                    <BookmarkBorderIcon
                      sx={{ width: "18px", height: "18px" }}
                    />
                  )}
                </Box>
              </Tooltip>
              <Tooltip title="Copy to clipboard">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25px",
                    height: "25px",
                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "#dfe1e3",
                    },
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(imageUrl ? imageUrl : text)
                  }
                >
                  <ContentCopyIcon sx={{ width: "18px", height: "18px" }} />
                </Box>
              </Tooltip>
              <Tooltip title="Include relevant data as part of chat history">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25px",
                    height: "25px",
                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "#dfe1e3",
                    },
                  }}
                >
                  <Checkbox
                    sx={{ height: "25px", width: "25px", alignSelf: "center" }}
                    checked={selected}
                    onChange={() => toggleCheck(user, index)}
                    size={"small"}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box sx={{ maxWidth: "90vw", lineHeight: 1.3 }}>
          {imageUrl ? (
            <StyledImage src={imageUrl} />
          ) : (
            <ReactMarkdown>{text}</ReactMarkdown>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const ChatLog = () => {
  const { chatLog = [], setChatLog, toggleCheck } = useAppContext();
  const chatRef = useRef(null);

  const scrollToBottom = () =>
    (chatRef.current.scrollTop = chatRef.current.scrollHeight);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog?.length]);

  return (
    <Box
      ref={chatRef}
      sx={{
        mt: 7,
        pt: 3,
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
  max-width: 80vw;
  max-height: 80vw;
  margin-top: 15px;
  width: 256px;
  height: 256px;
`;

const StyledUserLogo = styled.img`
  width: 100%;
  /* height: 100%; */
  /* object-fit: cover; */
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 3px 7px;
  margin: -1.5px 7px 0 7px;
  background-color: #1a76d2;
  font-size: 12px;
  color: white;
  border-radius: 5px;
`;
