import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import Message from "./Message";

// const Message = ({
//   user,
//   updatedAt,
//   text,
//   selected,
//   index,
//   imageUrl,
//   bookmarked,
//   _id,
// }) => {
//   const [show, setShow] = useState(false);
//   const { setChatLog, toggleCheck } = useAppContext();

//   const handleMouseOver = () => setShow(true);
//   const handleMouseOut = () => setShow(false);

//   const display = show ? "flex" : "none";

//   return (
//     <Box
//       onMouseOver={handleMouseOver}
//       onMouseOut={handleMouseOut}
//       sx={{
//         whitespace: "pre",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "reverse",
//         mb: 1,
//         padding: "5px 12px 15px",
//         borderRadius: 2,
//         backgroundColor: selected && "#fbfbfb",
//         border: `1px solid ${selected ? "#bcdbfd" : "transparent"}`,
//         "&:hover": {
//           backgroundColor: "rgba(52,53,65,0.05)",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           borderRadius: "50%",
//           mt: 1.5,
//           mr: 1,
//           width: 50,
//           height: 50,
//           "@media (max-width: 600px)": {
//             display: "none",
//           },
//         }}
//       >
//         <StyledUserLogo
//           src={
//             user === "OpenAI"
//               ? "https://media.discordapp.net/attachments/594312779545051221/1068575020361715774/sticker2.png"
//               : "https://media.discordapp.net/attachments/594312779545051221/1068574850203009144/sticker29.png"
//           }
//         />
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flex: 1,
//           flexDirection: "column",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             mt: 1,
//             mb: -0.5,
//             alignItems: "center",
//             wordBreak: "break-word",
//           }}
//         >
//           <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{user}</Typography>
//           {user === "OpenAI" ? (
//             <Badge>
//               <DoneIcon
//                 style={{ height: "14px", width: "14px", marginRight: "2px" }}
//               />
//               Bot
//             </Badge>
//           ) : (
//             <Box sx={{ width: 8 }} />
//           )}
//           <Typography sx={{ opacity: 0.6, fontSize: 12 }}>
//             {formatDate(updatedAt) || ""}
//           </Typography>
//           <Box sx={{ flex: 1, display: "flex", flexDirection: "row-reverse" }}>
//             <Box
//               sx={{
//                 border: "1px solid #dfe1e3",
//                 borderRadius: 1.5,
//                 position: "sticky",
//                 mt: "-40px",
//                 mr: "8px",
//                 backgroundColor: " white",
//                 display,
//                 color: "#505761",
//               }}
//             >
//               <Tooltip title="Bookmark">
//                 <Box
//                   sx={{
//                     p: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",

//                     alignSelf: "center",
//                     "&:hover": {
//                       backgroundColor: "#dfe1e3",
//                     },
//                   }}
//                   onClick={() =>
//                     navigator.clipboard.writeText(imageUrl ? imageUrl : text)
//                   }
//                 >
//                   {bookmarked ? (
//                     <BookmarkIcon sx={{ width: "25px", height: "25px" }} />
//                   ) : (
//                     <BookmarkBorderIcon
//                       sx={{ width: "25px", height: "25px" }}
//                     />
//                   )}
//                 </Box>
//               </Tooltip>
//               <Tooltip title="Copy to clipboard">
//                 <Box
//                   sx={{
//                     p: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     alignSelf: "center",
//                     "&:hover": {
//                       backgroundColor: "#dfe1e3",
//                     },
//                   }}
//                   onClick={() =>
//                     navigator.clipboard.writeText(imageUrl ? imageUrl : text)
//                   }
//                 >
//                   <ContentCopyIcon sx={{ width: "20px", height: "20px" }} />
//                 </Box>
//               </Tooltip>

//               <Tooltip title="Include relevant data as part of chat history">
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     alignSelf: "center",
//                     "&:hover": {
//                       backgroundColor: "#dfe1e3",
//                     },
//                   }}
//                 >
//                   <Checkbox
//                     sx={{ height: "40px", width: "40px", alignSelf: "center" }}
//                     checked={selected}
//                     onChange={() => toggleCheck(user, index)}
//                     size={"small"}
//                   />
//                 </Box>
//               </Tooltip>

//               <Tooltip title="Delete Message">
//                 <Box
//                   sx={{
//                     p: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     alignSelf: "center",
//                     "&:hover": {
//                       backgroundColor: "#dfe1e3",
//                     },
//                   }}
//                   onClick={async () => {
//                     try {
//                       const response = await Swal.fire({
//                         icon: "warning",
//                         title: "Are you sure you want to delete this message?",
//                         text: "You won't be able to revert this!",
//                         showCancelButton: true,
//                       });
//                       if (response.isConfirmed) {
//                         await axios.delete(`/api/message/${_id}`);
//                         setChatLog((prev) =>
//                           prev.filter((msg) => msg._id !== _id)
//                         );
//                       }
//                     } catch (error) {
//                       Swal.fire({
//                         icon: "error",
//                         title: "Unable to delete message",
//                         error: error?.message || "Something went wrong!",
//                       });
//                       console.error(error);
//                     }
//                   }}
//                 >
//                   <DeleteIcon sx={{ width: "25px", height: "25px" }} />
//                 </Box>
//               </Tooltip>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             lineHeight: 1.3,
//             overflowX: "auto",
//             pt: 1,
//           }}
//         >
//           {imageUrl ? (
//             <StyledImage src={imageUrl} />
//           ) : (
//             <CodeBlock text={text?.trim()} />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

const ChatLog = () => {
  const {
    chatLog = [],
    setChatLog,
    toggleCheck,
    loadingMessages,
  } = useAppContext();
  const chatRef = useRef(null);

  const scrollToBottom = () =>
    (chatRef.current.scrollTop = chatRef.current.scrollHeight);

  useEffect(() => {
    scrollToBottom();
  }, [loadingMessages, chatLog?.length]);

  if (loadingMessages) {
    return (
      <Box
        ref={chatRef}
        sx={{
          pt: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <CircularProgress style={{ width: "60px", height: "60px" }} />
      </Box>
    );
  }

  return (
    <Box
      ref={chatRef}
      sx={{
        pt: 1,
        mb: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {chatLog.map((data, index) => {
        return (
          <Box key={`message${index}`} sx={{ width: "100%" }}>
            <Message
              {...data}
              index={index}
              setChatLog={setChatLog}
              toggleCheck={toggleCheck}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatLog;
