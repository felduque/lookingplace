import React, { useEffect } from "react";

import "./Login.css";
import { UserAuth } from "../../../service/AuthContext";

export default function LoginGoogle() {
  const { googleSignIn } = UserAuth();
  const init = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={init}>Google</button>;
}
