import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { Checkbox, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAppContext } from "../../contexts/AppContext";
import { formatDate } from "../../utils/util";
import CodeBlock from "./CodeBlock";

import {
  Badge,
  hoverIconSx,
  iconSx,
  StyledImage,
  StyledUserLogo,
} from "./MessageSx";

const Message = (props) => {
  const {
    isBot,
    user,
    updatedAt,
    text,
    selected,
    index,
    imageUrl,
    bookmarked,
    _id,
  } = props;
  const [show, setShow] = useState(false);
  const handleMouseOver = () => setShow(true);
  const handleMouseOut = () => setShow(false);

  const messageSx = {
    whitespace: "pre",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "reverse",
    mb: 1,
    padding: "5px 12px 15px",
    borderRadius: 2,
    backgroundColor: selected && "#fbfbfb",
    border: `1px solid ${selected ? "#bcdbfd" : "transparent"}`,
    "&:hover": {
      backgroundColor: "rgba(52,53,65,0.05)",
    },
  };

  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={messageSx}
    >
      <Avatar />
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
            mb: -0.5,
            alignItems: "center",
            wordBreak: "break-word",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{user}</Typography>
          <BotBadge isBot={isBot} />
          <Typography sx={{ opacity: 0.6, fontSize: 12 }}>
            {formatDate(updatedAt) || ""}
          </Typography>
          <Hoverbar display={show ? "flex" : "none"} {...props} />
        </Box>

        <Box
          sx={{
            lineHeight: 1.3,
            overflowX: "auto",
            pt: 1,
          }}
        >
          {imageUrl ? (
            <StyledImage src={imageUrl} />
          ) : (
            <CodeBlock text={text?.trim()} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;

const Avatar = ({ isBot }) => (
  <Box sx={LogoContainerSx}>
    <StyledUserLogo
      src={
        isBot === "OpenAI"
          ? "https://media.discordapp.net/attachments/594312779545051221/1068575020361715774/sticker2.png"
          : "https://media.discordapp.net/attachments/594312779545051221/1068574850203009144/sticker29.png"
      }
    />
  </Box>
);

const BotBadge = ({ isBot }) => {
  return isBot ? (
    <Badge>
      <DoneIcon style={{ height: "14px", width: "14px", marginRight: "2px" }} />
      Bot
    </Badge>
  ) : (
    <Box sx={{ width: 8 }} />
  );
};

const Hoverbar = (props) => {
  const { _id, imageUrl, text, bookmarked, selected, index, display } = props;
  const { setChatLog, toggleCheck, user, setSnackbarOpen, setSnackbarText } =
    useAppContext();

  const handleDelete = async () => {
    try {
      const response = await Swal.fire({
        icon: "warning",
        title: "Are you sure you want to delete this message?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
      });
      if (response.isConfirmed) {
        await axios.delete(`/api/message/${_id}`);
        setChatLog((prev) => prev.filter((msg) => msg._id !== _id));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to delete message",
        error: error?.message || "Something went wrong!",
      });
      console.error(error);
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "row-reverse" }}>
      <Box
        sx={{
          border: "1px solid #dfe1e3",
          borderRadius: 1.5,
          position: "sticky",
          mt: "-40px",
          mr: "8px",
          backgroundColor: "white",
          display,
          color: "#505761",
        }}
      >
        <Tooltip title="Bookmark">
          <Box
            sx={hoverIconSx}
            onClick={() =>
              navigator.clipboard.writeText(imageUrl ? imageUrl : text)
            }
          >
            {bookmarked ? (
              <BookmarkIcon sx={iconSx} />
            ) : (
              <BookmarkBorderIcon sx={iconSx} />
            )}
          </Box>
        </Tooltip>
        <Tooltip title="Copy to clipboard">
          <Box
            sx={hoverIconSx}
            onClick={() => {
              navigator.clipboard.writeText(imageUrl ? imageUrl : text);
              setSnackbarText("Copied to clipboard");
              setSnackbarOpen(true);
            }}
          >
            <ContentCopyIcon sx={{ width: 18, height: 18 }} />
          </Box>
        </Tooltip>

        <Tooltip title="Include relevant data as part of chat history">
          <Box sx={hoverIconSx}>
            <Checkbox
              sx={{ ...iconSx, alignSelf: "center" }}
              checked={selected}
              onChange={() => toggleCheck(user.username, index)}
              size="small"
            />
          </Box>
        </Tooltip>

        <Tooltip title="Delete Message">
          <Box sx={hoverIconSx} handleDelete={handleDelete}>
            <DeleteIcon sx={iconSx} />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

const LogoContainerSx = {
  borderRadius: "50%",
  mt: 1.5,
  mr: 1,
  width: 50,
  height: 50,
  "@media (max-width: 600px)": {
    display: "none",
  },
};
