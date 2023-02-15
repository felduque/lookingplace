import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MPSuccess() {
  const [payParams, setPayParams] = useSearchParams();
  const id = payParams.get("collection_id");
  const [data, setData] = useState({});

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer APP_USR-1508461661866484-021319-e57a84d03a4c8f08bfb6c9fbe7584dad-1309803015`,
      },
    };
    axios
      .get(`https://api.mercadopago.com/v1/payments/${id}`, config)
      .then(function (response) {
        // handle success
        setData(response.data);
        if (response.data) {
          const idProperty = response.data.additional_info?.items[0].id;
          const bookings = JSON.parse(
            response.data.additional_info?.items[0].description
          );

          if (response.data.status === "approved") {
            axios
              .patch("http://localhost:3000/property/update/bookings", {
                id: idProperty,
                bookings,
              })
              .then((res) => {
                console.log("updated book");
                console.log(res);
              });
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [id]);

  console.log(data);

  //   const idProperty = data.additional_info.items[0].id;
  //   console.log(idProperty);
  //   const bookings = JSON.parse(data.additional_info.items[0].description);
  //   console.log(bookings);

  //   const { status } = data;
  //   console.log(status);
  //   if (status === "approved") {
  //     axios
  //       .patch("http://localhost:3000/property/update/bookings", {
  //         id: idProperty,
  //         bookings,
  //       })
  //       .then((res) => {
  //         console.log("updated book");
  //         console.log(res);
  //       });
  //   }

  //   const bookingProperty = await axios.patch(
  //     "http://localhost:3000/property/update/bookings",
  //     { id: propId, bookings: bookings }
  //   );
  //   console.log(bookingProperty);

  return (
    <div>
      <h1>Soy Pago Exitoso</h1>
      <h1>{id}</h1>
    </div>
  );
}
