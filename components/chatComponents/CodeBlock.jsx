import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as d } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { useEventContext } from "../../pages/Home";

const CodeBlock = ({ text, enableMarkdown }) => {
  const { open, setCodeLanguage, setCodeText, handleOpenModal } =
    useEventContext();

  const handleFullScreen = (language, value) => {
    setCodeLanguage(language);
    setCodeText(value);
    handleOpenModal();
  };

  return (
    <Container open={open ? 300 : 0}>
      <ReactMarkdown
        children={text}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <>
                <CodeHeader
                  language={match[1]?.toLowerCase()}
                  value={children}
                />
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
                  <IconButton
                    onClick={() => handleFullScreen(match[1], children)}
                  >
                    <FullscreenIcon sx={{ width: 22, mr: 1, color: "white" }} />
                  </IconButton>
                </Box>
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={d}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  customStyle={customStyle}
                />
              </>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </Container>
  );
};

const customStyle = {
  // overflowY: "auto",
  flex: 1,
  width: "auto",
  fontSize: "clamp(13px, 2vw, 15px)",
  padding: 15,
  backgroundColor: "black",
  fontFamily: "initial",
  margin: 0,
  borderBottomRightRadius: "8px",
  borderBottomLeftRadius: "8px",
  borderRadius: "8px",
  borderTopRightRadius: "0px",
  borderTopLeftRadius: "0px",
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

const Container = styled.div`
  line-height: 1.5;
  font-size: clamp(13px, 2vw, 15px);
  max-width: calc(95vw - 60px - ${({ open }) => open}px);

  p {
    margin: 3px 0 12px 0;
    line-height: 1.5;
    word-break: break-word;
    max-width: inherit;
  }

  li,
  ol {
    white-space: pre-wrap;
    padding: 0 0 0 12px;
    margin: 0 0 0 12px;
    line-height: 1.5;
    height: auto;
    max-width: inherit;
  }
`;
