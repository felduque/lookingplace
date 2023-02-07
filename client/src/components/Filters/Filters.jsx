import Select from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPropertiesAsync } from "../../redux/features/getPropertySlice";

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

  const [filters, setFilters] = useState({
    price: "",
    rating: "",
    capacity: "",
    order: "",
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

  const handleSetBaseFilter = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  return (
    <div>
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
  );
}
