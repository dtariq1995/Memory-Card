import ScoreDisplay from "./ScoreDisplay";

interface HeaderProps {
  score: number;
  bestScore: number;
}

function Header({ score, bestScore }: HeaderProps) {
    return (
        <header>
            <h1>PokéMemory Card Game</h1>
            <p>Get points by clicking on a card, but don't click on the same card twice!</p>
            <ScoreDisplay score={score} bestScore={bestScore} />
        </header>
    );
}

export default Header;