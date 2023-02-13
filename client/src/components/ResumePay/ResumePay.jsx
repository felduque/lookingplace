import { useSearchParams } from "react-router-dom";
import "./ResumePay.css";
import MPButton from "../MercadoPago/MercadoPago";

export default function ResumePay() {
  const [params, setParams] = useSearchParams();

  const title = params.get("title");
  const description = params.get("description");
  const nigths = params.get("nigths");
  const price = params.get("price");
  const total = params.get("total");

  if (!MPButton) return <div>...Cargando</div>;
  return (
    <>
      <p className="h1ResumenPay">Resumen de Pago</p>
      <div className="containerResumenPay">
        <div className="imgContainerResumenPay">
          <img
            className="imgResumenPay"
            src="https://i.pinimg.com/originals/22/19/5e/22195e3842848e04f28b88819c2a350d.gif"
            alt=""
          />
        </div>
        <div className="textResumePay">
          <h3 className="hResumePay">{title}</h3>
          <p className="pResumePay">{description}</p>
          <span className="pResumePay">
            Te alojaras por <strong>{nigths} </strong>
            noches, con un precio por noche de : <strong>USD$ {price}</strong>
          </span>
          <p className="pResumePay">
            {" "}
            <strong> Pago Total : USD$ {total}</strong>
          </p>
          <MPButton title={title} description={description} price={total} />
        </div>
      </div>
    </>
  );
}
