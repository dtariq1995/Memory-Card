import ScoreDisplay from "./ScoreDisplay";

function Header() {
    return (
        <header>
            <h1>PokéMemory Card Game</h1>
            <p>Get points by clicking on a card, but don't click on the same card twice!</p>
            <ScoreDisplay />
        </header>
    );
}

export default Header;