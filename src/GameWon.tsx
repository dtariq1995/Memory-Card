import { useState, useEffect, useRef } from 'react';
import Typewriter from './Typewriter';
import { playSound, playLoop, stopSound } from './sounds';

const winOptions = ['Continue', 'Quit'] as const;

interface GameWonProps {
  onContinue: () => void;
  onRestart: () => void;
}

function GameWon({ onContinue, onRestart }: GameWonProps) {
  const [selected, setSelected] = useState(0);
  const victoryAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    victoryAudio.current = playLoop('/sfx/victory.mp3');
    return () => stopSound(victoryAudio.current);
  }, []);

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

  function handleQuit() {
    playSound('/sfx/pokemon-a-button.mp3');
    onRestart();
  }

  return (
    <div className="game-start-overlay">
      <div className="framed neutral-border game-start battle-modal">
        <h3 className="modal-header">
          <Typewriter text="You Win!" delay={300} />
        </h3>
        <img src="/celebration.gif" className="modal-gif fade-in-delayed" style={{ animationDelay: '600ms' }} />
        {winOptions.map((option, i) => (
          <button
            key={option}
            className={`modal-button fade-in-delayed${selected === i ? ' modal-button--selected' : ''}`}
            style={{ animationDelay: '900ms' }}
            onClick={i === 0 ? onContinue : handleQuit}
            onMouseEnter={() => setSelected(i)}
          >{option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameWon;
