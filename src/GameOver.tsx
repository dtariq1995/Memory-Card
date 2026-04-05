
import { useEffect } from 'react';
import Typewriter from './Typewriter';
import { playSound } from './sounds';

interface GameOverProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

function GameOver({score, bestScore, onRestart}: GameOverProps) {
    useEffect(() => {
        playSound('/sfx/lose.mp3');
    }, []);

    function handleRestart() {
        playSound('/sfx/pokemon-a-button.mp3');
        onRestart();
    }

    return (
        <div className="game-start-overlay">
            <div className="framed neutral-border game-start battle-modal">
                <h3 className="modal-header">
                    <Typewriter text="GAME OVER!" delay={300} />
                </h3>
                <img src="/pika-cry.gif" className="modal-gif fade-in-delayed" style={{ animationDelay: '600ms' }} />
                <p className="modal-text fade-in-delayed" style={{ animationDelay: '700ms' }}>
                    <Typewriter text={`Your final score is: ${score}`} delay={700} />
                </p>
                <p className="modal-text fade-in-delayed" style={{ animationDelay: '1400ms' }}>
                    <img src="/trophy.png" className="modal-icon" />
                    <Typewriter text={`Best Score: ${bestScore}`} delay={1400} />
                </p>
                <button className="modal-button modal-button--selected fade-in-delayed" style={{ animationDelay: '2100ms' }} onClick={handleRestart}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default GameOver;
