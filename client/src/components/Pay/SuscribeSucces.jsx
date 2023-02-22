import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo-icon.png";
import { useNavigate } from "react-router-dom";

export default function SuscribeSuccess() {
  const [payParams, setPayParams] = useSearchParams();
  const id = payParams.get("collection_id");
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer APP_USR-7093203553956018-021319-da934253043f73fa0fbbc4cae73616d7-1309803015`,
      },
    };
    axios
      .get(`https://api.mercadopago.com/v1/payments/${id}`, config)
      .then(function (response) {
        // handle success
        setData(response.data);
        let tenantId = parseInt(response.data.additional_info?.payer.last_name);
        let nameTenant = response.data.additional_info?.payer.first_name;
        console.log(tenantId);
        if (response.data) {
          if (response.data.status === "approved") {
            axios.patch("http://localhost:3000/tenant/updatePro", {
              id: tenantId,
              pro: true,
            });

            axios.post("http://localhost:3000/sendEmail/pay", {
              fullName: nameTenant,
              email: auth.email,
              priceTotal: 8.99,
              title: "Pago de Suscripcion",
            });

            console.log("Suscripcion approved");
            // axios
            //   .get(`http://localhost:3000/client/getuser/${clientId}`)
            //   .then((res) => {
            //     // console.log(res.data);
            //     return res.data;
            //   })
            //   .then((data) => {
            //     console.log(data);
            //     axios.post("http://localhost:3000/sendEmail/pay", {
            //       fullName: data.fullName,
            //       email: data.email,
            //       priceTotal: priceTotal,
            //       title: titlePay,
            //     });
            //   });

            // axios
            //   .patch("http://localhost:3000/property/update/bookings", {
            //     id: idProperty,
            //     bookings,
            //     idClient: clientId,
            //   })
            //   .then((res) => {
            //     console.log("updated book");
            //     // console.log(res);
            //   });

            // axios(`http://localhost:3000/property/${parseInt(idProperty)}`)
            //   .then((res) => {
            //     console.log(res.data.Tenant.id);
            //     return res.data.Tenant.id;
            //   })
            //   .then((prop) => {
            //     axios
            //       .post("http://localhost:3000/createBooking", {
            //         bookingsPropCli: bookings,
            //         booking_client: parseInt(clientId),
            //         booking_property: parseInt(idProperty),
            //         booking_tenant: parseInt(prop),
            //       })
            //       .then((res) => {
            //         console.log("created book");
            //         console.log(res.data);
            //       });

            //     axios
            //       .post("http://localhost:3000/pay/payment", {
            //         description: titlePay,
            //         amount: priceTotal,
            //         status: "Aprobado",
            //         type: metodoPago, // METODO DE PAGO -> QUE TARJETA
            //         client_payment: parseInt(clientId),
            //         tenant_payment: parseInt(prop),
            //         property_payment: parseInt(idProperty),
            //       })
            //       .then((res) => {
            //         console.log("created payment");
            //         console.log(res.data);
            //       });
            //   });

            // axios.post("http://localhost:3000/pay/payment", {
            //   description: titlePay,
            //   amount: priceTotal,
            //   status: "Aprobado",
            //   type: metodoPago, // METODO DE PAGO -> QUE TARJETA
            //   client_payment: parseInt(clientId),
            //   tenant_payment: parseInt(idTenant),
            //   property_payment: parseInt(idProperty),
            // });
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [id]);

  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "60%",
        minHeight: "75vh",
        maxHeight: "auto",
        backgroundColor: "#b3ff3b",
        margin: "20px auto",
        borderRadius: "50px",
        flexWrap: "nowrap",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontSize: "45px",
          fontWeight: "bolder",
          color: "#3e8ed0",
          padding: "10px",
          textAlign: "center",
          width: "60%",
        }}
      >
        Se Registro tu Pago Exitosamente
      </h3>
      <img src={Logo} alt="Logo LookingPlace" />
      <p
        style={{
          fontSize: "16px",
          fontWeight: "normal",
          color: "#3e8ed0",
          padding: "5px",
          textAlign: "center",
          width: "60%",
        }}
      >
        Comienza a disfrutar de mejor posicionamiento en la pagina!!
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "normal",
          color: "#3e8ed0",
          padding: "5px",
          textAlign: "center",
          margin: "0 auto",
          width: "70%",
        }}
      >
        Recueda tu decides las aventuras que decides recorrer! y Nosotros te
        acompañamos!!
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80%",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          className="button is-info"
          style={{ width: "125px" }}
          onClick={(e) => {
            navigate("/home");
          }}
        >
          Home
        </button>
        <button
          className="button is-primary"
          style={{ width: "125px" }}
          onClick={(e) => {
            navigate("/settings");
          }}
        >
          Dashboard
        </button>
      </div>
      <span
        style={{
          marginTop: "5px",
          fontSize: "10px",
          color: "black",
          textAlign: "center",
        }}
      >
        En tu Dashboard puedes ver tus Reservaciones
      </span>
    </div>
  );
}
