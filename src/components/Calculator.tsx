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
            if(newValue === '0' && key !== '.') return; // Prevent leading zeros
            setNewValue(newValue+key);
            setDisplayValue(newValue+key);
        }else if(operators.includes(key)){
            if(operator.length===0){
                setOperator(key);
                if(newValue !== '') setSavedValue(parseFloat(newValue));
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
                setNewValue((parseFloat(newValue)*-1).toString());
                setDisplayValue((parseFloat(newValue)*-1).toString());
            }
        }else if(key==='.'){
            if(!newValue.includes('.')) setNewValue(newValue+'.');
        }else if(key==='='){
            const temp = calculate();
            setSavedValue(temp);
            setDisplayValue(temp.toString());
            setOperator('');
            setNewValue('');
        }
    };

    const calculate = () => {
        let num = newValue ? parseFloat(newValue) : 0;
        let result: number;
        switch(operator){
            case '+':
                result = savedValue + num;
                break;
            case '-':
                result = savedValue - num;
                break;
            case '*':
                result = savedValue * num;
                break;
            case '/':
                if(savedValue === 0 || num === 0){
                    setDisplayValue('Error');
                    return 0;
                }
                result = savedValue / num;
                break;
            default:
                result = savedValue % num;
                break;
        }
        
        return parseFloat(result.toFixed(10));
    };

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