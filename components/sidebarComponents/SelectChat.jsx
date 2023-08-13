import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setChatLog } from "../../store/chatLogSlice";
import { setConversations, setSelected } from "../../store/conversationsSlice";

export default ({ display }) => {
  const dispatch = useDispatch();
  const {
    conversations: { conversations, selected },
  } = useSelector((state) => state);

  const handleSetSelected = (payload) => dispatch(setSelected(payload));
  const handleSetConversations = (payload) =>
    dispatch(setConversations(payload));
  const handleSetChatLog = (payload) => dispatch(setChatLog(payload));

  /* edit conversation name */
  const handleEditTitle = async (_id) => {
    console.log(_id);
    try {
      const swalResponse = await Swal.fire({
        icon: "warning",
        title: "Change the conversation title",
        text: "Are you sure you want to change the conversation title?",
        input: "text",
        inputValue: conversations[selected].title,
        showCancelButton: true,
        confirmButtonText: "Confirm",
      });
      if (swalResponse.isConfirmed && swalResponse.value?.trim().length) {
        await axios.put(`/api/conversation/title/${_id}`, {
          title: swalResponse.value,
        });
        console.log(swalResponse.value);

        const newConversations = [...conversations];
        if (newConversations?.length)
          newConversations[selected] = { title: swalResponse.value, _id };
        handleSetConversations(newConversations);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* I think the delete function is broken */
  const handleDeleteConversation = async (_id) => {
    try {
      const swalResponse = await Swal.fire({
        icon: "warning",
        title: "Are you sure you want to delete this conversation?",
        text: "This step cannot be undone!",
        showCancelButton: true,
        confirmButtonText: "Submit",
      });
      if (swalResponse.isConfirmed) {
        console.log({ _id });
        await axios.delete(`/api/conversation/${_id}`);
        handleSetConversations(conversations.filter((c) => c._id !== _id));
        handleSetSelected(-1);
        handleSetChatLog([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const memoizedConversations = useMemo(
    () =>
      conversations.map(({ title, _id }, index) => (
        <Box
          key={index}
          sx={{
            ...titleSx,
            backgroundColor: selected === index ? "#f2f2f2" : "",
          }}
          onClick={() => handleSetSelected(index)}
        >
          <Box sx={{ p: 0.3, pr: 1, mt: 1 }}>
            <ChatBubbleOutlineIcon style={{ width: "18px" }} />
          </Box>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {title}
          </Typography>

          {selected === index ? (
            <Box sx={{ ml: 2, display: "flex" }}>
              <IconButton sx={iconSx} onClick={() => handleEditTitle(_id)}>
                <EditIcon style={{ width: "20px", marginRight: "5px" }} />
              </IconButton>
              <IconButton
                sx={iconSx}
                onClick={() => handleDeleteConversation(_id)}
              >
                <DeleteIcon style={{ width: "20px" }} />
              </IconButton>
            </Box>
          ) : (
            ""
          )}
        </Box>
      )),
    [conversations, selected]
  );

  return (
    <Box key={"Select Chat"} sx={{ ...containerSx, display }}>
      <Box
        sx={{ ...titleSx, border: "1px solid black", padding: "4px 6px" }}
        onClick={() => {
          handleSetSelected(-1);
          handleSetChatLog([]);
        }}
      >
        <Box sx={{ p: 0.5, pr: 1 }}>
          <AddIcon style={{ width: "20px" }} />
        </Box>
        <Box
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="body2">New chat</Typography>
        </Box>
      </Box>
      {memoizedConversations}
    </Box>
  );
};

const iconSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 0.3,
  opacity: 0.7,
  "&:hover": {
    opacity: 1,
  },
};

const titleSx = {
  display: "flex",
  flexDirection: "row",
  width: "calc(100% - 30px)",
  padding: "2px 6px",
  alignItems: "center",
  border: "1px solid transparent",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
  },
};

const containerSx = {
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};
