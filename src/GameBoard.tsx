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
      {/* Game board content goes here */}
    </div>
  );
}

export default GameBoard;