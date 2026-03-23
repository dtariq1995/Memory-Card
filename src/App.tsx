import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

function App() {

  return (
    <>
      <Header />
      <Suspense fallback="Loading..."><GameBoard /></Suspense>
    </>
  )
}

export default App
