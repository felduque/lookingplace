import React, { useEffect } from "react";
import { getUserById } from "./Api.js";

export const Profile = () => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUserById(1);

      //accedo a la primera posicion del array
      console.log(users.data);
      setUsers(users.data);
    };
    fetchUsers();
  }, []);

  console.log(users);

  const hobbies = [
    { id: 1, name: "Futbol" },
    { id: 2, name: "Videojuegos" },
    { id: 3, name: "Programación" },
    { id: 4, name: "Cocinar" },
    { id: 5, name: "Leer" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-title">
          <img
            className="image-profile"
            src="https://picsum.photos/200"
            alt="profile"
          />
          <span className="content-profile-name">
            <h1 className="name-profile">Felipe Duque Gomez </h1>
          </span>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-content-title-description">
          <h1 className="title-profile">Descripción</h1>
          <p className="description-profile">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae, voluptatum, quod, voluptas quibusdam voluptates voluptatibus
            quidem quos quia quas voluptatem. Quisquam quae, voluptatum, quod,
            voluptas quibusdam voluptates voluptatibus quidem quos quia quas
            voluptatem.
          </p>
          <div className="hobbies-content">
            <h1 className="title-profile">Hobbies</h1>
            <div className="hobbies-profile">
              {hobbies.map((hobby) => (
                <li key={hobby.id} className="hobby-profile">
                  {hobby.name}
                </li>
              ))}
            </div>
          </div>
          <div className="profile-detail">
            <div className="detail-profile">
              <h2 className="detail-profile-title">Pais</h2>
              <p className="detail-profile-text">Colombia</p>
            </div>
            <div className="detail-profile">
              <h2 className="detail-profile-title">Ciudad</h2>
              <p className="detail-profile-text">Medellin</p>
            </div>
            <div className="detail-profile">
              <h2 className="detail-profile-title">Telefono</h2>
              <p className="detail-profile-text">123456789</p>
            </div>
            <div className="detail-profile">
              <h2 className="detail-profile-title">Correo</h2>
              <p className="detail-profile-text">felipeduque557@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
