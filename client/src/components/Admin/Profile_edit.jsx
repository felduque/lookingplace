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
      if (storedAuth.role === "Client") {
        const users = await getUserById(idClient);
        setUsers(users.data);
        setIdUser(idClient);
      } else if (storedAuth.role === "Tenant" || storedAuth.role === "Admin") {
        const users = await getTenantById(idTenant);
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
    if (form.hobbies.length > 5)
      return alert("Solo puedes seleccionar 5 hobbies");
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
      alert("No se pudo actualizar el perfil");
    }
    // setForm({
    //   ...form,
    //   avatar: [],
    //   fullName: "",
    //   phone: "",
    //   from: "",
    //   age: "",
    //   description: "",
    //   hobbies: [],
    // });
  };

  // if (form.hobbies.length > 5) {
  //   alert("Solo puedes seleccionar 5 hobbies");
  //   setForm({ ...form, hobbies: [] });
  // }

  // Form edit values user edit profile, avatar, name, lastname, email, password, description, hobbies
  return (
    <form onSubmit={handleSubmit} className="form-profile">
      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="name"
          className="form-control"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="phone">
          Telefono
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          className="form-control"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="from">
          From
        </label>
        <input
          type="text"
          name="from"
          id="from"
          className="form-control"
          onChange={(e) => setForm({ ...form, from: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="age">
          Edad
        </label>
        <input
          type="text"
          name="age"
          id="age"
          className="form-control"
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="description">
          Descripción
        </label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
      </div>
      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="hobbies">
          Hobbies
        </label>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isSearchable={true}
          maxMenuHeight={100}
          isMulti
          options={opciones}
          // guardar en string sin value y label
          onChange={(e) => iterarHobbieLabel(e)}
        />
      </div>
      <div className="form-group">
        <label className="title-form-edit-profile" htmlFor="avatar">
          Avatar
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="form-control"
          onChange={saveAvatarUpload}
        />
      </div>
      <div className="viewAvatarUpload">
        <div className="content-avatar-setting">
          <h2>Nuevo Avatar</h2>
          <img src={avatarupload} alt="Avatar" />
        </div>
        <div className="content-avatar-setting">
          <h2>Avatar Actual</h2>
          <img src={users?.avatar} alt="ActualAvatar" />
        </div>
      </div>
      <div className="form-group">
        <button type="submit" className="btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
