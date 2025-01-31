import { useEffect, useState } from 'react';

function NumbersGame() {
    const [guess, setGuess] = useState<number>(0);
    const [guesses, setGuesses] = useState<number>(2);
    const [userGuesses, setUserGuesses] = useState<number[]>([]);
    const [message, setMessage] = useState<string>("");
    const [answer, setAnswer] = useState(Math.floor(Math.random() * 10));
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        // Debugging
        console.log(`Answer is ${answer}`);
    }, [gameOver]);

    const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(guess===answer){
            setMessage("You got it! Thank you for playing.");
            setGameOver(true);
        }else if(guesses <= 0){
            setMessage(`You lose. The number was ${answer}.`);
            setGameOver(true);
        }else{
            setGuesses(guesses-1);
            setUserGuesses([...userGuesses, guess])
            setMessage("Try again.");
        }
    };

    const resetGame = () => {
        setGuess(0);
        setGuesses(2);
        setUserGuesses([]);
        setMessage("");
        setGameOver(false);
        setAnswer(Math.floor(Math.random() * 10));
    };

    return (
        <>
            <h3>Numbers Game</h3>
            <hr />
            <p className='intro'>I'm thinking of a number between 0 and 10. Can you guess what it is?</p>
            <p>Guesses remaining: {guesses}</p>
            <p>You have guessed:  {userGuesses.join(", ") || 'No guesses yet'}</p>
            <hr />
            <div className='appForm'>
                <form onSubmit={handleGuess}>
                    <input 
                        type="number" 
                        id='userGuess' 
                        value={guess} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = Number(e.target.value);
                            if (value < 0) value = 0;
                            if (value > 10) value = 10;
                            setGuess(value);
                        }}
                        min="0" 
                        max="10" 
                        required 
                        disabled={gameOver}
                    />
                    <input className="submitBtn" type="submit" value="Guess" />
                </form>
            </div>
            <hr />
            <p className='message'>{message}</p>
            {gameOver && <button className='resetButton' onClick={resetGame}>Play Again</button>}
        </>
    );
}

export default NumbersGame;
