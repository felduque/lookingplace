import React, { useEffect } from "react";
import useFetchLogin from "./handleGoogleLogin";

const LoginGoogle = () => {
  const { handleGoogleLogin, loading /*error*/ } = useFetchLogin(
    "http://localhost:3000/loginGoogle"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        theme: "filled_black",
        size: "medium",
        type: "standard",
      });

      //google.accounts.id.prompt()
    }
  }, [handleGoogleLogin]);

  return (
    <>
      <div className="all">
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/*<Link to="/signup">{error && <p style={{ color: "red" }}>{error}</p>}</Link>*/}
          {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
        </main>
      </div>
    </>
  );
};

export default LoginGoogle;
