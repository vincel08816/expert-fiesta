import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import Content from "./components/chatComponents/Content";
import Sidebar from "./components/Sidebar";

const App = () => {
  const { user, loading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user]);

  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
};

export default App;
