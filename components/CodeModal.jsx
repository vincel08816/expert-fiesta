import CloseIcon from "@mui/icons-material/Close";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Button, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEventContext } from "../pages/Home";

export const useCodeModal = () => {
  const [openCodeModal, setOpenCodeModal] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [codeText, setCodeText] = useState("asd;flkjasd;lkfjasdf");
  const handleOpenModal = () => setOpenCodeModal(true);
  const handleCloseModal = () => setOpenCodeModal(false);

  return {
    openCodeModal,
    handleOpenModal,
    handleCloseModal,
    codeLanguage,
    setCodeLanguage,
    codeText,
    setCodeText,
  };
};

export const CodeModal = () => {
  const {
    openCodeModal,
    handleCloseModal,
    codeLanguage: language,
    codeText: value,
  } = useEventContext();

  return (
    <div>
      {/* don't forget about making a component for code */}
      <Modal
        open={openCodeModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(4px)",
        }}
      >
        <Box sx={style}>
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              color: "white",
              mt: -7,
              right: 0,
              top: 0,
              border: "1px solid white",
              borderRadius: "50%",
              width: 40,
              height: 40,
            }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <CodeHeader language={language?.toLowerCase()} value={value} />
          <SyntaxHighlighter
            // showLineNumbers
            children={value}
            wrapLines={true}
            language={language?.trim().toLowerCase() || "none"}
            style={theme}
            lineProps={{
              style: { wordBreak: "break-word", whiteSpace: "pre-wrap" },
            }}
            customStyle={{
              overflowY: "auto",
              flex: 1,
              width: "auto",
              fontSize: "clamp(14px, 2vw, 16px)",
              padding: 15,
              backgroundColor: "black",
              fontFamily: "initial",
              margin: 0,
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
              borderRadius: "8px",
              borderTopRightRadius: "0px",
              borderTopLeftRadius: "0px",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

const CodeHeader = ({ language, value }) => {
  const { setSnackbarOpen, setSnackbarText } = useEventContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#343441",
        color: "#d9d9e3",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: "4px 22px",
      }}
    >
      <Typography variant="caption">{language}</Typography>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setSnackbarText("Code copied to clipboard.");
          setSnackbarOpen(true);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "inherit",
          textTransform: "none",
          p: 0,
        }}
      >
        <ContentPasteIcon sx={{ width: 16, mr: 1 }} />
        <Typography variant="caption">Copy code</Typography>
      </Button>
    </Box>
  );
};

const style = {
  mt: 3,
  outline: "none",
  maxWidth: 1200,
  borderRadius: "8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  borderColor: "none",
  display: "flex",
  flexDirection: "column",
  "@media (max-width: 600px)": {
    width: "95vw",
  },
};
