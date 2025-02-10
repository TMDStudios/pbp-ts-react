import {useState, useEffect} from 'react';

function GuessThePhrase() {
    const [phrasePool] = useState(["this is the secret phrase", "she sells seashells", "this is the way", "fun with flags", "may the force be with you"]);
    const [userInput, setUserInput] = useState<string>('');
    const [guessLetter, setGuessLetter] = useState(true);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [userAnswerMap, setUserAnswerMap] = useState<Map<number, string>>(new Map());
    const [count, setCount] = useState<number>(0);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [gameOver, setGameOver] = useState<boolean>(false);
    
    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        let tempUserAnswer = '';
        userAnswerMap.forEach((value, key) => { tempUserAnswer += value; });
        setUserAnswer(tempUserAnswer);

        if(tempUserAnswer.length>0 && tempUserAnswer===answer){
            setMessage("You got it!");
            setGameOver(true);
            return;
        }
        if(count>=10){
            setMessage(`Game over! The answer was: ${answer}`);
            setGameOver(true);
        }
    }, [userAnswerMap, answer, count]);

    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(guessLetter){
            if(userInput.length>1){
                setMessage("You can only guess one letter at a time");
                return;
            }else if(!/^[a-zA-Z]+$/.test(userInput)){
                setMessage("You can only guess letters");
                return;
            }else{
                setUserAnswer('');
                setCount(count+1);
                setGuessLetter(false);
                setGuessedLetters(prev => [...prev, userInput.toLowerCase()]);

                setUserAnswerMap(prevMap => {
                    const newMap = new Map(prevMap); // Clone only when needed
                    let updated = false;
                    for(let i = 0; i < answer.length; i++){
                        if(answer[i] === userInput.toLowerCase() && !newMap.has(i)){
                            newMap.set(i, userInput.toLowerCase());
                            updated = true;
                        }
                    }

                    return updated ? newMap : prevMap; // Avoid unnecessary state update
                });
            }
            setMessage("Can you guess the full phrase?");
        }else{
            if(userInput.trim().toLowerCase()===answer){
                setMessage("You got it!");
                setGameOver(true);
                return;
            }
            setGuessLetter(true);
            setMessage("Guess another letter");
        }
        setUserInput('');
    };

    const resetGame = () => {
        setGuessLetter(true);
        setCount(0);
        setGuessedLetters([]);
        setGameOver(false);
        setUserInput('');
        setMessage("Guess a letter");
        const currentAnswer = phrasePool[Math.floor(Math.random() * phrasePool.length)];
        let tempUserAnswer = '';
        const tempUserAnswerMap: Map<number, string> = new Map();
        setAnswer(currentAnswer);
        for(let i = 0; i < currentAnswer.length; i++){
            if(currentAnswer[i] == " "){
                tempUserAnswer+=(" ");
                tempUserAnswerMap.set(i, " ");
            }else{
                tempUserAnswer+=("*");
                tempUserAnswerMap.set(i, "*");
            }
        }
        setUserAnswer(tempUserAnswer);
        setUserAnswerMap(tempUserAnswerMap);
        // Debugging
        console.log(`Answer is ${currentAnswer}`);
    };

    return (
        <>
            <h3>Guess the Phrase</h3>
            <hr />
            <p>Phrase:  {userAnswer}</p>
            <p>Guessed Letters:  {guessedLetters.join(", ") || 'No guesses yet'}</p>
            <p>Guesses Remaining:  {10-count}</p>
            <hr />
            <div className='appForm'>
                <form onSubmit={handleSubmit}>
                    <input 
                    className='extraWideText'
                    placeholder='Your guess' 
                    type="text" 
                    value={userInput} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserInput(e.target.value); }} 
                    required />
                    <input 
                    className="submitBtn" 
                    type="submit" 
                    value="Submit" 
                    disabled={userInput.trim() === '' || gameOver || guessedLetters.includes(userInput.toLowerCase())}
                    />
                </form>
            </div>
            <hr />
            <p className='message'>{message}</p>
            <button className='resetButton' onClick={resetGame}>Reset</button>
        </>
    );
}

export default GuessThePhrase;