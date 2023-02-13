import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getAllUsers, getAllTenants } from "./Api";
export const ListUser = () => {
  const [users, setUsers] = React.useState([]);
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
  }, []);

  const changeViewList = (e) => {
    if (e.target.value === "listUser") {
      setViewList({ listUser: true, listTenant: false });
    } else if (e.target.value === "listTenant") {
      setViewList({ listUser: false, listTenant: true });
    }
  };

  if (viewList.listUser === true) {
    return (
      <>
        <button
          className="button  is-link is-outlined is-centered is-rounded  "
          value="listTenant"
          onClick={changeViewList}
        >
          Ver Arrendatarios
        </button>
        <div className="listUser">
          <div className="listuserall">
            <h2>Lista de Clientes</h2>
            <DataGrid
              rows={users}
              loading={users.length === 0}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
      </>
    );
  } else if (viewList.listTenant === true) {
    return (
      <>
        <button
          className="button is-link"
          value="listUser"
          onClick={changeViewList}
        >
          Ver Clientes
        </button>
        <div className="listUser">
          <div className="listuserall">
            <h2>Lista de Arrendatarios</h2>
            <DataGrid
              rows={tenant}
              loading={tenant.length === 0}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
      </>
    );
  }
};
