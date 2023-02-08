import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import {
  Avatar as UserAvatar,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAppContext } from "../../contexts/AppContext";
import { useEventContext } from "../../pages/Home";
import { useUserContext } from "../../pages/_app";
import { formatDate } from "../../utils/util";
import CodeBlock from "./CodeBlock";
import { Badge, hoverIconSx, iconSx, StyledImage } from "./MessageSx";

const Message = (props) => {
  const { isBot, updatedAt, text, selected, imageUrls, key } = props;
  const { user } = useUserContext();
  const [show, setShow] = useState(false);
  const handleMouseOver = () => setShow(true);
  const handleMouseOut = () => setShow(false);

  const selectedMessageSx = {
    backgroundColor: selected && "#fbfbfb",
    border: `1px solid ${selected ? "#bcdbfd" : "transparent"}`,
  };

  return (
    <Box
      key={key}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{ ...messageSx, ...selectedMessageSx }}
    >
      <Avatar isBot={isBot} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Hoverbar display={show ? "flex" : "none"} {...props} />
        <Box
          sx={{
            display: "flex",
            mt: 1,
            mb: -0.5,
            alignItems: "center",
            wordBreak: "break-word",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            {isBot ? "OpenAI" : user.username}
          </Typography>
          <BotBadge isBot={isBot} />
          <Typography sx={{ opacity: 0.6, fontSize: 12 }}>
            {formatDate(updatedAt) || ""}
          </Typography>
        </Box>

        <Box
          sx={{
            lineHeight: 1.3,
            overflowX: "auto",
            pt: 1,
          }}
        >
          {text ? (
            <CodeBlock text={text?.trim()} isBot={isBot} />
          ) : imageUrls?.length ? (
            imageUrls.map((imageUrl) => (
              <StyledImage
                referrerPolicy="no-referrer"
                src={imageUrl}
                alt="dalle"
              />
            ))
          ) : (
            <StyledImage src="" alt="dalle" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;

const avatarSize = 48;

const Avatar = ({ isBot }) => (
  <Box sx={LogoContainerSx}>
    <UserAvatar
      alt="user_avatar"
      sx={{
        width: avatarSize,
        height: avatarSize,
      }}
      src={
        isBot
          ? `https://cdn.discordapp.com/emojis/998653442425896970.webp?size=240&quality=lossless`
          : `https://cdn.discordapp.com/emojis/1013877946970284052.webp?size=240&quality=lossless`
      }
    />
  </Box>
);

const BotBadge = ({ isBot }) => {
  const { user } = useUserContext();

  return isBot ? (
    <Badge>
      <DoneIcon style={{ height: "14px", width: "14px", marginRight: "2px" }} />
      Bot
    </Badge>
  ) : (
    <Box sx={{ pl: 0.5, pr: 0.5 }}>
      {user?.role === "admin" ? (
        <UserAvatar
          alt="crown"
          sx={{ width: 24, height: 24 }}
          src="https://cdn.discordapp.com/emojis/844861855414747148.gif?size=96&quality=lossless"
        />
      ) : (
        ""
      )}
    </Box>
  );
};

const Hoverbar = (props) => {
  const { _id, imageUrl, text, bookmarked, selected, index, display } = props;
  const { setSnackbarOpen, setSnackbarText } = useEventContext();
  const { setChatLog, toggleCheck } = useAppContext();
  const { user } = useUserContext();

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
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row-reverse",
        mt: 1,
        mb: -1,
      }}
    >
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
              onChange={() => toggleCheck(user?.username, index)}
              size="small"
            />
          </Box>
        </Tooltip>

        <Tooltip title="Delete Message">
          <Box sx={hoverIconSx} onClick={handleDelete}>
            <DeleteIcon sx={iconSx} />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

const messageSx = {
  whitespace: "pre",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "reverse",
  mb: 1,
  padding: "5px 12px 15px",
  borderRadius: 2,
  "&:hover": {
    backgroundColor: "rgba(52,53,65,0.05)",
  },
};

const LogoContainerSx = {
  borderRadius: "100%",
  mt: 1.5,
  mr: 2,
  "@media (max-width: 600px)": {
    display: "none",
  },
};
