import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { es } from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Calendar({
  propId,
  bookings,
  price,
  title,
  description,
  url,
}) {
  //  const dateDiary = useSelector -----> va al store
  const navigate = useNavigate();

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
    // RESTRINGIENDO FECHAS DE CALENDARIO, SE REALIZARA UNA VEZ REALIZADO EL PAGO
    // const bookingProperty = await axios.patch(
    //   "http://localhost:3000/property/update/bookings",
    //   { id: propId, bookings: dataBooking }
    // );
    // console.log(bookingProperty);
    // RESTRINGIENDO FECHAS DE CALENDARIO
    // aca vamos a despachar una funcion que me va a guardar los datos de la agenda de este cliente en de tal propiedad
    setSelected({
      startDate: state.selection1.startDate,
      endDate: state.selection1.endDate,
      key: "selection_selected",
    });

    const nochesNum =
      state.selection1.endDate.getDate() - state.selection1.startDate.getDate();
    const total = nochesNum * price;

    navigate(
      `/resumePay?id=${propId}&title=${title}&bookings=${JSON.stringify(
        dataBooking
      )}&description=${description}&price=${price}&nigths=${nochesNum}&total=${total}&url=${JSON.stringify(
        url
      )}`
    );
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

  console.log(
    getDatesInRange(state.selection1.startDate, state.selection1.endDate)
  );
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

  function itemSelection(item) {
    setState({
      ...state,
      ...item,
    });

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
        <p className="">
          Precio por noche : <strong> USD$:{price}</strong>{" "}
        </p>
      </div>
      <div>
        <p className="subTitleData">Resumen de la reserva</p>

        <div>
          <p>
            Noches a hospedarse :
            {state.selection1.endDate.getDate() -
              state.selection1.startDate.getDate()}
          </p>
        </div>

        <p>
          Precio total a pagar : USD$:
          {(state.selection1.endDate.getDate() -
            state.selection1.startDate.getDate()) *
            price}{" "}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          margin: "20px 0",
        }}
      >
        <button className="button is-large is-warning" onClick={reset}>
          Reset
        </button>
        <button
          className="button is-large is-primary is-outlined is-active"
          onClick={select}
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
