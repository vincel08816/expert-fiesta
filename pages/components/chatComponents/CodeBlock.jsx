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

  while ((match = regex.exec(str)) !== null) {
    results.push({
      type: "code",
      value: match[2],
      language: match[1] || null,
    });

    str = str.replace(match[0], "");
  }

  results.push({
    type: "text",
    value: str,
  });

  return results;
}

const CodeBlock = ({ text }) => {
  return splitString(text).map(({ type, value, language }) => {
    if (type === "text")
      return (
        <Typography sx={{ whiteSpace: "pre-wrap", fontSize: 15 }}>
          {value}
        </Typography>
      );
    return (
      <Box>
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
            fontSize: "14px",
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
