import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function Navbar(props) {
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const getCoordinates = (address) => {
    // Use la API de Google Maps para obtener las coordenadas de la dirección
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBsmMXr7DH4yzpQR-MiIuQeSigE2_mn1rg`
    )
      .then((res) => res.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAm-iCiF6TdNp8kz715Ud_sMd8ywWYDmNg"
      libraries={["places"]}
    >
      <div>
        <input type="text" onChange={(e) => getCoordinates(e.target.value)} />
        <GoogleMap
          mapContainerStyle={{
            height: "400px",
            width: "100%",
          }}
          center={{ lat: coordinates.lat, lng: coordinates.lng }}
          zoom={14}
        />
      </div>
    </LoadScript>
  );
}
