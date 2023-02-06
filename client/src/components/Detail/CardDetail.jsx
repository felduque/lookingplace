import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyByIdAsync } from "../../redux/features/getPropertySlice";
import { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

export default function CardDetail() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDrViDX9rfRwIuHnmg19Ss7qT9UgIwD_Ok",
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyByIdAsync(id));
  }, [id, dispatch]);

  const detail = useSelector((state) => state.properties.propertyDetail);
  console.log(detail);

  const {
    title,
    description,
    checkIn,
    checkOut,
    capacity,
    beds,
    baths,
    services,
    smoke,
    party,
    pets,
    price,
    image,
    rating,
    lat,
    lng,
  } = detail;

  console.log(typeof lat);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Link to={"/home"}>
        <button className="button is-primary is-outlined">Home</button>
      </Link>
      <h1 className="title box">{title}</h1>
      <img src="https://picsum.photos/200/250" alt="" />
      <p className="box">{description}</p>
      <p>{checkIn}</p>
      <p>{checkOut}</p>
      <p>{capacity}</p>
      <p>{beds}</p>
      <p>{baths}</p>
      <p>{services}</p>
      <p>{smoke}</p>
      <p>{party}</p>
      <p>{pets}</p>
      <p>{price}</p>
      <p>{rating}</p>
      <p>{lat}</p>
      <p>{lng}</p>
      <GoogleMap
        zoom={10}
        center={{ lat, lng }}
        mapContainerStyle={{
          height: "300px",
          width: "800px",
        }}
      >
        {lat && lng && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    </div>
  );
}
