import React from "react";
import Card from "../Card/Card";
import { useGetCardsQuery, useGetPropertysQuery } from "../../redux/Api";
import NavBar from "../NavBar/NavBar";

function Home(props) {
  // const { data: cards, error } = useGetCardsQuery();
  // PRUEBAS JOEL
  const { data: propertys } = useGetPropertysQuery();
  console.log(propertys);
  // TERMINO PRUEBAS, LO DEMAS LO COMITEE PARA PROBAR REDUX QUERY
  return (
    <h1>Hola</h1>
    // <div className="">
    //   <NavBar className="w-3" />
    //   <div className="md:flex gap-4 shrink-0">
    //     {cards?.length
    //       ? cards.map((card) => (
    //           <ul key={card.id}>
    //             <Card
    //               title={card.title}
    //               image={card.image}
    //               capacity={card.capacity}
    //               rating={card.rating}
    //             />
    //           </ul>
    //         ))
    //       : console.log(error)}
    //   </div>
    // </div>
  );
}

export default Home;
