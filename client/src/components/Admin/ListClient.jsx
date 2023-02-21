import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export const ListClient = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Nombre", width: 140 },
    { field: "email", headerName: "Correo", width: 130 },
    { field: "pais", headerName: "País", width: 90 },
    { field: "edad", headerName: "Edad", type: "number", width: 90 },
    { field: "telefono", headerName: "Teléfono", type: "number", width: 140 },
    {
      field: "payment",
      headerName: "Pago",
      width: 130,
      type: "number",
    },
    { field: "metodo", headerName: "Método de Pago", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      fullName: "Teodoro",
      email: "teo@gmail.com",
      pais: "Ucrania",
      edad: 19,
      telefono: 3424234324,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 2,
      fullName: "lucas",
      email: "felfle@gmail.com",
      pais: "Colombia",
      edad: 23,
      telefono: 214432423,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 3,
      fullName: "fewfew",
      email: "fwefe@gmail.com",
      pais: "Lols",
      edad: 22,
      telefono: 2133123,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 4,
      fullName: "fewfew",
      email: "fewf@gmail.com",
      pais: "Rfwe",
      edad: 23,
      telefono: 546654,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 5,
      fullName: "fwefw",
      email: "greqgm@gmail.com",
      pais: "ewrew",
      edad: 65,
      telefono: 534543,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 6,
      fullName: "werwer",
      email: "erwrqgma@gmail.com",
      pais: "efwwfew",
      edad: 34,
      telefono: 345346,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 7,
      fullName: "werewr",
      email: "fewfew@gmail.com",
      pais: "ewfwf",
      edad: 76,
      telefono: 43454354,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 8,
      fullName: "wrwer",
      email: "greg@gmail.com",
      pais: "ewfwef",
      edad: 56,
      telefono: 435435,
      payment: 324324,
      metodo: "paypal",
    },
    {
      id: 9,
      fullName: "greggdfg",
      email: "fewfew@gmail.com",
      pais: "ewfewf",
      edad: 35,
      telefono: 34543435345,
      payment: 324324,
      metodo: "paypal",
    },
  ];

  return (
    <>
      <div className="container-title-section-panel">
        <div className="title is-4">Clientes</div>
      </div>
      <div className="listUser">
        <div className="listuserall">
          <DataGrid
            style={{
              height: 400,
              width: "100%",
              color: "gray",
              fontWeight: "bold",
            }}
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};
