import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getAllUsers, getAllTenants, deleteClient, deleteTenant } from "./Api";
import Swal from "sweetalert2";
export const ListUser = () => {
  const [users, setUsers] = React.useState([]);
  const [clientIds, setClientIds] = React.useState([]);
  const [tenant, setTenant] = React.useState([]);
  const [viewList, setViewList] = React.useState({
    listUser: true,
    listTenant: false,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", width: 160 },
    { field: "email", headerName: "Email ", width: 190 },
    {
      field: "phone",
      headerName: " Telefono",
      type: "number",
      width: 120,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      const tenan = await getAllTenants();
      console.log(tenan);
      setTenant(tenan.data);
      setUsers(users.data);
    };
    fetchUsers();
  }, [
    // cada que se elimine un cliente se vuelve a ejecutar el useEffect
    clientIds,
  ]);

  const changeViewList = (e) => {
    if (e.target.value === "listUser") {
      setViewList({ listUser: true, listTenant: false });
    } else if (e.target.value === "listTenant") {
      setViewList({ listUser: false, listTenant: true });
    }
  };

  const handleDeleteTenant = () => {
    // recorrer el array de ids y eliminar cada uno de los clientes
    if (clientIds.length === 0)
      return Swal.fire("Error", "No hay clientes seleccionados", "error");
    Swal.fire({
      title: "¿Estas seguro de eliminar estos clientes?",
      text: `Se eleminaran los siguentes clients: ${clientIds}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        clientIds?.forEach((id) => {
          deleteTenant(id);
          setTenant(tenant.filter((user) => user.id !== id));
        });
        Swal.fire(
          "Eliminados!",
          "Los clientes han sido eliminados.",
          "success"
        );
      }
    });
  };

  const handleDeleteClient = () => {
    // recorrer el array de ids y eliminar cada uno de los clientes
    if (clientIds.length === 0)
      return Swal.fire("Error", "No hay clientes seleccionados", "error");
    Swal.fire({
      title: "¿Estas seguro de eliminar estos clientes?",
      text: `Se eleminaran los siguentes clients: ${clientIds}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        clientIds?.forEach((id) => {
          deleteClient(id);
          setUsers(users.filter((user) => user.id !== id));
        });
        Swal.fire(
          "Eliminados!",
          "Los clientes han sido eliminados.",
          "success"
        );
      }
    });
  };

  if (viewList.listUser === true) {
    return (
      <>
        <div className="container-title-section-panel">
          <h2 className="title-profile-container">LISTADO DE USUARIOS </h2>
        </div>
        <button
          className="button is-link "
          value="listTenant"
          onClick={changeViewList}
        >
          Ver Arrendatarios
        </button>
        <button
          className="button is-danger"
          value="deleteClients"
          onClick={handleDeleteClient}
        >
          Borrar Clientes
        </button>
        <div className="listUser">
          <div className="listuserall">
            <DataGrid
              style={{
                height: 400,
                width: "100%",
                color: "white",
                fontWeight: "bold",
              }}
              rows={users}
              loading={users.length === 0}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              //obtener todas las id seleccionadas de clients y guardarlas en un array
              onSelectionModelChange={(newSelection) => {
                console.log(newSelection);
                setClientIds(newSelection);
              }}
              checkboxSelection
            />
          </div>
        </div>
      </>
    );
  } else if (viewList.listTenant === true) {
    return (
      <>
        <div className="container-title-section-panel">
          <h2 className="title-profile-container">LISTADO DE ARRENDATARIOS</h2>
        </div>
        <button
          className="button is-link"
          value="listUser"
          // se setea el Clientids a vacio para que no se queden los ids de los clientes seleccionados
          onClick={changeViewList}
        >
          Ver Clientes
        </button>
        <button
          className="button is-danger"
          value="deleteClients"
          onClick={handleDeleteTenant}
        >
          Borrar Arrendatarios
        </button>
        <div className="listUser">
          <div className="listuserall">
            <DataGrid
              style={{
                height: 400,
                width: "100%",
                color: "white",
                fontWeight: "bold",
              }}
              rows={tenant}
              loading={tenant.length === 0}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              onSelectionModelChange={(newSelection) => {
                console.log(newSelection);
                setClientIds(newSelection);
              }}
              checkboxSelection
            />
          </div>
        </div>
      </>
    );
  }
};
