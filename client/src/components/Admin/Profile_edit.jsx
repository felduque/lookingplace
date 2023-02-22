import React, { useEffect } from "react";
import { useState } from "react";
import {
  getTenantById,
  getUserById,
  updateAvatar,
  updateAvatarTenant,
  updateClient,
  updateTenant,
} from "./Api";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";

export const Profile_edit = () => {
  //  Form edit values user edit profile, avatar, name, lastname, email, password, description, hobbies
  const animatedComponents = makeAnimated();
  const [avatarupload, setAvatarUpload] = useState("");
  const [store, setStore] = useState([]);
  const [idUser, setIdUser] = useState(0);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    avatar: [],
    fullName: "",
    phone: "",
    from: "",
    age: "",
    description: "",
    hobbies: [],
  });

  const opciones = [
    { value: "cocinar", label: "Cocinar" },
    { value: "bailar", label: "Bailar" },
    { value: "futbol", label: "Futbol" },
    { value: "karate", label: "Karate" },
    { value: "meditar", label: "Meditar" },
    { value: "leer", label: "Leer" },
    { value: "pintar", label: "Pintar" },
    { value: "cantar", label: "Cantar" },
    { value: "dormir", label: "Dormir" },
    { value: "nadar", label: "Nadar" },
    { value: "caminar", label: "Caminar" },
    { value: "correr", label: "Correr" },
    { value: "viajar", label: "Viajar" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
      const idClient = storedAuth?.idClient;
      const idTenant = storedAuth?.idTenant;
      setStore(storedAuth);
      if (storedAuth && storedAuth.role === "Client") {
        const users = await getUserById(idClient);
        const abt = users?.data?.Aboutmes;
        const newValue = {
          fullName: users?.data?.fullName,
          phone: users?.data?.phone,
          description: abt[0]?.description,
          age: abt[0]?.age,
          from: abt[0]?.from,
        };
        setForm(newValue);

        setUsers(users.data);
        setIdUser(idClient);
      } else if (
        (storedAuth && storedAuth.role === "Tenant") ||
        (storedAuth && storedAuth.role === "Admin")
      ) {
        const users = await getTenantById(idTenant);
        const abt = users?.data?.Aboutmes;
        const newValue = {
          fullName: users?.data?.fullName,
          phone: users?.data?.phone,
          description: abt[0]?.description,
          age: abt[0]?.age,
          from: abt[0]?.from,
        };
        setForm(newValue);

        setUsers(users.data);
        setIdUser(idTenant);
      }
    };
    fetchUsers();
  }, []);

  const iterarHobbieLabel = (hobbie) => {
    let hobbieLabel = [];
    hobbie.forEach((element) => {
      hobbieLabel.push(element.label);
    });
    setForm({ ...form, hobbies: hobbieLabel });
  };

  const saveAvatarUpload = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, avatar: file });
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUpload(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Seguro que quieres actualizar el perfil?",
      text: "No podrás revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (form.hobbies.length > 5) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Solo puedes seleccionar 5 hobbies",
          });
        } else {
          // Se convierte array a cadena json
          const hobbies = JSON.stringify(form.hobbies);

          const newForm = {
            fullName: form.fullName,
            phone: form.phone,
            from: form.from,
            age: form.age,
            description: form.description,
            hobbies: hobbies,
          };

          const images = {
            image: form.avatar,
          };
          // patch info axios send form
          if (store.role === "Client") {
            updateClient(idUser, newForm);
            updateAvatar(idUser, images);
          } else if (store.role === "Tenant" || store.role === "Admin") {
            updateTenant(idUser, newForm);
            updateAvatarTenant(idUser, images);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo actualizar el perfil",
            });
          }
          Swal.fire({
            icon: "success",
            title: "Perfil actualizado",
            showConfirmButton: false,
            timer: 1500,
          });
          setForm({
            ...form,
            avatar: [],
            fullName: "",
            phone: "",
            from: "",
            age: "",
            description: "",
            hobbies: [],
          });
        }
      }
    });
  };
  const about = users?.Aboutmes;
  // traer todo el contenido

  return (
    <>
      <div className="container-title-section-panel">
        <div className="title is-4">Edita tu perfil</div>
      </div>
      <div className="form-container-edit-profile">
        <form onSubmit={handleSubmit}>
          <div className="columns">
            <div className="column">Nombre completo</div>
            <div className="column">
              <input
                type="text"
                name="fullName"
                placeholder={users?.fullName}
                id="name"
                className="input"
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">Teléfono</div>
            <div className="column">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder={users?.phone}
                className="input"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">País / Ciudad</div>
            <div className="column">
              <input
                type="text"
                name="from"
                id="from"
                placeholder={about?.from}
                className="input"
                onChange={(e) => setForm({ ...form, from: e.target.value })}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">Edad</div>
            <div className="column">
              <input
                type="text"
                name="age"
                placeholder={about?.age}
                id="age"
                className="input"
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">Sobre mí</div>
            <div className="column">
              <textarea
                type="text"
                placeholder={about?.description}
                name="description"
                id="description"
                className="textarea"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="columns">
            <div className="column">Aficiones</div>
            <div className="column">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                isSearchable={true}
                maxMenuHeight={200}
                placeholder={"Seleciona..."}
                isMulti
                options={opciones}
                // guardar en string sin value y label
                onChange={(e) => iterarHobbieLabel(e)}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              Avatar Actual
              <p>
                <img
                  src={users?.avatar}
                  alt="ActualAvatar"
                  width="150px"
                  height="150px"
                />
              </p>
            </div>
            <div className="column">
              Nuevo avatar
              <p>
                {avatarupload ? (
                  <img src={avatarupload} width="150" height="150" />
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="column">
              <div class="file is-info">
                <label class="file-label">
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className=""
                    onChange={saveAvatarUpload}
                    class="file-input"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Cambiar avatar...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="button is-success centered-button">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};
