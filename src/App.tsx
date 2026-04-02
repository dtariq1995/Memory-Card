import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import MusicPlayer from './MusicPlayer';
import { Suspense, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem('bestScore');
    return stored ? parseInt(stored) : 0;
  });

  function updateBestScore(score: number) {
    setBestScore(score);
    localStorage.setItem('bestScore', score.toString());
  }

  return (
    <>
      <MusicPlayer />
      <Header score={score} bestScore={bestScore} />
      <Suspense fallback={<div className="loading-container"><img src="/favicon.svg" className="loading-spinner" /><p className="loading-text dots-loader">LOADING CARDS</p></div>}><GameBoard score={score} setScore={setScore} bestScore={bestScore} setBestScore={updateBestScore} /></Suspense>
    </>
  )
}

export default App
