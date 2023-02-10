export default function SearchBat() {
    return (
    <div className="search-input-bar">
          <input type='text' className="input is-rounded is-small input-search" placeholder="Buscar por título..."/>
          <div className="container-search-button">
            <div className='button is-info is-outlined is-small is-rounded '>
              <img src={searchIcon} className='search-button'/>
            </div>
          </div>
        </div>
    )
};
