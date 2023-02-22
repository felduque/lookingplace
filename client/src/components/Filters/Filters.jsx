import Select from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";
import axios from "axios";
import "./Filters.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import abcfilerIcon from "../../assets/abc-filer-icon.png";
import ratingfilterIcon from "../../assets/rating-filter-icon.png";
import pricefilterIcon from "../../assets/price-filter-icon-2.png";
import capacityfilerIcon from "../../assets/capacity-filter-icon.png";
import clearfilterIcon from "../../assets/clean-filers-icon.png";
import filterIcon from "../../assets/filter-button.png";
import iconMap from "../../assets/icon-map.png";
import bedIcon from "../../assets/beds-icon.png";
import bathIcon from "../../assets/batchroom-icon.png";
import serviceIcon from "../../assets/services.png";
// Google Maps para Filtrar
import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Switch from "react-switch";

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

const optionsPets = [
  { value: "", label: "Selecciona" },
  { value: "true", label: "Si" },
  { value: "false", label: "No" },
];

const optionsServices = [
  { value: "Wi-fi", label: "Wi-Fi" },
  { value: "Cocina", label: "Cocina" },
  { value: "Calefacción", label: "Calefacción" },
  { value: "Aire acondicionado", label: "Aire acondicionado" },
  { value: "Lavadora", label: "Lavadora" },
  { value: "Plancha", label: "Plancha" },
  { value: "Zona de trabajo", label: "Zona de trabajo" },
  { value: "Cochera", label: "Cochera" },
  { value: "Televisor", label: "Televisor" },
  { value: "Secadora", label: "Secadora" },
  { value: "Parilla", label: "Parilla" },
  { value: "Cuna", label: "Cuna" },
];

