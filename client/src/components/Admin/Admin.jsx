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
import { useState, useEffect } from "react";

import { AllPublish } from "./AllPublish";
import { ListClient } from "./ListClient";
import { ListPublish } from "./ListPublish";
import { ListUser } from "./ListUser";
import { Profile } from "./Profile";
import { Publish } from "./Publish";
import { Profile_edit } from "./Profile_edit";
import { ReservacionesCliente } from "./ReservasClient";

const UserSettings = () => {
  const [showMenu, setshowMenu] = useState(true);
  const [component, setComponent] = useState({
    listclient: false,
    listpublish: false,

    listuser: false,
    profile: true,
    publish: false,
    allpublish: false,
    reservaciones: false,
  });

  const [auth, setAuth] = useState("");

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

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
      reservaciones: false,
      [name]: true,
    });
  };

  return (
    <>
      {auth?.role == "Client" ? (
        <div className="admin-container">
          <div
            className={`sidebar-header ${
              showMenu ? "view-menu" : "hidden-menu"
            }`}
          >
            <div className="sidebar-list">
            <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="profile"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control">
                    <RiFileList3Line />
                  </div>
                  <div className="text-panel-control">
                    Perfil
                  </div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="settingpro"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiSettings5Fill /></div>
                  <div className="text-panel-control">Editar perfil</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="reservaciones"
                  onClick={handleComponent}
                  href="#"
                >
                  {/* Cambiar icono*/}
                  <div className="icon-panel-control"><RiSettings5Fill /></div>
                  <div className="text-panel-control">Reservaciones</div>
                </a>
              </span>
            </div>
            <div className="sidebar-footer">
              <a
                className="side-item side-item-github"
                href="https://github.com/felduque/lookingplace"
                target="_blank"
              >
                <div className="icon-panel-control"><RiGithubFill /></div>
                <div className="text-panel-control">Github</div>
              </a>
            </div>
          </div>
          <button className="toggle-btn" onClick={handleShowMenu}>
            {showMenu ? <RiCloseCircleFill /> : <RiMenuLine />}
          </button>
          <main className="main-container">
            <div className="main-content">
              {component.settingpro && <Profile_edit />}
              {component.profile && <Profile />}
              {component.reservaciones && <ReservacionesCliente />}
            </div>
          </main>
        </div>
      ) : auth?.role == "Tenant" ? (
        <div className="admin-container">
          <div
            className={`sidebar-header ${
              showMenu ? "view-menu" : "hidden-menu"
            }`}
          >
            <div className="sidebar-list">
            <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="profile"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control">
                    <RiFileList3Line />
                  </div>
                  <div className="text-panel-control">
                    Perfil
                  </div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="settingpro"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiSettings5Fill /></div>
                  <div className="text-panel-control">Editar perfil</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="publish"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiFileChartFill /></div>
                  <div className="text-panel-control">Publicar</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="listclient"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiWindow2Line /></div>
                  <div className="text-panel-control">Clientes</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="listpublish"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiUser3Fill /></div>
                  <div className="text-panel-control">Publicaciones</div>
                  
                </a>
              </span>
            </div>
            <div className="sidebar-footer">
              <a
                className="side-item side-item-github"
                href="https://github.com/felduque/lookingplace"
                target="_blank"
              >
                <div className="icon-panel-control"><RiGithubFill /></div>
                <div className="text-panel-control">Github</div>
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
              {component.profile && <Profile />}
              {component.publish && <Publish />}
            </div>
          </main>
        </div>
      ) : (
        <div className="admin-container">
          <div
            className={`sidebar-header ${
              showMenu ? "view-menu" : "hidden-menu"
            }`}
          >
            <div className="sidebar-list">
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="profile"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control">
                    <RiFileList3Line />
                  </div>
                  <div className="text-panel-control">
                    Perfil
                  </div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="settingpro"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiSettings5Fill /></div>
                  <div className="text-panel-control">Editar perfil</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="publish"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiFileChartFill /></div>
                  <div className="text-panel-control">Publicar</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="listclient"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiWindow2Line /></div>
                  <div className="text-panel-control">Clientes</div>
                  
                </a>
              </span>
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="listpublish"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiUser3Fill /></div>
                  <div className="text-panel-control">Publicaciones</div>
                  
                </a>
              </span>

          
              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="listuser"
                  onClick={handleComponent}
                >
                  <div className="icon-panel-control"><RiTeamFill/></div>
                  <div className="text-panel-control">Usuarios</div>
                </a>
              </span>


              <span className="sidebar-list-item">
                <a
                  className="side-item"
                  name="allpublish"
                  onClick={handleComponent}
                  href="#"
                >
                  <div className="icon-panel-control"><RiDatabase2Fill /></div>
                  <div className="text-panel-control">Todas las publicaciones</div>
                  
                </a>
              </span>
            </div>
            <div className="sidebar-footer">
              <a
                className="side-item side-item-github"
                href="https://github.com/felduque/lookingplace"
                target="_blank"
              >
                <div className="icon-panel-control"><RiGithubFill /></div>
                <div className="text-panel-control">Github</div>
                
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
      )}
    </>
  );
};

export default UserSettings;
