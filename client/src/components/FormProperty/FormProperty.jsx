import React from "react";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import makeAnimated, { Input } from "react-select/animated";
import "bulma/css/bulma.min.css";
import "./FormProperty.css";
import { Link } from "react-router-dom";
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
  const libraries = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
    libraries,
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    setAddress(value);
    const results = await geocodeByAddress(value);
    // console.log(results);
    const { lat, lng } = await getLatLng(results[0]);
    // console.log(lat, lng);
    const urlGeoCodeReverse = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`;
    const data = await axios(urlGeoCodeReverse);
    console.log(data.data.address);

    setCoordinates({
      lat: lat,
      lng: lng,
    });
    setInputs({
      ...inputs,
      lat: lat,
      lng: lng,
      country: data.data.address.country,
      state: data.data.address.state,
      region: data.data.address.region,
      city: data.data.address.city ? data.data.address.city : "",
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
    country: "",
    state: "",
    region: "",
    city: "",
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
    e.preventDefault();
    axios
      .postForm("http://localhost:3000/property", inputs)
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
      <div className="container-general">
        <div className="container-property">
          <div className="container-form-property">
            <div className="title is-2">Crea un Place para los viajeros</div>
            <form onSubmit={handleSubmit} encType="multiple" className="box">
              <div className="field">
                <label className="label" htmlFor="title">
                  Título del Alojamiento
                </label>
                <input
                  className="input"
                  id="title"
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="description">
                  Descripción del alojamiento (Place)
                </label>
                <textarea
                  className="textarea"
                  id="description"
                  name="description"
                  value={inputs.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="field">
                <label className="label" htmlFor="capacity">
                  Capacidad de personas:{" "}
                </label>
                <input
                  className="input"
                  id="capacity"
                  type="number"
                  name="capacity"
                  value={inputs.capacity}
                  min={1}
                  max={20}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="beds">
                  Número de camas
                </label>
                <input
                  className="input"
                  id="beds"
                  type="number"
                  name="beds"
                  min={1}
                  max={20}
                  value={inputs.beds}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="baths">
                  Número de baños
                </label>
                <input
                  className="input"
                  id="baths"
                  type="number"
                  name="baths"
                  min={1}
                  max={20}
                  value={inputs.baths}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <p className="label">
                  Servicios con los que cuenta el alojamiento
                </p>
              </div>
              <Select
                className="field "
                components={animatedComponents}
                name="services"
                isMulti
                defaultValue={inputs.services}
                onChange={(e, actionMeta) => handleChange(e, actionMeta)}
                options={options}
              />
              <div className="field">
                <p className="title is-4">Reglas del alojamiento</p>
              </div>
              <div className="field">
                <label className="label" htmlFor="checkIn">
                  Horario de entrada
                </label>
                <input
                  id="checkIn"
                  type="time"
                  name="checkIn"
                  value={inputs.checkIn}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="checkOut">
                  Horario de salida
                </label>
                <input
                  id="checkOut"
                  type="time"
                  name="checkOut"
                  value={inputs.checkOut}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="smoke">
                  ¿Permitido fumar?&nbsp;
                  <input
                    id="smoke"
                    type="checkbox"
                    className="checkbox"
                    name="smoke"
                    value={inputs.smoke}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor="">
                  ¿Permitido fiestas?&nbsp;
                  <input
                    id="party"
                    type="checkbox"
                    className="checkbox"
                    name="party"
                    value={inputs.party}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor="pets">
                  ¿Permitido mascostas?&nbsp;
                  <input
                    id="pets"
                    type="checkbox"
                    className="checkbox"
                    name="pets"
                    value={inputs.pets}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor="">
                  Ubicación
                </label>
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
                        className: "input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Cargando...</div>}
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
              <div className="field">
                <label className="label">Imágenes del lugar</label>
                <button className="button is-success" type="button">
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
                    <img
                      key={i}
                      src={img}
                      className="is-multiline loaded-images"
                    ></img>
                    <button id={i} type="button" onClick={handleClickImg}>
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="field">
                <label className="label" htmlFor="price">
                  Precio por Noche
                </label>
                <CurrencyInput
                  className="input"
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
              </div>
              <button className="button is-link is-rounded" type="submit">
                Publicar Alojamiento
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
