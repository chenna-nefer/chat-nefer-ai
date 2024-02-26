import { useEffect, useState } from "react";

function useAuthToken() {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return authToken;
}

export default useAuthToken;
