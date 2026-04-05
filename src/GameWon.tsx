import { useState, useEffect } from 'react';

const winOptions = ['Continue', 'Quit'] as const;

interface GameWonProps {
  onContinue: () => void;
  onRestart: () => void;
}

function GameWon({ onContinue, onRestart }: GameWonProps) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        setSelected(prev => (prev + 1) % winOptions.length);
      } else if (e.key === 'ArrowUp') {
        setSelected(prev => (prev - 1 + winOptions.length) % winOptions.length);
      } else if (e.key === 'Enter') {
        if (selected === 0) onContinue();
        else onRestart();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, onContinue, onRestart]);

  return (
    <div className="game-start-overlay">
      <div className="framed neutral-border game-start">
        <h3 className="modal-header">You Win!</h3>
        <img src="/celebration.gif" className="modal-gif" />
        {winOptions.map((option, i) => (
          <button
            key={option}
            className={`modal-button${selected === i ? ' modal-button--selected' : ''}`}
            onClick={i === 0 ? onContinue : onRestart}
            onMouseEnter={() => setSelected(i)}
          >{option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameWon;

