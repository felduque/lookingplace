import { useSearchParams } from "react-router-dom";
import "./ResumePay.css";
import MPButton from "../MercadoPago/MercadoPago";

export default function ResumePay() {
  const [params, setParams] = useSearchParams();

  const id = params.get("id");
  const title = params.get("title");
  const description = params.get("description");
  const nigths = params.get("nigths");
  const price = params.get("price");
  const total = params.get("total");
  const bookings = params.get("bookings");
  const url = params.get("url");

  console.log(id, title, description, nigths, price, total, bookings, url);

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
          <MPButton
            id={id}
            title={title}
            description={bookings}
            price={total}
            picture_url={url}
          />
        </div>
      </div>
    </>
  );
}
