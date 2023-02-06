import axios from "axios";

export default function Card(prod) {
  let pagoObj = {
    title: "SUSBCRIPCION DE PRUEBA",
    description: "SUBSCRIPCION DE PRUEBA",
    url: "URL DE PRUEBA",
    category: "SUBSCRIPCION DE PRUEBA",
    price: 10, //PRECIO DE PRUEBA
    quantity: 1, //CANTIDAD DE PRUEBA
  };

  return (
    <div>
      <button
        style={{
          color: "white",
          backgroundColor: "black",
          padding: "10px",
          borderRadius: "20px",
        }}
        onClick={(e) => {
          axios
            .post("http://localhost:3000/pago", pagoObj)
            .then(
              (res) =>
                (window.location.href = res.data.response.sandbox_init_point)
            );
        }}
      >
        Comprar
      </button>
    </div>
  );
}
