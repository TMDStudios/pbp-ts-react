import {useState} from 'react';

function Calculator() {
    const [savedValue, setSavedValue] = useState<number>(0);
    const [newValue, setNewValue] = useState<string>('');
    const [operator, setOperator] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>('0');
    const [numbers] = useState<string[]>(['0','1','2','3','4','5','6','7','8','9']);
    const [operators] = useState<string[]>(['+','-','*','/','%']);

    const update = (e: React.MouseEvent<HTMLButtonElement>, key: string='=') => {
        e.preventDefault();
        // console.log(savedValue, operator, newValue)
        if(numbers.includes(key)){
            if(newValue === '0') return; // Prevent leading zeros
            setNewValue(newValue+key);
            setDisplayValue(newValue+key);
        }else if(operators.includes(key)){
            if(operator.length===0){
                setOperator(key);
                if(newValue !== '') setSavedValue(parseInt(newValue));
                setNewValue('');
            }else{
                const temp = calculate();
                setSavedValue(temp);
                setDisplayValue(temp.toString());
                setNewValue('');
                setOperator(key);
            }
        }else if(key==='C'){
            reset();
        }else if(key==='<-'){
            if(newValue.length>0){
                const updatedValue = newValue.slice(0, -1);
                setNewValue(updatedValue);
                setDisplayValue(updatedValue || '0'); // Reset to zero when empty
            }
        }else if(key==='+/-'){
            if(newValue.length>0){
                setNewValue((parseInt(newValue)*-1).toString());
                setDisplayValue((parseInt(newValue)*-1).toString());
            }
        }else if(key==='.'){
            console.log("Add later");
        }else if(key==='='){
            const temp = calculate();
            setSavedValue(temp);
            setDisplayValue(temp.toString());
            setOperator('');
            setNewValue('');
        }
    };

    const calculate = () => {
        switch(operator){
            case '+':
                return savedValue + parseInt(newValue);
            case '-':
                return savedValue - parseInt(newValue);
            case '*':
                return savedValue * parseInt(newValue);
            case '/':
                if(savedValue===0 || parseInt(newValue)===0){ // Zero division
                    setDisplayValue('Error');
                    return 0;
                }
                return savedValue / parseInt(newValue);
            default:
                return savedValue % parseInt(newValue);
        }
    }

    const reset = () => {
        setSavedValue(0);
        setNewValue('');
        setDisplayValue('0');
        setOperator('');
    };

    const keys: string[] = ['%','C','<-','/','7','8','9','*','4','5','6','-','1','2','3','+','+/-','0','.','='];

    return (
        <>
            <h3>Calculator</h3>
            <hr />
                <div>
                    <p className='calculatorDisplay'>{displayValue}</p>
                </div>
                <div className='calculator'>
                    {keys.map((k, idx) => (
                        <button key={idx} onClick={(e) => update(e, k)}>{k}</button>
                    ))}
                </div>
        </>
    );
}

export default Calculator;