import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import { Suspense } from 'react';

function App() {

  return (
    <>
      <Header />
      <Suspense fallback="Loading..."><GameBoard /></Suspense>
    </>
  )
}

export default App
