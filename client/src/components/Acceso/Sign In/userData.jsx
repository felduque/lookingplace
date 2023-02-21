/*import React, { Component, useEffect, useState } from "react";
//import AdminHome from "./adminHome";

//import UserHome from "./userHome";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  //const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/client/userData", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("auth"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  return (
    <>
      <div>{userData}</div>
    </>
  );
  //return admin ? <AdminHome /> : <UserHome userData={userData} />;
}*/
