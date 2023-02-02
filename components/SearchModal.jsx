import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

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
  // boxShadow: 24,
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          onClick={handleOpen}
          sx={{
            display: "flex",
            height: 30,
            width: 180,
            margin: "3px 8px 0px",
            borderRadius: "8px",
            alignItems: "center",
            padding: "2px 13px",
            border: "1px solid #e2e5e9",
            cursor: "pointer",
            boxShadow: "0 0 5px rgba(0,0,0,.1);",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
              boxShadow: "0 0 10px rgba(0,0,0,.1);",
            },
          }}
        >
          <SearchIcon sx={{ width: 20 }} />

          <Typography
            sx={{
              fontSize: "13px",
              ml: 1.3,
              color: "#536270",
              "-webkit-touch-callout": "none",
              "-webkit-user-select": "none",
              "-khtml-user-select": "none",
              "-moz-user-select": "none",
              "-ms-user-select": "none",
              "user-select": "none",
            }}
          >
            Search...
          </Typography>
        </Box>
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
            }}
          >
            <Box sx={{ display: "flex", p: 1, pr: 2 }}>
              <SearchIcon sx={{ width: 30, height: 30 }} />
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ flex: 1, color: "#64717f" }}
            >
              Search...
            </Typography>
            <Box
              sx={{
                borderRadius: "6px",
                display: "flex",
                padding: "3px 8px",
                backgroundColor: "#f3f6f9",
                border: "1px solid #cfd4d8",
                fontSize: "13px",
                color: "#64717f",
              }}
            >
              esc
            </Box>
          </Box>
          <Typography id="modal-modal-description" sx={{ m: 4 }}>
            WORK IN PROCESS... COMING SOON
          </Typography>
        </Paper>
      </Modal>
    </div>
  );
}
