import React from "react";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import makeAnimated, { Input } from "react-select/animated";
// Google Maps
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

// Fin Google Maps

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
  // Google Maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
    libraries: ["places"],
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    setAddress(value);
    const results = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(results[0]);
    // console.log(lat, lng);
    setCoordinates({
      lat: lat,
      lng: lng,
    });
    setInputs({
      ...inputs,
      lat: lat,
      lng: lng,
    });
    // console.log(coordinates);
  };

  // Fin Google Maps
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    checkIn: "10:00",
    checkOut: "10:00",
    capacity: 1,
    beds: 1,
    baths: 1,
    services: [],
    smoke: false,
    party: false,
    pets: false,
    price: 0,
    image: [],
    rating: 1,
    lat: 0,
    lng: 0,
  });
  // estados relacionados con inputs.images para mostrar lo subido
  const [urlImages, setUrlImages] = useState([]);

  useEffect(() => {
    // seteo el array si no hay images, sino creo el array a mostar
    if (inputs.image.length === 0) setUrlImages([]);
    if (inputs.image.length > 0) {
      const newArrayUrl = [];
      inputs.image.forEach((img) => newArrayUrl.push(URL.createObjectURL(img)));
      setUrlImages(newArrayUrl);
    }
  }, [inputs.image]);

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
    } else if (e.target.name === "image") {
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
    inputs.image.splice(id, 1);
    const arrayImg = [...inputs.image];
    setInputs({ ...inputs, image: arrayImg });
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
  console.log(inputs);

  if (!isLoaded) return <div>...Cargando</div>;
  return (
    <div>
      <h3>Comenzemos la travesia con nuestros viajeros!</h3>
      <form onSubmit={handleSubmit} encType="multiple">
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
            min={1}
            max={20}
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
            min={1}
            max={20}
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
          <label htmlFor="checkIn">Horario de entrada</label>
          <input
            id="checkIn"
            type="time"
            name="checkIn"
            value={inputs.checkIn}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="checkOut">Horario de salida</label>
          <input
            id="checkOut"
            type="time"
            name="checkOut"
            value={inputs.checkOut}
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
        {/* Gooogle Maps */}
        {/* <p>lat:{coordinates.lat}</p>
        <p>long:{coordinates.lng}</p>
        <p>Adress:{address}</p> */}
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Busca tu dirección ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        {/* Fin Gooogle Maps */}

        <div>
          <button type="button">
            <label htmlFor="image">Selecciona las fotos</label>
          </button>
          <input
            style={{ display: "none" }}
            id="image"
            type="file"
            name="image"
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
