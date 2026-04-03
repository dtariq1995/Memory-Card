
import { useState, useEffect } from 'react';

const difficulties = ['easy', 'medium', 'hard'] as const;

function GameStart({ onSelectDifficulty }: { onSelectDifficulty: (level: 'easy' | 'medium' | 'hard') => void }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        setSelected(prev => (prev + 1) % difficulties.length);
      } else if (e.key === 'ArrowUp') {
        setSelected(prev => (prev - 1 + difficulties.length) % difficulties.length);
      } else if (e.key === 'Enter') {
        onSelectDifficulty(difficulties[selected]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, onSelectDifficulty]);

  return (
    <div className="game-start-overlay">
      <div className="framed neutral-border game-start">
          <h3 className="modal-header">Select a Difficulty</h3>
          {difficulties.map((level, i) => (
              <button
                  key={level}
                  className={`difficulty${selected === i ? ' difficulty--selected' : ''}`}
                  onClick={() => onSelectDifficulty(level)}
                  onMouseEnter={() => setSelected(i)}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
          ))}
      </div>
    </div>
  );
}

export default GameStart;
