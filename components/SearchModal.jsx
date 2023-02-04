import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import CodeBlock from "../components/chatComponents/CodeBlock";
import { useAppContext } from "../contexts/AppContext";
import { formatDate } from "../utils/util";

const iconSx = {
  width: "25px",
  height: "25px",
  "@media (max-width: 600px)": {
    width: "18px",
    height: "18px",
  },
};

const style = {
  maxWidth: 1200,
  borderRadius: "10px",
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

const Message = ({
  isBot,
  updatedAt,
  text,
  selected,
  imageUrl,
  bookmarked,
  _id,
}) => {
  const [show, setShow] = useState(false);
  const handleMouseOver = () => setShow(true);
  const handleMouseOut = () => setShow(false);
  const {
    user: { username },
  } = useAppContext();

  const display = show ? "flex" : "none";

  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{
        whitespace: "pre",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "reverse",
        mb: 1,
        padding: "5px 12px 15px",
        borderRadius: 2,
        backgroundColor: selected && "#fbfbfb",
        border: `1px solid ${selected ? "#bcdbfd" : "transparent"}`,
        "&:hover": {
          backgroundColor: "rgba(52,53,65,0.05)",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          mt: 1.5,
          mr: 1,
          width: 50,
          height: 50,
          "@media (max-width: 600px)": {
            display: "none",
          },
        }}
      >
        <StyledUserLogo
          src={
            isBot
              ? "https://media.discordapp.net/attachments/594312779545051221/1068575020361715774/sticker2.png"
              : "https://media.discordapp.net/attachments/594312779545051221/1068574850203009144/sticker29.png"
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: 1,
            mb: -0.5,
            alignItems: "center",
            wordBreak: "break-word",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              "@media (max-width: 600px)": {
                fontSize: 14,
              },
            }}
          >
            {isBot ? "OpenAI" : username}
          </Typography>
          {isBot ? (
            <Badge>
              <DoneIcon
                style={{ height: "14px", width: "14px", marginRight: "2px" }}
              />
              Bot
            </Badge>
          ) : (
            <Box sx={{ width: 8 }} />
          )}
          <Typography sx={{ opacity: 0.6, fontSize: 12 }}>
            {formatDate(updatedAt) || ""}
          </Typography>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "row-reverse" }}>
            <Box
              sx={{
                border: "1px solid #dfe1e3",
                borderRadius: 1.5,
                position: "sticky",
                mt: "-40px",
                mr: "8px",
                backgroundColor: " white",
                display,
                color: "#505761",
              }}
            >
              <Tooltip title="Bookmark">
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "#dfe1e3",
                    },
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(imageUrl ? imageUrl : text)
                  }
                >
                  {bookmarked ? (
                    <BookmarkIcon sx={iconSx} />
                  ) : (
                    <BookmarkBorderIcon sx={iconSx} />
                  )}
                </Box>
              </Tooltip>
              <Tooltip title="Copy to clipboard">
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "#dfe1e3",
                    },
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(imageUrl ? imageUrl : text)
                  }
                >
                  <ContentCopyIcon sx={iconSx} />
                </Box>
              </Tooltip>

              <Tooltip title="Delete Message">
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    "&:hover": {
                      backgroundColor: "#dfe1e3",
                    },
                  }}
                  onClick={async () => {
                    try {
                      const response = await Swal.fire({
                        icon: "warning",
                        title: "Are you sure you want to delete this message?",
                        text: "You won't be able to revert this!",
                        showCancelButton: true,
                      });
                      if (response.isConfirmed) {
                        await axios.delete(`/api/message/${_id}`);
                        results((prev) =>
                          prev.filter((msg) => msg._id !== _id)
                        );
                      }
                    } catch (error) {
                      Swal.fire({
                        icon: "error",
                        title: "Unable to delete message",
                        error: error?.message || "Something went wrong!",
                      });
                      console.error(error);
                    }
                  }}
                >
                  <DeleteIcon sx={iconSx} />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            lineHeight: 1.3,
            overflowX: "auto",
            pt: 1,
          }}
        >
          {imageUrl ? (
            <StyledImage src={imageUrl} />
          ) : (
            <CodeBlock text={text?.trim()} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { user } = useAppContext();

  useEffect(() => {
    if (keyword?.length < 3) setResults([]);
    if (user?._id && keyword?.length > 2) {
      const url = `/api/message/search?keyword=${keyword}`;
      console.log(url, { keyword });
      console.log(user?._id);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setResults(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [keyword]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box
          data-tut="reactour__search"
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
            "@media (max-width: 600px)": {
              // display: "none",
              width: "auto",
              padding: "2px 5px",
            },
          }}
        >
          <SearchIcon sx={{ width: 20 }} />

          <Typography
            sx={{
              "@media (max-width: 600px)": {
                display: "none",
              },
              fontSize: "13px",
              ml: 1.3,
              color: "#536270",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              KhtmlUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
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
              <SearchIcon
                sx={{
                  width: 30,
                  height: 30,
                  "@media (max-width: 600px)": {
                    width: 15,
                    height: 15,
                  },
                }}
              />
            </Box>
            <Input
              id="modal-modal-title"
              variant="h6"
              component="h2"
              disableUnderline={true}
              placeholder="Search within your messages..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              sx={{
                "@media (max-width: 600px)": {
                  fontSize: "13px",
                },
                flex: 1,
                textDecoration: "none",
                fontSize: "20px",
                mt: 0.5,
              }}
            />
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
          <Box sx={{ flex: 1, display: "flex", overflowY: "auto", height: "" }}>
            <Box
              sx={{
                pt: 1,
                mb: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                flex: 1,
                overflowX: "hidden",
              }}
            >
              {results?.map((data, index) => {
                return (
                  <Box key={`message${index}`} sx={{ width: "100%" }}>
                    <Message {...data} index={index} />
                  </Box>
                );
              }) || ""}
            </Box>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}

const StyledImage = styled.img`
  max-width: 80vw;
  max-height: 80vw;
  margin-top: 15px;
  width: 256px;
  height: 256px;
`;

const StyledUserLogo = styled.img`
  width: 100%;
`;

const Badge = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 3px 7px;
  margin: -1.5px 7px 0 7px;
  background-color: #1a76d2;
  font-size: 12px;
  color: white;
  border-radius: 5px;
  @media screen and (max-width: 600px) {
    font-size: 10px;
  } ;
`;
