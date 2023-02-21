import { getPropertiesAsync } from "../../../redux/features/getPropertySlice";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import searchIcon from "../../../assets/search-icon-2.png";
import filterIcon from "../../../assets/filter-button.png";
import { Component, useState } from "react";
import "./modal.js";
import Filters from "../../Filters/Filters";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const urlbase = "http://localhost:3000/properties";

  const [isActive, setIsActive] = useState(false);



  const handleClickSearchTitle = (e) => {
    e.preventDefault();
    let urlSearch2 = `${urlbase}?title=${title}`;
    console.log("Sí llega la dispatch");
    dispatch(getPropertiesAsync(urlSearch2));
  };

  const handleInputChange = (e) => {

    setTitle(e.target.value);
    if (title === "") {
      dispatch(getPropertiesAsync(urlbase))
    } else {
      let urlSearch2 = `${urlbase}?title=${e.target.value}`;
      dispatch(getPropertiesAsync(urlSearch2));
    }

  }


  return (
    <>
      <div className="search-input-bar">
        <form onSubmit={handleClickSearchTitle}>
          <input
            type="text"
            className="input is-rounded is-small input-search"
            placeholder="Buscar por título... EJ: Casa, apartamento, cabaña, etc."
            name="title"
            onChange={handleInputChange}
            value={title}
          />
          <div className="container-search-button">
            <button
              type="submit"
              className="button is-info is-outlined is-small is-rounded display-button1"
            >
              <img src={searchIcon} className="search-button" />
            </button>
            <button
              className="button is-info is-outlined is-small is-rounded display-button"
              onClick={() => setIsActive(true)}
            >
              <img src={filterIcon} className="search-button" />
            </button>
          </div>
        </form>
        {isActive && (
          <Filters closeModal={() => setIsActive(false)} title={title} />
        )}
      </div>
    </>
  )
};
