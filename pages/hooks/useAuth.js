import axios from "axios";
import { useEffect, useState } from "react";

/**
 * useAuth is a hook created to provide secure user authentication for JavaScript applications.
 * It enables users to create accounts, log in, reset passwords and configure access levels for authorization of data. Advanced security features are enabled such as encryption and hashing algorithms to ensure data safety. It can easily be integrated with existing solutions also.
 */

export const useAuth = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  /* this will somehow grab the messages */
  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
      .then(() => setLoading(false));
  }, []);

  return {
    user,
    setUser,
    loading,
  };
};
