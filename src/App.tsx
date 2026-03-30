import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import { Suspense, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <Suspense fallback="Loading Cards..."><GameBoard score={score} setScore={setScore} bestScore={bestScore} setBestScore={setBestScore} /></Suspense>
    </>
  )
}

export default App
