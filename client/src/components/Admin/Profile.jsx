import React, { useEffect } from "react";
import { getTenantById, getUserById } from "./Api.js";
import { UserAuth } from "../../service/AuthContext";
export const Profile = () => {
  const [users, setUsers] = React.useState([]);
  const [about, setAbout] = React.useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const idClient = storedAuth?.idClient;
      const idTenant = storedAuth?.idTenant;
      if (storedAuth.role === "Client") {
        const users = await getUserById(idClient);
        const about = users.data.Aboutmes;
        setAbout(about);
        setUsers(users.data);
      } else if (storedAuth.role === "Tenant" || storedAuth.role === "Admin") {
        const users = await getTenantById(idTenant);
        const about = users.data.Aboutmes;
        setAbout(about);
        setUsers(users.data);
      }
    };
    fetchUsers();
  }, []);

  const hobbie = about[0]?.hobbies;
  const aboutMe = about[0];

  console.log(users);
  console.log(users?.phone);
  console.log(users?.email);

  return (
    <>
      <div className="container-title-section-panel">
        <h2 className="title is-4">Tu perfil</h2>
      </div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-header-title">
            <img
              className="image-profile"
              src={
                user?.photoURL ? user?.providerData[0]?.photoURL : users.avatar
              }
              alt="profile"
            />
            <span className="content-profile-name">
              <h1 className="name-profile">
                {users?.fullName || user?.displayName}{" "}
              </h1>
            </span>
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-content-title-description">
            <h1 className="title is-4">Descripción</h1>
            <p className="title is-5">
              {aboutMe ? aboutMe?.description : "No hay descripción"}
            </p>
            <div className="hobbies-content">
              <h1 className="title is-4">Aficiones</h1>
              <div className="hobbies-profile">
                {hobbie ? (
                  hobbie?.map((hobbie, index) => {
                    return (
                      <div key={index} className="hobby-profile">
                        <p>{hobbie}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="hobby-profile">No hay aficiones</p>
                )}
              </div>
            </div>
            <div className="profile-detail">
              <div className="detail-profile">
                <h2 className="title is-4">País / Ciudad</h2>
                <p>{aboutMe ? aboutMe?.from : "No hay pais"}</p>
              </div>

              <div className="detail-profile">
                <h2 className="title is-4">Teléfono</h2>
                <p>{aboutMe ? users?.phone : "No hay telefono"}</p>
              </div>
              
              <div className="detail-profile">
                <h2 className="title is-4">Correo</h2>
                <p>{users?.email || user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
