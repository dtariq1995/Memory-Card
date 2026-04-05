import { useState, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Tilt from "react-parallax-tilt";
import { playSound } from "./sounds";

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
  };
}

interface GameBoardProps {
  score: number;
  setScore: (score: number) => void;
  bestScore: number;
  setBestScore: (bestScore: number) => void;
  cardCount: number;
  onGameOver: (finalScore: number) => void;
  onGameWon: () => void;
}

const FLIP_DURATION = 400;

function shuffleBoard(arr: Card[]) : Card[] {
  const shuffled = [...arr]; // don't mutate the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function GameBoard({score, setScore, bestScore, setBestScore, cardCount, onGameOver, onGameWon}: GameBoardProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [clickedIds, setClickedIds] = useState<Set<string>>(new Set());
  const [shuffleCount, setShuffleCount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ["cards"],
    queryFn: () => fetch("https://api.pokemontcg.io/v2/cards?q=set.id:base4 nationalPokedexNumbers:[1 TO 151]&pageSize=102").then((response) => response.json()),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  useEffect(() => {
    setCards(shuffleBoard(data.data).slice(0, cardCount)); // Grab random cards from the fetched data
  }, [data, cardCount]);

  function handleCardClick(card: Card) {
    if (isFlipping) return;

    if (clickedIds.has(card.id)) {
      // Card has already been clicked — flip out, then trigger game over
      playSound('/sfx/flip.mp3');
      setIsFlipping(true);
      setTimeout(() => {
        onGameOver(score);
        setClickedIds(new Set());
        setScore(0);
        setCards(shuffleBoard(cards));
        setShuffleCount(c => c + 1);
        setIsFlipping(false);
      }, FLIP_DURATION);
    }
    else if (clickedIds.size + 1 === cardCount) {
      // Player has won — no flip on the last card
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      setClickedIds(new Set());
      onGameWon();
    }
    else {
      // Valid click — flip out, shuffle, flip back in
      playSound('/sfx/flip.mp3');
      setIsFlipping(true);
      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        setClickedIds(new Set([...clickedIds, card.id]));
        setCards(shuffleBoard(cards));
        setShuffleCount(c => c + 1);
        setIsFlipping(false);
      }, FLIP_DURATION);
    }
  }

  return (
    <div className={`game-board${isFlipping ? ' game-board--flipping' : ''}`}>
      {cards.map((card) => (
        <Tilt tiltReverse glareEnable glareMaxOpacity={0.4} glarePosition="all" key={`${card.id}-${shuffleCount}`}>
          <div className="card" onClick={() => handleCardClick(card)}>
            <div className={`card-inner${isFlipping ? ' flipping' : ''}`}>
              <div className="card-front">
                <img src={card.images.small} alt={card.name} />
              </div>
              <div className="card-back">
                <img src="/card-back.png" alt="card back" />
              </div>
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  );
}

export default GameBoard;
