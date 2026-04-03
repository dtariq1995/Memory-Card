
function GameStart({ onSelectDifficulty }: { onSelectDifficulty: (level: 'easy' | 'medium' | 'hard') => void }) {
  return (
    <div className="game-start">
        <button className="difficulty" onClick={() => onSelectDifficulty('easy')}>Easy</button>
        <button className="difficulty" onClick={() => onSelectDifficulty('medium')}>Medium</button>
        <button className="difficulty" onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </div>
  );
}

export default GameStart;