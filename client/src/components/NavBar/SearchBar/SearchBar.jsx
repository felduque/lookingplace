import { getPropertiesAsync } from "../../../redux/features/getPropertySlice";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import searchIcon from "../../../assets/search-icon-2.png";
import { useState } from "react";


export default function SearchBar() {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const urlbase = "http://localhost:3000/properties";

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
          value={ title }
          />
          <div className="container-search-button">
            <button
            type="submit"
              className='button is-info is-outlined is-small is-rounded '
              >
              <img src={searchIcon} className='search-button'/>
            </button>
          </div>
          </form>
        </div>
        </>
    )
};
