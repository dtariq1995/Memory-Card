import { useState, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
  };
}

function shuffleBoard(arr: Card[]) : Card[] {
  const shuffled = [...arr]; // don't mutate the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function GameBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [clickedIds, setClickedIds] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const { data } = useSuspenseQuery({
    queryKey: ["cards"],
    queryFn: () => fetch("https://api.pokemontcg.io/v2/cards?pageSize=15").then((response) => response.json()),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  useEffect(() => {
    setCards(data.data);
  }, [data]);

  function handleCardClick(card: Card) {
    if (clickedIds.has(card.id)) {
      // Card has already been clicked, reset the game
      setClickedIds(new Set());
      setScore(0);
      setCards(shuffleBoard(cards));
    }
    else {
      // Card has not been clicked, add it to the set and update the score
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      setClickedIds(new Set([...clickedIds, card.id]));
      setCards(shuffleBoard(cards));
    }
  }

  return (

    <div className="game-board">
      {cards.map((card) => (
        <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
          <img src={card.images.small} alt={card.name} />
        </div>
      ))}
    </div>
  );
}

export default GameBoard;