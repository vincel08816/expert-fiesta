import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
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
  const { selected, setSelected, conversations } = useAppContext();

  return (
    <Box sx={containerSx}>
      <Box
        sx={{ ...titleSx, border: "1px solid black", mb: 1 }}
        onClick={async () => {
          const result = await Swal.fire({
            icon: "warning",
            title: "Please enter your input",
            text: "You can enter any text",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Submit",
          });
          if (result.isConfirmed && result.value?.trim().length) {
            console.log(result.value);
            // {!} Change the title
          }
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
      {conversations.map(({ title, conversationId }, index) => (
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
              <EditIcon style={{ width: "20px", marginRight: "5px" }} />
              <DeleteIcon style={{ width: "20px" }} />
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
