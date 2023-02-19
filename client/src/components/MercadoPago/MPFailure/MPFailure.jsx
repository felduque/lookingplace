import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo-icon.png";

export default function MPFailure() {
  const navigate = useNavigate();
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
        backgroundColor: "#bd627f",
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
        No Se Completo el Pago
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
        Intenta volver a realizar el pago, y revisa tu panel de reservaciones.
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
        Si existe un problema puedes comunicarte con el equipo de LookingPlace,
        y comentarnos lo sucedido. Estamos para ayudarte!
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
            navigate("settings");
          }}
        >
          Reservaciones
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
