import Select from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import axios from "axios";
// Google Maps para Filtrar
import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
// Fin de Google Maps

const animatedComponents = makeAnimated();

const optionsOrder = [
  { value: "", label: "-" },
  { value: "asc", label: "A-Z" },
  { value: "desc", label: "Z-A" },
];
const optionsRating = [
  { value: "", label: "-" },
  { value: "min", label: "Lowest" },
  { value: "max", label: "Higher" },
];
const optionsPrice = [
  { value: "", label: "-" },
  { value: "low", label: "Lowest" },
  { value: "high", label: "Higher" },
];
const optionsCapacity = [
  { value: "", label: "-" },
  { value: "lowest", label: "Lowest" },
  { value: "highest", label: "Higher" },
];

export default function Filters() {
  const urlbase = "http://localhost:3000/properties";

  const dispatch = useDispatch();

  const places = ["places"];
  // Inicializando google maps places
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
    libraries: places,
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
    setFilters({
      ...filters,
      country: data.data.address.country,
      state: data.data.address.state,
    });
  };

  const [filters, setFilters] = useState({
    price: "",
    rating: "",
    capacity: "",
    order: "",
    country: "",
    state: "",
  });

  const handleChange = (e, actionMeta) => {
    console.log(actionMeta.name);
    setFilters({
      ...filters,
      [actionMeta.name]: e.value,
    });
  };

  console.log(filters);

  const handleClickFilter = (e) => {
    let urlfilter = `${urlbase}?order=${filters.order}&price=${filters.price}&rating=${filters.rating}&capacity=${filters.capacity}`;
    console.log(urlfilter);
    dispatch(getPropertiesAsync(urlfilter));
  };

  const handleClickSearch = (e) => {
    let urlSearch = `${urlbase}?country=${filters.country}&state=${filters.state}`;
    dispatch(getPropertiesAsync(urlSearch));
  };

  const handleSetBaseFilter = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  console.log(filters);

  if (!isLoaded) return <h1>Cargando...</h1>;
  return (
    <>
      <span>Ingresa tu destino</span>
      <div>
        {/* Se usara para traer datos de la direccion o estado o pais que se ingrese; haciendo geocodeReverse */}
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
        <button onClick={handleClickSearch}>Buscar</button>

        <span>Filtros por caracteristicas:</span>
        <Select
          placeholder="Select order by title"
          className="field "
          components={animatedComponents}
          name="order"
          // defaultValue={filters.order}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsOrder}
        />
        <Select
          placeholder="Select order by rating"
          className="field "
          components={animatedComponents}
          name="rating"
          //   defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsRating}
        />
        <Select
          placeholder="Select order by price"
          className="field "
          components={animatedComponents}
          name="price"
          //   defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsPrice}
        />
        <Select
          placeholder="Select order by capacity"
          className="field "
          components={animatedComponents}
          name="capacity"
          //   defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsCapacity}
        />
        <button onClick={handleClickFilter}>Aplicar Filtros</button>
        <button onClick={handleSetBaseFilter}>Quitar Filtros</button>
      </div>
    </>
  );
}
