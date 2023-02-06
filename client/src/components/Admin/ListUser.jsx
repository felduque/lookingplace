import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getAllUsers } from "./Api";
export const ListUser = () => {
  const [users, setUsers] = React.useState([]);

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
      setUsers(users.data);
    };
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div className="listUser">
      <div className="listuserall">
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};
