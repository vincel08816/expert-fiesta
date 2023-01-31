import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useAppContext } from "../../context/AppContext";

const titleSx = {
  display: "flex",
  flexDirection: "row",
  maxWidth: "90%",
  ml: 0.5,
  p: 1,
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
  p: 2,
  pt: 9.5,
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const SelectChat = () => {
  const { selected, setSelected, conversations, setConversations, setChatLog } =
    useAppContext();

  /* edit conversation name */
  const handleEdit = async (_id) => {
    try {
      const swalResponse = await Swal.fire({
        icon: "warning",
        title: "Change the conversation title",
        text: "Are you sure you want to change the conversation title?",
        input: "text",
        inputValue: conversations[selected].title,
        showCancelButton: true,
        confirmButtonText: "DELETE",
      });
      if (swalResponse.isConfirmed && swalResponse.value?.trim().length) {
        await axios.put(`/api/message/edit/${_id}`, {
          title: swalResponse.value,
        });

        // {!} Change the title
        setConversations((prev) => {
          let newConversations = [...prev];
          if (newConversations?.length)
            newConversations[selected].title = swalResponse.value;
          return newConversations;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (_id) => {
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
        await axios.delete(`/api/message/conversation/${_id}`);

        setConversations((prev) => prev.filter((c) => c._id !== _id));
        setSelected();
        setChatLog([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={containerSx}>
      <Box
        sx={{ ...titleSx, border: "1px solid black", mb: 1 }}
        onClick={() => {
          setSelected();
          setChatLog([]);
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
      {conversations?.map(({ title, _id }, index) => (
        <Box
          key={index}
          sx={{
            ...titleSx,
            backgroundColor: selected === index ? "#f2f2f2" : "",
          }}
          onClick={() => setSelected(index)}
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

          {selected === index ? (
            <Box sx={{ ml: 2 }}>
              <EditIcon
                style={{ width: "20px", marginRight: "5px" }}
                onClick={() => handleEdit(_id)}
              />
              <DeleteIcon
                style={{ width: "20px" }}
                onClick={() => handleDelete(_id)}
              />
            </Box>
          ) : (
            ""
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SelectChat;
