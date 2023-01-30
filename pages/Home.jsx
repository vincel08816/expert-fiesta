import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import { useAppContext } from "./context/AppContext";

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
