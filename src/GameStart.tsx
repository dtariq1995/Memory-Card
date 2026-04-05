
import { useState, useEffect } from 'react';
import Typewriter from './Typewriter';

const difficulties = ['easy', 'medium', 'hard'] as const;

interface GameStartProps {
  onSelectDifficulty: (level: 'easy' | 'medium' | 'hard') => void;
}

function GameStart({ onSelectDifficulty }: GameStartProps) {
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
      <div className="framed neutral-border game-start game-start-enter">
        <img src="/intro.gif" className="intro-gif" />
        <h3 className="modal-header">
          <Typewriter text="Select a Difficulty" delay={450} />
        </h3>
        <div className="modal-button-list fade-in-delayed" style={{ animationDelay: '1200ms' }}>
          {difficulties.map((level, i) => (
            <button
              key={level}
              className={`modal-button${selected === i ? ' modal-button--selected' : ''}`}
              onClick={() => onSelectDifficulty(level)}
              onMouseEnter={() => setSelected(i)}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameStart;
