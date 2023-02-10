/*import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./Login.css";

const LoginGoogle = () => {
  const { handleGoogle, loading, error } = useFetch(
    "http://127.0.0.1:3000/loginGoogle"
  );

  useEffect(() => {
    /* global google */
/*if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "778898809008-ivfhum2r8jiuhsaqh8f86ba8ua0q2vu4.apps.googleusercontent.com",
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        type: "standard",
        theme: "filled_black",
        size: "medium",

        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <main>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default LoginGoogle;*/
