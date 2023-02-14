import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as d } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { useEventContext } from "../../pages/Home";

const CodeBlock = ({ text, enableMarkdown }) => {
  const { setCodeLanguage, setCodeText, handleOpenModal } = useEventContext();

  const handleFullScreen = (language, value) => {
    setCodeLanguage(language);
    setCodeText(value);
    handleOpenModal();
  };

  return splitString(text).map(({ type, value, language }, index) => {
    if (type === "text") {
      const typeSx = {
        maxWidth: "95vw",
        whiteSpace: "pre-line",
        fontSize: "clamp(14px, 2vw, 16px)",
        lineHeight: 1.5,
      };

      if (!enableMarkdown)
        return <Typography key={index} sx={typeSx} children={value} />;

      return (
        <ReactMarkdown
          key={index}
          className="markdown-section"
          children={value}
          remarkPlugins={[remarkGfm]}
        />
      );
    }

    return (
      <Box key={index} sx={{ maxWidth: "95vw", mt: 0.3 }}>
        <CodeHeader language={language?.toLowerCase()} value={value} />
        <Box
          sx={{
            mt: -0.5,
            mb: -5,
            display: "flex",
            backgroundColor: "black",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => handleFullScreen(language, value)}>
            <FullscreenIcon sx={{ width: 22, mr: 1, color: "white" }} />
          </IconButton>
        </Box>
        <SyntaxHighlighter
          children={value || ""}
          wrapLines={true}
          wrapLongLines={true}
          language={language?.trim().toLowerCase() || "none"}
          style={d}
          lineProps={{
            style: { wordBreak: "break-word", whiteSpace: "pre-wrap" },
          }}
          customStyle={{
            width: "auto",
            fontSize: "clamp(13px, 2vw, 14px)",
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
    );
  });
};

function splitString(str) {
  const results = [];
  const regex = /```(\w+)?\n([\s\S]+?)```/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex)
      results.push({ type: "text", value: str.slice(lastIndex, match.index) });

    results.push({ type: "code", value: match[2], language: match[1] || null });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str?.length) {
    results.push({ type: "text", value: str.slice(lastIndex) });
  }

  return results;
}

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

export default CodeBlock;
