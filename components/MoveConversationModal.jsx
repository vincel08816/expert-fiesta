import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAppContext } from "../contexts/AppContext";

const style = {
  borderRadius: "10px",
  position: "absolute",
  top: "38%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  borderColor: "none",
};

const titleSx = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  border: "1px solid transparent",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
  },
};

function ChildModal({ newConversationIndex, closeParentModal }) {
  const [open, setOpen] = React.useState(false);
  const { chatLog, setChatLog, conversations } = useAppContext();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Move Conversation
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Paper
          sx={{
            ...style,
            width: 500,
            height: 200,
            border: "1px solid black",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button onClick={handleClose} sx={{ color: "black" }}>
              <CloseIcon />
            </Button>
          </Box>

          <Box
            sx={{
              p: 2,
              pt: 0,
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Are you sure you want to move the messages to{" "}
              {conversations[newConversationIndex]?.title}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <Button
                variant="contained"
                onClick={async () => {
                  try {
                    // get messageIds
                    const messageIds = chatLog
                      .filter((chat) => chat.selected)
                      .map((chat) => chat._id);

                    const conversationId =
                      conversations[newConversationIndex]._id;

                    // do axios request
                    await axios.put("/api/message/move-many", {
                      conversationId,
                      messageIds,
                    });

                    // if it is successful send remove the messages from chatlog
                    setChatLog((prev) => prev.filter((chat) => !chat.selected));

                    handleClose();
                    closeParentModal();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Confirm Move
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}

export default function MoveConversationModal() {
  const [open, setOpen] = useState(false);
  const [newConversationIndex, setNewConversationIndex] = useState(null);
  const { conversations, chatLog, selected } = useAppContext();

  const handleOpen = () => {
    if (chatLog.filter((chat) => chat.selected).length === 0)
      return Swal.fire({ icon: "error", title: "No messages selected" });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewConversationIndex(null);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Move Selected Conversations">
          <IconButton
            onClick={handleOpen}
            sx={{
              border: "2px solid rgba(0,0,0,.1)",
              p: 0.5,
              mt: 0.2,
              borderRadius: "8px",
              mr: 1,
            }}
          >
            <DriveFileMoveIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              p: 2,
              flexDirection: "column",
              height: "100%",
              flex: 1,
            }}
          >
            <Box sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <Typography variant="h4">
                Move selected messages to a new conversation
              </Typography>
            </Box>
            <Box sx={{ overflowY: "scroll", flex: 1, width: "100%" }}>
              {conversations?.map(({ title, _id }, index) => (
                <Box
                  key={index}
                  onClick={() => setNewConversationIndex(index)}
                  sx={{
                    ...titleSx,
                    backgroundColor:
                      newConversationIndex === index ? "#f2f2f2" : "",
                  }}
                >
                  <Box
                    key={index}
                    sx={{
                      ...titleSx,
                      backgroundColor:
                        newConversationIndex === index ? "#f2f2f2" : "",
                    }}
                  >
                    <Box sx={{ p: 0.5, pr: 1 }}>
                      <ChatBubbleOutlineIcon style={{ width: "18px" }} />
                    </Box>
                    <Box
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        flex: 1,
                      }}
                    >
                      <Typography variant="body2">{title}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex" }}>
              {newConversationIndex === null ||
              newConversationIndex === selected ? (
                <Button variant="contained" disabled>
                  Move Conversation
                </Button>
              ) : (
                <ChildModal
                  newConversationIndex={newConversationIndex}
                  closeParentModal={handleClose}
                />
              )}
            </Box>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
