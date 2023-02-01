import React from "react";
import Card from "../Card/Card";
import { useGetCardsQuery } from "../../redux/Api";
import NavBar from "../NavBar/NavBar";

function Home(props) {
  const { data: cards, error } = useGetCardsQuery();
  return (
    <div className="">
      <NavBar className="w-3" />
      <div className="md:flex gap-4 shrink-0">
        {cards?.length
          ? cards.map((card) => (
              <ul key={card.id}>
                <Card
                  title={card.title}
                  image={card.image}
                  capacity={card.capacity}
                  rating={card.rating}
                />
              </ul>
            ))
          : console.log(error)}
      </div>
    </div>
  );
}

export default Home;
