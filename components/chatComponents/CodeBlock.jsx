import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import d from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { useAppContext } from "../../contexts/AppContext";

const CodeBlock = ({ text }) => {
  const { width, open } = useAppContext();
  const fontSize = width > 600 ? 15 : width > 400 ? 14 : 13;

  return splitString(text).map(({ type, value, language }, index) => {
    if (type === "text") {
      const typeSx = { maxWidth: "95vw", whiteSpace: "pre-wrap", fontSize };
      return <Typography key={index} sx={typeSx} children={value || ""} />;
    }

    return (
      <Box key={index} sx={{ maxWidth: "95vw", mt: 0.3 }}>
        <CodeHeader language={language?.toLowerCase()} value={value} />
        <SyntaxHighlighter
          children={value || ""}
          wrapLines={true}
          language={language?.trim().toLowerCase() || "none"}
          style={d}
          lineProps={{
            style: { wordBreak: "break-word", whiteSpace: "pre-wrap" },
          }}
          customStyle={{
            width: "auto",
            fontSize: `${fontSize}px`,
            padding: "15px",
            backgroundColor: "black",
            fontFamily: "initial",
            borderBottomRightRadius: "8px",
            borderBottomLeftRadius: "8px",
            margin: 0,
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
    if (match.index > lastIndex) {
      results.push({ type: "text", value: str.slice(lastIndex, match.index) });
    }

    results.push({ type: "code", value: match[2], language: match[1] || null });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str?.length) {
    results.push({ type: "text", value: str.slice(lastIndex) });
  }

  return results;
}

const CodeHeader = ({ language, value }) => {
  const { setSnackbarOpen, setSnackbarText } = useAppContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#343441",
        color: "#d9d9e3",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        padding: "4px 22px",
      }}
    >
      <Typography variant="caption">{language}</Typography>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setSnackbarText("Copied Code");
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
