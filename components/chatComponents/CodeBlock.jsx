import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import d from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";

function splitString(str) {
  const results = [];
  const regex = /```(\w+)?\n([\s\S]+?)\n```/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      results.push({
        type: "text",
        value: str.slice(lastIndex, match.index),
      });
    }

    results.push({
      type: "code",
      value: match[2],
      language: match[1] || null,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str?.length) {
    results.push({
      type: "text",
      value: str.slice(lastIndex),
    });
  }

  return results;
}

const CodeBlock = ({ text }) => {
  return splitString(text).map(({ type, value, language }, index) => {
    if (type === "text")
      return (
        <Typography
          key={index}
          sx={{
            maxWidth: "95vw",
            whiteSpace: "pre-wrap",
            fontSize: 15,
            "@media (max-width: 600px)": {
              fontSize: "14px",
            },
          }}
        >
          {value}
        </Typography>
      );
    return (
      <Box key={index} sx={{ maxWidth: "95vw" }}>
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
            onClick={() => navigator.clipboard.writeText(value)}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textTransform: "none",
              p: 0,
            }}
          >
            <ContentPasteIcon style={{ width: "16px", marginRight: 7 }} />
            <Typography variant="caption">Copy code</Typography>
          </Button>
        </Box>
        <SyntaxHighlighter
          wrapLongLines
          language={language || "none"}
          style={d}
          customStyle={{
            whiteSpace: "pre-wrap",
            fontSize: "0.8em",
            overflow: "hidden",
            padding: "15px",
            backgroundColor: "black",
            fontFamily: "initial",
            borderBottomRightRadius: "8px",
            borderBottomLeftRadius: "8px",
            margin: 0,
          }}
        >
          {value || ""}
        </SyntaxHighlighter>
      </Box>
    );
  });
};

export default CodeBlock;
