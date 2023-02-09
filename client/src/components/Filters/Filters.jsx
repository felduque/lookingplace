import Select from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import axios from "axios";
import "./Filters.css";
import abcfilerIcon from "../../assets/abc-filer-icon.png";
import ratingfilterIcon from "../../assets/rating-filter-icon.png";
import pricefilterIcon from "../../assets/price-filter-icon-2.png";
import capacityfilerIcon from "../../assets/capacity-filter-icon.png";
import clearfilterIcon from "../../assets/clean-filers-icon.png";
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
  { value: "min", label: "Peor puntuados" },
  { value: "max", label: "Mejor puntuados" },
];
const optionsPrice = [
  { value: "", label: "-" },
  { value: "low", label: "Menor precio" },
  { value: "high", label: "Mayor precio" },
];
const optionsCapacity = [
  { value: "", label: "-" },
  { value: "lowest", label: "Baja" },
  { value: "highest", label: "Alta" },
];

export default function Filters() {
  const urlbase = "https://looking.fly.dev/properties";

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
    title: "",
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
    let urlfilter = `${urlbase}?order=${filters.order}&price=${filters.price}&rating=${filters.rating}&capacity=${filters.capacity}&country=${filters.country}&state=${filters.state}&title=${filters.title}`;
    console.log(urlfilter);
    dispatch(getPropertiesAsync(urlfilter));
  };

  const handleClickSearch = (e) => {
    let urlSearch = `${urlbase}?country=${filters.country}&state=${filters.state}`;
    dispatch(getPropertiesAsync(urlSearch));
  };

  const handleClickSearchTitle = (e) => {
    let urlSearch2 = `${urlbase}?title=${filters.title}`;
    dispatch(getPropertiesAsync(urlSearch2));
  };

  const handleSetBaseFilter = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  console.log(filters);

  if (!isLoaded) return <h1>Cargando...</h1>;
  return (
    <>
      <span>Búsqueda titulo</span>
      <input
        className="input"
        type="text"
        name="title"
        onChange={(e) => {
          setFilters({
            ...filters,
            title: e.target.value,
          });
        }}
        value={filters.title}
      />
      <button
        onClick={handleClickSearchTitle}
        className="button is-info is-outlined center-button-search"
      >
        Buscar
      </button>
      <span>Búsqueda por ciudad o país</span>
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
                  placeholder: "Busca tu dirección...",
                  className: "input is-link",
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
        <button
          onClick={handleClickSearch}
          className="button is-info is-outlined center-button-search"
        >
          Buscar
        </button>
        <p>
          <span>Filtros por caracteristicas:</span>
        </p>
        <img src={abcfilerIcon} className="filter-icon-more-small" />
        <span> Ciudad alfabeticamente</span>
        <Select
          placeholder="Seleccionar..."
          className="field"
          components={animatedComponents}
          name="order"
          // defaultValue={filters.order}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsOrder}
        />
        <img src={ratingfilterIcon} className="filter-icon-more-small" />{" "}
        <span> Ordenar por calificación</span>
        <Select
          placeholder="Seleccionar..."
          className="field "
          components={animatedComponents}
          name="rating"
          //   defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsRating}
        />
        <img src={pricefilterIcon} className="filter-icon" />
        <span> Ordenar por precio</span>
        <Select
          placeholder="Seleccionar..."
          className="field "
          components={animatedComponents}
          name="price"
          //   defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsPrice}
        />
        <img src={capacityfilerIcon} className="filter-icon" />
        <span> Ordenar por capacidad</span>
        <Select
          placeholder="Seleccionar..."
          className="field "
          components={animatedComponents}
          name="capacity"
          //   defaultValue={inputs.services}
          onChange={(e, actionMeta) => handleChange(e, actionMeta)}
          options={optionsCapacity}
        />
        <button
          onClick={handleClickFilter}
          className="button is-success is-outlined"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleSetBaseFilter}
          className="button is-danger is-outlined clear-filters-button"
        >
          <img src={clearfilterIcon} className="clear-filters-icon" />
        </button>
      </div>
    </>
  );
}
