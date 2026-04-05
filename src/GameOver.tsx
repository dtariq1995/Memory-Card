
interface GameOverProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

function GameOver({score, bestScore, onRestart}: GameOverProps) {
    return (
        <div className="game-start-overlay">
            <div className="framed neutral-border game-start">
                <h3 className="modal-header">GAME OVER!</h3>
                <img src="/pika-cry.gif" className="modal-gif" />
                <p className="modal-text">Your final score is: <strong>{score}</strong></p>
                <p className="modal-text">Best Score: <img src="/trophy.png" className="modal-icon" /><strong>{bestScore}</strong></p>
                <button className="modal-button modal-button--selected" onClick={onRestart}>
                    Play Again
                </button>
            </div>
        </div>
    );
}

export default GameOver;
