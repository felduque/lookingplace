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
    { field: "fullName", headerName: "Nombre", width: 160 },
    { field: "email", headerName: "Correo ", width: 190 },
    {
      field: "phone",
      headerName: " Teléfono",
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
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clientIds?.forEach((id) => {
          deleteTenant(id);
          setTenant(tenant.filter((user) => user.id !== id));
        });
        Swal.fire(
          "Eliminados",
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
      title: "¿Estás seguro de eliminar estos clientes?",
      text: `Se eleminarán los siguentes clientes con ID: ${clientIds}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clientIds?.forEach((id) => {
          deleteClient(id);
          setUsers(users.filter((user) => user.id !== id));
        });
        Swal.fire(
          "Eliminados",
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
          <div className="title is-4">Listado de usuarios</div>
        </div>
        <button
          className="button is-link space-button-list-users"
          value="listTenant"
          onClick={changeViewList}
        >
          Ver arrendatarios
        </button>
        <button
          className="button is-danger space-button-list-users"
          value="deleteClients"
          onClick={handleDeleteClient}
        >
          Borrar clientes
        </button>
        <div className="listUser">
          <div className="listuserall">
            <DataGrid
              style={{
                height: 400,
                width: "100%",
                color: "gray",
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
          <h2 className="title is-4">Listado de arrendatarios</h2>
        </div>
        <button
          className="button is-link space-button-list-users"
          value="listUser"
          // se setea el Clientids a vacio para que no se queden los ids de los clientes seleccionados
          onClick={changeViewList}
        >
          Ver clientes
        </button>
        <button
          className="button is-danger space-button-list-users"
          value="deleteClients"
          onClick={handleDeleteTenant}
        >
          Borrar arrendatarios
        </button>
        <div className="listUser">
          <div className="listuserall">
            <DataGrid
              style={{
                height: 400,
                width: "100%",
                color: "gray",
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
