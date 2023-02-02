import { useState } from "react";

const useFetchLogin = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [tokenClient, setTokenClient] = useState({});

  const handleGoogleLogin = async (response) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //'Authorization': `Bearer ${response}`
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogleLogin };
};

export default useFetchLogin;
