import { useState, useEffect } from "react";

function GameBoard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch card data from Pokemon TCG API and set it to state
  })


  return (
    <div className="game-board">
      {/* Game board content goes here */}
    </div>
  );
}

export default GameBoard;