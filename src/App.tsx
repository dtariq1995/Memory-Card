// TODO: Add more songs to the music player 
// TODO: Add animations for card flips, game win, and game over
// TODO: Add sound effects for card clicks,flips, game win, and game over

import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import { Suspense, useState } from 'react';
import GameStart from './GameStart';
import GameWon from './GameWon';
import GameOver from './GameOver';
import MusicPlayer from './MusicPlayer';

function App() {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [cardCount, setCardCount] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'gameover' | 'won'>('playing');
  const [finalScore, setFinalScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem('bestScore');
    return stored ? parseInt(stored) : 0;
  });

  function handleGameOver(score: number) {
    setFinalScore(score);
    setGameState('gameover');
  }

  function handleGameWon() {
    setGameState('won');
  }

  function updateBestScore(score: number) {
    setBestScore(score);
    localStorage.setItem('bestScore', score.toString());
  }

  function handleContinue() {
    setCardCount(prev => prev + 2);
    setGameState('playing');
  }

  function handleRestart() {
    setDifficulty(null);
    setScore(0);
    setGameState('playing');
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

  return (
    <>
      <MusicPlayer />
      {difficulty === null ? (
        <GameStart onSelectDifficulty={handleDifficultySelect} />
      ) : (
        <>
          <Header score={score} bestScore={bestScore} />
          <Suspense fallback={
            <div className="loading-container">
              <img src="/favicon.svg" className="loading-spinner" />
              <p className="loading-text dots-loader">LOADING CARDS</p>
            </div>}>
            <GameBoard
              cardCount={cardCount}
              score={score} setScore={setScore}
              bestScore={bestScore} setBestScore={updateBestScore}
              onGameOver={handleGameOver} onGameWon={handleGameWon}/>
          </Suspense>
          {gameState === 'won' && <GameWon onContinue={handleContinue} onRestart={handleRestart} />}
          {gameState === 'gameover' && <GameOver score={finalScore} bestScore={bestScore} onRestart={handleRestart} />}
        </>
      )}
    </>
  );
}

export default App
