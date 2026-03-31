import ScoreDisplay from "./ScoreDisplay";

interface HeaderProps {
  score: number;
  bestScore: number;
}

function Header({ score, bestScore }: HeaderProps) {
    return (
        <header>
            <h1><img src="/pokeball.png" alt="pokeball" className="title-icon" /><span className="poke">Poké</span><span className="rest">Memory</span></h1>
            <ScoreDisplay score={score} bestScore={bestScore} />
        </header>
    );
}

export default Header;