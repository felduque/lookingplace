import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { es } from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";
import axios from "axios";

export default function Calendar({ propId, bookings, price }) {
  //  const dateDiary = useSelector -----> va al store

  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: "selection1",
    },
    // selection2: {
    //   startDate: addDays(new Date(), 0),
    //   endDate: addDays(new Date(), 0),
    //   key: 'selection2'
    // },
  });

  const [selected, setSelected] = useState({
    startDate: addDays(new Date(), 0),
    endDate: addDays(new Date(), 0),
    key: "selection_selected",
  });

  async function select() {
    const dataBooking = getDatesInRange(
      state.selection1.startDate,
      state.selection1.endDate
    );
    console.log(dataBooking);
    const bookingProperty = await axios.patch(
      "https://looking.fly.dev/property/update/bookings",
      { id: propId, bookings: dataBooking }
    );
    console.log(bookingProperty);
    // aca vamos a despachar una funcion que me va a guardar los datos de la agenda de este cliente en de tal propiedad
    setSelected({
      startDate: state.selection1.startDate,
      endDate: state.selection1.endDate,
      key: "selection_selected",
    });
  }

  function reset() {
    //aca voy a despachar una action que me va a borrar lo agendado del cliente en relacion a esta propiedad
    setState({
      selection1: {
        startDate: addDays(new Date(), 0),
        endDate: addDays(new Date(), 0),
        key: "selection1",
      },
    });

    setSelected({
      startDate: addDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: "selection_selected",
    });

    setNoches(0);
  }

  const getDatesInRange = (checkIn, checkOut) => {
    var start = new Date(checkIn);
    var end = new Date(checkOut);
    var nights = new Date(start);
    // console.log("nig:", nights.getDate());
    const dates = [];
    if (start.toDateString() === end.toDateString()) {
      dates.push(start.toDateString());
      return dates;
    } else {
      while (nights < end) {
        dates.push(nights.toDateString());
        nights.setDate(nights.getDate() + 1);
      }
      return dates;
    }
  };

  //   console.log(
  //     "funciton:",
  //     getDatesInRange(state.selection1.startDate, state.selection1.endDate)
  //   );
  //   console.log(" startDate:", state.selection1.startDate);
  //   console.log("endDate:", state.selection1.endDate);

  //   const arr2 = ["Mon Feb 13 2023", "Tue Feb 14 2023", "Wed Feb 15 2023"];
  const desab = bookings?.map((d) => new Date(d).toDateString());
  //   console.log("desab:", desab);
  const arr3 = desab?.flat().map((d) => new Date(d));
  //   console.log("arr3:", arr3);
  // console.log("arr3:", arr3)

  const [noches, setNoches] = useState(0);
  function itemSelection(item) {
    setState({
      ...state,
      ...item,
    });

    setNoches(
      getDatesInRange(state.selection1.startDate, state.selection1.endDate)
        .length
    );
    console.log(noches);
    // console.log("item is:", item);
  }

  return (
    <div>
      <div>
        <DateRange
          preventSnapRefocus={true}
          showDateDisplay={false}
          showMonthAndYearPickers={true}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={itemSelection}
          ranges={[state.selection1, selected]}
          locale={es}
          disabledDates={arr3}
        />
      </div>
      <div>
        <p className="subtitle has-text-centered">
          Precio por noche : USD$:{price}
        </p>
      </div>
      <div>
        <p className="subtitle">Resumen de Reserva</p>
        {noches === 0 ? (
          <div>
            <span>Noches a hospedarse : 0 </span>
          </div>
        ) : (
          <div>
            <span>Noches a hospedarse : {noches} </span>
          </div>
        )}

        <span>Precio total a pagar : USD$:{noches * price} </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "20px 0",
        }}
      >
        <button
          className="button is-primary is-outlined is-active"
          onClick={select}
        >
          Reservar
        </button>

        <button className="button is-warning" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
