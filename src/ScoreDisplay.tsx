function ScoreDisplay({ score, bestScore }: { score: number; bestScore: number }) {
    return (
    <div className="score-display">
        <h2>Score: {score}</h2>
        <h2>High Score: <img src="/trophy.png" alt="trophy" className="trophy-icon" />{bestScore}</h2>
    </div>);
}

export default ScoreDisplay;