
interface GameOverProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

function GameOver({score, bestScore, onRestart}: GameOverProps) {
    return (
        <div className="game-over">
            <h2>GAME OVER</h2>
            <p>Your Score: {score}</p>
            <p>Best Score: {bestScore}</p>
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}

export default GameOver;
