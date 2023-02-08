import React from "react";
import "./stylepanel.css";
import {
  RiWindow2Line,
  RiUser3Fill,
  RiTeamFill,
  RiFileList3Line,
  RiFileChartFill,
  RiDatabase2Fill,
  RiGithubFill,
  RiMenuLine,
  RiCloseCircleFill,
  RiSettings5Fill,
} from "react-icons/ri";
import { useState } from "react";

import { AllPublish } from "./AllPublish";
import { ListClient } from "./ListClient";
import { ListPublish } from "./ListPublish";
import { ListUser } from "./ListUser";
import { Profile } from "./Profile";
import { Publish } from "./Publish";
import { Profile_edit } from "./Profile_edit";

const UserSettings = () => {
  const [showMenu, setshowMenu] = useState(true);
  const [component, setComponent] = useState({
    listclient: false,
    listpublish: false,

    listuser: false,
    profile: true,
    publish: false,
    allpublish: false,
  });

  console.log(component);
  const handleShowMenu = () => {
    setshowMenu(!showMenu);
  };

  const handleComponent = (e) => {
    const { name } = e.target;
    setComponent({
      homepanel: false,
      listclient: false,
      settingpro: false,
      listpublish: false,
      listuser: false,
      profile: false,
      publish: false,
      allpublish: false,
      [name]: true,
    });
  };

  return (
    <div className="admin-container">
      <div
        className={`sidebar-header ${showMenu ? "view-menu" : "hidden-menu"}`}
      >
        <div className="sidebar-list">
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="profile"
              onClick={handleComponent}
              href="#"
            >
              <RiFileList3Line />
              Perfil
            </a>
          </span>
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="settingpro"
              onClick={handleComponent}
              href="#"
            >
              <RiSettings5Fill />
              Editar Perfil
            </a>
          </span>
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="publish"
              onClick={handleComponent}
              href="#"
            >
              <RiFileChartFill />
              Publicar
            </a>
          </span>
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="listclient"
              onClick={handleComponent}
              href="#"
            >
              <RiWindow2Line />
              Clientes
            </a>
          </span>
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="listpublish"
              onClick={handleComponent}
              href="#"
            >
              <RiUser3Fill />
              Publicaciones
            </a>
          </span>
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="listuser"
              onClick={handleComponent}
              href="#"
            >
              <RiTeamFill />
              Usuarios
            </a>
          </span>

          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="allpublish"
              onClick={handleComponent}
              href="#"
            >
              <RiDatabase2Fill />
              Todas las publicaciones
            </a>
          </span>
        </div>
        <div className="sidebar-footer">
          <a
            className="side-item"
            href="https://github.com/felduque/lookingplace"
            target="_blank"
          >
            <RiGithubFill />
            Github
          </a>
        </div>
      </div>
      <button className="toggle-btn" onClick={handleShowMenu}>
        {showMenu ? <RiCloseCircleFill /> : <RiMenuLine />}
      </button>
      <main className="main-container">
        <div className="main-content">
          {component.listclient && <ListClient />}
          {component.settingpro && <Profile_edit />}
          {component.listpublish && <ListPublish />}
          {component.listuser && <ListUser />}
          {component.profile && <Profile />}
          {component.publish && <Publish />}
          {component.allpublish && <AllPublish />}
        </div>
      </main>
    </div>
  );
};

export default UserSettings;
