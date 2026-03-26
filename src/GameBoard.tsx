import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

function GameBoard() {
  const [cards, setCards] = useState([]);

  const { data } = useSuspenseQuery({
    queryKey: ["cards"],
    queryFn: () => fetch("https://api.pokemontcg.io/v2/cards?pageSize=15").then((response) => response.json()),
  });

  


  return (

    <div className="game-board">
      {data.data.map((card) => (
        <div key={card.id} className="card">
          <img src={card.images.small} alt={card.name} />
          <h3>{card.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default GameBoard;