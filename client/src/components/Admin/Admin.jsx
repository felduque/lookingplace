import React from "react";
import "./stylepanel.css";
import {
  RiHome4Fill,
  RiWindow2Line,
  RiUser3Fill,
  RiTeamFill,
  RiFileList3Line,
  RiFileChartFill,
  RiDatabase2Fill,
  RiGithubFill,
  RiMenuLine,
  RiCloseCircleFill,
} from "react-icons/ri";
import { useState } from "react";

import { AllPublish } from "./AllPublish";
import { ListClient } from "./ListClient";
import { ListPublish } from "./ListPublish";
import { ListUser } from "./ListUser";
import { Profile } from "./Profile";
import { Publish } from "./Publish";
import { HomePanel } from "./HomePanel";

const UserSettings = () => {
  const [showMenu, setshowMenu] = useState(true);
  const [component, setComponent] = useState({
    homepanel: true,
    listclient: false,
    listpublish: false,
    listuser: false,
    profile: false,
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
      <sidebar
        className={`sidebar-header ${showMenu ? "view-menu" : "hidden-menu"}`}
      >
        <div className="sidebar-list">
          <span className="sidebar-list-item">
            <a
              className="side-item"
              name="homepanel"
              onClick={handleComponent}
              href="#"
            >
              <RiHome4Fill />
              Inicio
            </a>
          </span>
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
      </sidebar>
      <button className="toggle-btn" onClick={handleShowMenu}>
        {showMenu ? <RiCloseCircleFill /> : <RiMenuLine />}
      </button>
      <header
        className={`header-container ${
          showMenu ? "header-full" : "header-reduce"
        } `}
      >
        <nav>
          <h1 className="title">LOOKING PLACE</h1>
        </nav>
      </header>
      <main className="main-container">
        <div className="main-content">
          {component.homepanel && <HomePanel />}
          {component.listclient && <ListClient />}
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
