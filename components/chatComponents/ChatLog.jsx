import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatLog } from "../../store/chatLogSlice";
import Message from "./Message";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const executeScroll = (ref) => ref?.current?.scrollIntoView();

const ChatLog = () => {
  const chatRef = useRef(null);
  const scrollRef = useRef(null);
  const [lastElement, setLastElement] = useState(null);
  const { page, loading, hasMore } = useInfiniteScroll(lastElement, scrollRef);
  const {
    conversations: { selected },
    chatLog: { chatLog, loadingChatLog },
  } = useSelector((state) => state);

  // scroll to bottom
  useEffect(() => {
    if (page === 0) {
      if (!chatRef || !chatRef.current) return;
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [loadingChatLog, chatLog?.length]);

  const memoizedChatLog = useMemo(
    () =>
      chatLog.map((data, index) => {
        const boxProps = { key: `message${index}`, sx: { width: "100%" } };
        if (index === 0) boxProps.ref = setLastElement;
        if (chatLog.length > limit && index === limit) boxProps.ref = scrollRef;

        return (
          <Box {...boxProps} children={<Message {...data} index={index} />} />
        );
      }),
    [chatLog]
  );

  // if (loadingChatLog) {
  //   return (
  //     <Box ref={chatRef} sx={loadingSx}>
  //       <CircularProgress style={{ width: 60, height: 60 }} />
  //     </Box>
  //   );
  // }

  return (
    <Box ref={chatRef} sx={chatContainerSx}>
      {selected > 0 && loading && hasMore && (
        <CircularProgress style={{ width: 60, height: 60, mt: -6 }} />
      )}

      {memoizedChatLog}
    </Box>
  );
};

export default ChatLog;

const limit = 10; // how many messages to get per axios request

const useInfiniteScroll = (lastElement, scrollRef) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // loading for infinite scroll only
  const [page, setPage] = useState(0); // current page
  const [hasMore, setHasMore] = useState(true); // has more data in the database

  const {
    chatLog: { chatLog },
    conversations: { conversations, selected }, // selected index of conversations
  } = useSelector((state) => state);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasMore) {
        setLoading(true);
        setPage((p) => p + 1);
      }
    })
  );

  const fetchMore = useCallback(() => {
    if (selected === -1 || !hasMore) return;
    setLoading(true);
    const id = conversations[selected]._id;
    const url = `/api/message/${id}?limit=${limit}&page=${page}`;

    console.log("fetch more", url);

    // axios request here.
    axios
      .get(url)
      .then(({ data }) => {
        console.log("fetch more data:", data);
        const messageObject = {};
        [...data.messages, ...chatLog].forEach(
          (message) => (messageObject[message._id] = message)
        );
        const sortedMessages = Object.values(messageObject).sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        dispatch(setChatLog(sortedMessages));

        setHasMore(data.hasMore);
      })
      .catch(console.error)
      .then(async () => {
        executeScroll(scrollRef);
        await delay(1000);
        setLoading(false);
      });
  }, [selected, chatLog, page]);

  useEffect(() => {
    if (selected === -1) return;
    dispatch(setChatLog([]));
    setHasMore(true);
    setPage(0);
    fetchMore();
  }, [selected]);

  useEffect(() => {
    if (hasMore && loading) {
      fetchMore();
    }
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      console.log("interesected? ");
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) currentObserver.unobserve(currentElement);
    };
  }, [lastElement]);

  return { page, fetchMore, loading, hasMore };
};

const chatContainerSx = {
  pt: 3,
  mb: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
};

const loadingSx = {
  pt: 5,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  flex: 1,
};
