import { getPropertiesAsync } from "../../../redux/features/getPropertySlice";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import searchIcon from "../../../assets/search-icon-2.png";
import filterIcon from "../../../assets/filter-button.png"
import { Component, useState } from "react";
import "./modal.js"

import Filters from "../../Filters/Filters";

// window.onload = function () {
//   (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
//     const modal = $trigger.dataset.target;
//     const $target = document.getElementById(modal);

//     $trigger.addEventListener("click", () => {
//       openModal($target);
//     });
//   });

//   const modalTrigger = document.querySelector('.js-modal-trigger');
//   const modal = document.querySelector('#modal');

//   modalTrigger.addEventListener('click', function () {
//     modal.classList.add('is-active');
//   });

//   modal.querySelector('.modal-close, .modal-background', ".modal-background", ".modal-close", ".modal-card-head", ".delete", ".modal-card-foot", ".cerrar").addEventListener('click', function () {
//     modal.classList.remove('is-active');
//   });
// }



export default function SearchBar() {



  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const urlbase = "http://localhost:3000/properties";


  const [isActive, setIsActive] = useState(false);



  const handleClickSearchTitle = (e) => {
    e.preventDefault();
    let urlSearch2 = `${urlbase}?title=${title}`;
    console.log('Sí llega la dispatch')
    dispatch(getPropertiesAsync(urlSearch2));
  };
  return (
    <>
      <div className="search-input-bar">
        <form onSubmit={handleClickSearchTitle}>
          <input
            type='text'
            className="input is-rounded is-small input-search"
            placeholder="Buscar por título..."
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }
            }
            value={title}
          />
          <div className="container-search-button">
            <button
              type="submit"
              className='button is-info is-outlined is-small is-rounded display-button1'
            >
              <img src={searchIcon} className='search-button' />
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
          <Filters closeModal={() => setIsActive(false)} />
        )}
      </div>
    </>
  )
};