export default function Filters({ closeModal, title }) {
  const urlbase = `http://localhost:3000/properties?title=${title}`;
  console.log("SOY URL SETEADO CON VALOR DE TITLE", urlbase);

  const dispatch = useDispatch();
  let filterProperties = useSelector((state) => state.properties.allPropertys);
  const places = ["places"];
  // Inicializando google maps places
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
    libraries: places,
  });

  //-----------------------------------------------------------------//

  const [selectedServices, setSelectedServices] = useState([]);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [capacity, setCapacity] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [type, setType] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    rating: "",
    capacity: "",
    order: "",
    country: "",
    state: "",
    title: "",
    smoke: "",
    services: [],
    party: "",
    pets: "",
    baths: "",
    beds: "",
    type: ""
  });

  //-----------------------------------------------------------------//

  const handleServiceChange = (selectedOptions) => {
    setSelectedServices(selectedOptions);
    const services = selectedOptions.map((option) => option.value);
    setFilters({
      ...filters,
      services: services,
    });
    let urlfilter = `${urlbase}&order=${filters.order}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}&rating=${filters.rating}&capacity=${filters.capacity}&country=${filters.country}&state=${filters.state}&services=${filters.services}&pets=${filters.pets}&party=${filters.party}&smoke=${filters.smoke}&beds=${filters.beds}&baths=${filters.beds}&type=${filters.type}`;
    dispatch(getPropertiesAsync(urlfilter));
  };
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

  const handleChange = (e, actionMeta) => {
    console.log(actionMeta.name);
    setFilters({
      ...filters,
      [actionMeta.name]: e.value,
    });
  };

  const handleClickFilter = (e) => {
    let urlfilter = `${urlbase}&order=${filters.order}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}&rating=${filters.rating}&capacity=${filters.capacity}&country=${filters.country}&state=${filters.state}&services=${filters.services}&pets=${filters.pets}&party=${filters.party}&smoke=${filters.smoke}&beds=${filters.beds}&baths=${filters.baths}&type=${filters.type}`;
    dispatch(getPropertiesAsync(urlfilter));
    // closeModal();
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

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    setFilters({
      ...filters,
      price: value,
    });
    // handleClickFilter();
  };

  const handleCapacityButtonClick = (value) => {
    if (capacity === value) {
      setCapacity("");
      setFilters({
        ...filters,
        capacity: "",
      });
    } else {
      setCapacity(value);
      setFilters({
        ...filters,
        capacity: value,
      });
    }
  };
  const handleBedsButtonClick = (value) => {
    if (beds === value) {
      setBeds("");
      setFilters({
        ...filters,
        beds: "",
      });
    } else {
      setBeds(value);
      setFilters({
        ...filters,
        beds: value,
      });
    }
  };
  const handleBathsButtonClick = (value) => {
    if (baths === value) {
      setBaths("");
      setFilters({
        ...filters,
        baths: "",
      });
    } else {
      setBaths(value);
      setFilters({
        ...filters,
        baths: value,
      });
    }
  };

  const handleTypeButtonClick = (value) => {
    if (type === value) {
      setType("");
      setFilters({
        ...filters,
        type: "",
      });
    } else {
      setType(value);
      setFilters({
        ...filters,
        type: value,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    handleClickFilter();

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filters]);


  console.log(filterProperties.result.length);


  if (!isLoaded) return <h1>Cargando...</h1>;
  return (
    <div>
      <div className="container-filters-global">
        <div className="modal is-active ">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card is-rounded my-modal">
            <header className="modal-card-head">
              <h1 className="modal-card-title title">Filtrar</h1>
              <button
                className="modal-close is-size-4"
                onClick={closeModal}
                aria-label="close"
              ></button>
            </header>
            <section className="modal-card-body">
              <>
                {/* Se usara para traer datos de la direccion o estado o pais que se ingrese; haciendo geocodeReverse */}
                <div className="city-container box">
                  <div className="is-flex is-align-items-center">
                    <h1 className="title is-size-4 align-left">
                      Buscar por lugar
                    </h1>
                    <img src={iconMap} className="map-icon" />
                  </div>
                  <div className="select-style">
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

                          {loading && <div>Cargando...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer",
                              }
                              : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                              };
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
                      )}
                    </PlacesAutocomplete>
                  </div>
                </div>
                <div className="type-container box">
                  <div className="is-flex is-align-items-center">
                    <h1 className="title is-size-4 align-left">
                      Tipo de propiedad
                    </h1>
                    <img src={abcfilerIcon} className="rating-icon" />
                  </div>
                  <div>
                    <button
                      className={`capacity-button button is-active mr-2 ${type === "casa" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleTypeButtonClick("casa")}
                    >
                      Casa
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${type === "cabaña" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleTypeButtonClick("cabaña")}
                    >
                      Cabaña
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${type === "apartamento" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleTypeButtonClick("apartamento")}
                    >
                      Apartamento
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${type === "habitacion" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleTypeButtonClick("habitacion")}
                    >
                      Habitación
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${type === "camping" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleTypeButtonClick("camping")}
                    >
                      Camping
                    </button>
                  </div>
                </div>
                <div className="alpha-container box">
                  <div className="is-flex is-align-items-center">
                    <h1 className="title is-size-4 align-left">
                      Ordenar alfabeticamente
                    </h1>
                    <img src={abcfilerIcon} className="rating-icon" />
                  </div>
                  <Select
                    placeholder="Seleccionar..."
                    className="field"
                    components={animatedComponents}
                    name="order"
                    // defaultValue={filters.order}
                    onChange={(e, actionMeta) => handleChange(e, actionMeta)}
                    options={optionsOrder}
                  />
                </div>
                <div className="services-container box">
                  <div className="is-flex is-align-items-center">
                    <h1 className="title is-size-4 align-left">Rating</h1>
                    <img src={ratingfilterIcon} className="rating-icon" />
                  </div>
                  <Select
                    placeholder="Seleccionar..."
                    className="field "
                    components={animatedComponents}
                    name="rating"
                    //   defaultValue={inputs.services}
                    onChange={(e, actionMeta) => handleChange(e, actionMeta)}
                    options={optionsRating}
                  />
                </div>
                <div className="price-container box">
                  <div className="is-flex is-align-items-center">
                    <h1 className="title is-size-4 align-left">Precio</h1>
                    <img src={pricefilterIcon} className="price-icon" />
                  </div>
                  <Range
                    min={0}
                    max={300}
                    defaultValue={[0, 300]}
                    allowCross={false}
                    onChange={handlePriceRangeChange}
                  />
                  <div className="price-range">
                    <div>${priceRange[0]}</div>
                    <div>${priceRange[1]}</div>
                  </div>
                </div>
                <div className="buttons-container box">
                  <div className="is-flex is-align-items-center mt-1 ">
                    <h1 className="title is-size-4 align-left">Capacidad</h1>
                    <img src={capacityfilerIcon} className="capacity-icon " />
                  </div>
                  <div className="">
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "1" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("1")}
                    >
                      1
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "2" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("2")}
                    >
                      2
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "3" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("3")}
                    >
                      3
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "4" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("4")}
                    >
                      4
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "5" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("5")}
                    >
                      5
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "6" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("6")}
                    >
                      6
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "7" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("7")}
                    >
                      7
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${capacity === "20" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleCapacityButtonClick("20")}
                    >
                      +8
                    </button>
                  </div>
                  <div className="is-flex is-align-items-center mt-5">
                    <h1 className="title is-size-4 align-left">
                      Numero de camas
                    </h1>
                    <img src={bedIcon} className="beds-icon" />
                  </div>
                  <div>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "1" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("1")}
                    >
                      1
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "2" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("2")}
                    >
                      2
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "3" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("3")}
                    >
                      3
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "4" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("4")}
                    >
                      4
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "5" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("5")}
                    >
                      5
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "6" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("6")}
                    >
                      6
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "7" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("7")}
                    >
                      7
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${beds === "20" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBedsButtonClick("20")}
                    >
                      +8
                    </button>
                  </div>
                  <div className="is-flex is-align-items-center mt-5">
                    <h1 className="title is-size-4 align-left">
                      Numero de baños
                    </h1>
                    <img src={bathIcon} className="baths-icon" />
                  </div>
                  <div>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "1" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("1")}
                    >
                      1
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "2" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("2")}
                    >
                      2
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "3" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("3")}
                    >
                      3
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "4" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("4")}
                    >
                      4
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "5" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("5")}
                    >
                      5
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "6" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("6")}
                    >
                      6
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "7" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("7")}
                    >
                      7
                    </button>
                    <button
                      className={`capacity-button button is-active mr-2 ${baths === "20" ? "capacity-button-active" : ""
                        }`}
                      onClick={() => handleBathsButtonClick("20")}
                    >
                      +8
                    </button>
                  </div>
                </div>
                <div className="buttons-container box">
                  <div className="is-flex is-align-items-center">
                    <h1 className="title is-size-4 align-left">Servicios</h1>
                    <img src={serviceIcon} className="services-icon" />
                  </div>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={optionsServices}
                    onChange={handleServiceChange}
                    value={selectedServices}
                    placeholder="Seleccionar..."
                  />
                </div>
                <div className="checkboxes-container box">
                  <h1 className="title is-size-4">Reglas de la propiedad</h1>
                  <div className="field">
                    <label className="label" htmlFor="pets">
                      ¿Permitido mascotas?
                      <Switch
                        id="pets"
                        name="pets"
                        checked={filters.pets ? true : ""}
                        onChange={(value) => {
                          const newValue = value ? true : "";
                          setFilters((prevInputs) => ({ ...prevInputs, pets: newValue }));
                        }}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                      />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="party">
                      ¿Permitido fiestas?
                      <Switch
                        id="party"
                        name="party"
                        checked={filters.party ? true : ""}
                        onChange={(value) => {
                          const newValue = value ? true : "";
                          setFilters((prevInputs) => ({ ...prevInputs, party: newValue }));
                        }}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                      />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="smoke">
                      ¿Permitido fumar?
                      <Switch
                        id="smoke"
                        name="smoke"
                        checked={filters.smoke ? true : ""}
                        onChange={(value) => {
                          const newValue = value ? true : "";
                          setFilters((prevInputs) => ({ ...prevInputs, smoke: newValue }));
                        }}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                      />
                    </label>
                  </div>
                </div>
              </>
            </section>
            <footer
              className="modal-card-foot level-right"
              style={{
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <button
                onClick={handleSetBaseFilter}
                className="button is-danger is-outlined clear-filters-button"
              >
                <img
                  src={clearfilterIcon}
                  className="is-small clear-filters-icon mr-2"
                />
                <p>Limpar filtros</p>
              </button>
              <button
                onClick={() => {
                  handleClickFilter();
                  closeModal();
                }}
                disabled={filterProperties.result.length === 0}
                className="button is-success is-outlined"
              >
                <p>{"Mostrar : "}</p>
                <p
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  {filterProperties.result.length > 1
                    ? " " + filterProperties.result.length + " resultados"
                    : " " + filterProperties.result.length + " resultado"}
                </p>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
