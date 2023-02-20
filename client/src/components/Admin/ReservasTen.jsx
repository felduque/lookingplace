import { useEffect, useState } from "react";
import { getTenantById } from "./Api";
import PersonVerify from "./Icons/PersonVerify";
import WspIcon from "./Icons/Wsp";
import EmailIcon from "./Icons/Email";

export default function ReservasTen({ id }) {
  const [tenantSearch, setTenantSearch] = useState({});

  useEffect(() => {
    const axiosTenant = async () => {
      const tenant = await getTenantById(id);
      setTenantSearch(tenant.data);
    };
    axiosTenant();
  }, [id]);

  console.log(tenantSearch);

  const handleWsp = () => {
    let mensaje =
      "Hola me comunico de LookingPlace, he alquilado tu alojamiento!. Serias tan amable de resolver mi siguiente consulta ...";
    const mensajeCode = encodeURI(mensaje);
    console.log(mensajeCode);
    window.open(
      `https://api.whatsapp.com/send?phone=${tenantSearch.phone}&text=${mensajeCode}`,
      "_blank" // <- This is what makes it open in a new window.
    );
  };

  if (!tenantSearch.id) return <div>Cargando...</div>;
  return (
    <>
      <h1
        style={{
          marginTop: "10px",
          color: "rgb(2, 255, 175)",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Tu Hospedador:
      </h1>
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "5px auto",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
            }}
          >
            <img
              style={{ borderRadius: "50px", height: "90px", width: "90px" }}
              src={tenantSearch.avatar}
              alt=""
            />
          </div>
          <div
            style={{
              width: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              color: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "3px",
              }}
            >
              <PersonVerify
                width="25px"
                height="25px"
                style={{ margin: "0 10px" }}
              />
              <p>{tenantSearch.fullName}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "3px",
              }}
            >
              <EmailIcon
                width="25px"
                height="25px"
                style={{ margin: "0 10px" }}
              />
              <p>{tenantSearch.email}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleWsp}
            >
              <WspIcon
                width="23px"
                height="23px"
                style={{ margin: "0 10px" }}
              />
              <p>{tenantSearch.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
