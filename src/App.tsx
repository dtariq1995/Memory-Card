import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import { Suspense, useState } from 'react';
import GameStart from './GameStart';

function App() {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [cardCount, setCardCount] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'gameover' | 'won'>('playing');
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem('bestScore');
    return stored ? parseInt(stored) : 0;
  });

  function updateBestScore(score: number) {
    setBestScore(score);
    localStorage.setItem('bestScore', score.toString());
  }

  function handleDifficultySelect(level: 'easy' | 'medium' | 'hard') {
    setDifficulty(level);
    switch (level) {
      case 'easy':
        setCardCount(5);
        break;
      case 'medium':
        setCardCount(10);
        break;
      case 'hard':
        setCardCount(18);
        break;
    }
    setGameState('playing');
    setScore(0);
  }

  if (difficulty === null) {
    return (
      <GameStart onSelectDifficulty={handleDifficultySelect} />
    );
  }
  else {
    return (
      <>
        <Header score={score} bestScore={bestScore} />
        <Suspense fallback={<div className="loading-container"><img src="/favicon.svg" className="loading-spinner" /><p className="loading-text dots-loader">LOADING CARDS</p></div>}><GameBoard cardCount={cardCount} score={score} setScore={setScore} bestScore={bestScore} setBestScore={updateBestScore} /></Suspense>
      </>
    );
  }
}

export default App
