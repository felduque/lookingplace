import "./Loader.css"

export default function Loader() {
    return (
        <div className="loading_container">
            {/* <h1>Loading...</h1> */}
            <svg className="svg">
                <circle className="svg_circle" cx="70" cy="70" r="70"></circle>
            </svg>
        </div>
    )
}


