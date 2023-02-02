import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import makeAnimated, { Input } from "react-select/animated";

const animatedComponents = makeAnimated();

// Objeto que se renderiza en Select-React
const options = [
  { value: "wifi", label: "wifi" },
  { value: "cocina", label: "cocina" },
  { value: "lavadora", label: "lavadora" },
  { value: "plancha", label: "plancha" },
  { value: "zona de trabajo", label: "zona de trabajo" },
];

export default function FormHostCreate() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    capacity: 1,
    beds: 1,
    baths: 0,
    services: [],
    checkin: "10:00",
    checkout: "10:00",
    smoke: false,
    party: false,
    pets: false,
    country: "",
    state: "",
    city: "",
    img: [],
    images: {},
    price: 0,
    rating: 1,
  });
  // estados relacionados con inputs.images para mostrar lo subido
  const [urlImages, setUrlImages] = useState([]);

  useEffect(() => {
    // seteo el array si no hay images, sino creo el array a mostar
    if (inputs.img.length === 0) setUrlImages([]);
    if (inputs.img.length > 0) {
      const newArrayUrl = [];
      inputs.img.forEach((img) => newArrayUrl.push(URL.createObjectURL(img)));
      setUrlImages(newArrayUrl);
    }
  }, [inputs.img]);

  const handleChange = (e, actionMeta = false) => {
    // Select no tiene name en el evento, usa ActionMeta
    if (actionMeta) {
      if (actionMeta.name === "services") {
        let arrayService = [];
        // console.log(actionMeta.name);
        e.forEach((e) => arrayService.push(e.value));
        console.log(arrayService);
        setInputs({
          ...inputs,
          services: JSON.stringify(arrayService),
        });
      }
      // Diferenciando los campos booleanos
    } else if (
      e.target.name === "smoke" ||
      e.target.name === "party" ||
      e.target.name === "pets"
    ) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.name === "img") {
      // console.log(e.target.files);
      // console.log(Array.isArray(e.target.files));
      setInputs({
        ...inputs,
        [e.target.name]: [...e.target.files],
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  // eliminando image del estado y actualizando el estado; todo esta referenciado al state principal inputs
  const handleClickImg = (e) => {
    const { id } = e.target;
    inputs.img.splice(id, 1);
    const arrayImg = [...inputs.img];
    setInputs({ ...inputs, img: arrayImg });
  };

  const handleSubmit = (e) => {
    axios
      .postForm("http://localhost:3000/property/createproperty", inputs)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log(inputs);
  console.log(inputs.images);

  return (
    <div>
      <h3>Comenzemos la travesia con nuestros viajeros!</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titulo del Alojamiento</label>
          <input
            id="title"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripcion del Alojamiento</label>
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="capacity">Capacidad de personas: </label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            value={inputs.capacity}
            min={1}
            max={20}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="beds">Numero de camas</label>
          <input
            id="beds"
            type="number"
            name="beds"
            value={inputs.beds}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="baths">Numero de baños</label>
          <input
            id="baths"
            type="number"
            name="baths"
            value={inputs.baths}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Servicios con los que cuenta el alojamiento</p>
        </div>
        <Select
          components={animatedComponents}
          name="services"
          isMulti
          defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={options}
        />
        <div>
          <p>Reglas del alojamiento</p>
        </div>
        <div>
          <label htmlFor="checkin">Horario de entrada</label>
          <input
            id="checkin"
            type="time"
            name="checkin"
            value={inputs.checkin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="checkout">Horario de salida</label>
          <input
            id="checkout"
            type="time"
            name="checkout"
            value={inputs.checkout}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="smoke">Permitido fumar?</label>
          <input
            id="smoke"
            type="checkbox"
            name="smoke"
            value={inputs.smoke}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Permitido fiestas?</label>
          <input
            id="party"
            type="checkbox"
            name="party"
            value={inputs.party}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pets">Permitido mascostas?</label>
          <input
            id="pets"
            type="checkbox"
            name="pets"
            value={inputs.pets}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Ubicacion</label>
        </div>
        <div>
          <label htmlFor="">Pais</label>
          <input
            type="text"
            name="country"
            value={inputs.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Ciudad</label>
          <input
            type="text"
            name="state"
            value={inputs.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Distrito</label>
          <input
            type="text"
            name="city"
            value={inputs.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="button">
            <label htmlFor="img">Selecciona las fotos</label>
          </button>
          <input
            style={{ display: "none" }}
            id="img"
            type="file"
            name="img"
            // value={inputs.img}
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          {urlImages.map((img, i) => (
            <div key={i}>
              <img key={i} src={img}></img>
              <button id={i} type="button" onClick={handleClickImg}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="price">Precio por Noche</label>
          <CurrencyInput
            id="price"
            name="price"
            placeholder="Please enter a number"
            prefix="$"
            defaultValue={inputs.price}
            decimalsLimit={2}
            onValueChange={(value, name) =>
              setInputs({
                ...inputs,
                [name]: value,
              })
            }
          />
          ;
        </div>
        <button type="submit">Publicar Alojamiento</button>
      </form>
    </div>
  );
}
