import {useState} from 'react';

function UsernameAndPassword() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [users, setUsers] = useState<string[]>(['Bob', 'Tina', 'Alice']);
    const [message, setMessage] = useState<string>("");

    const validateUsername = () => {
        const trimmedUsername = username.trim();
        if(users.some((user) => user.toLowerCase() === trimmedUsername.toLowerCase())){
            setMessage("User already exists");
            return false;
        }
        if(trimmedUsername.length<3 || trimmedUsername.length>14){
            setMessage("Username must be between 3 and 14 characters long");
            return false;
        }
        if(!/^[a-zA-Z]+$/.test(trimmedUsername)){
            setMessage("Username must not contain numbers");
            return false;
        }
        return true;
    }
    
    const validatePw = () => {
        if(!/[A-Z]/.test(password)){
            setMessage("Password must contain a capital letter");
            return false;
        }
        if(!/[!@#$]/.test(password)){
            setMessage("Password must contain a special character ('!', '@', '#', '$')");
            return false;
        }
        if(!/[0-9]/.test(password)){
            setMessage("Password must contain a number");
            return false;
        }
        if(password.length < 8){
            setMessage("Password must be at least 8 characters long");
            return false;
        }
        return true;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validateUsername() || !validatePw()) return;
        setUsers([...users, username]);
        setUsername('');
        setPassword('');
        setMessage('User added');
    };

    const resetUsers = () => {
        setUsers(['Bob', 'Tina', 'Alice']);
    };

    return (
        <>
            <h3>Username and Password</h3>
            <hr />
            <p>Current users:  {users.join(", ")}</p>
            <hr />
            <div className='appForm'>
                <form onSubmit={handleSubmit}>
                    <input 
                    placeholder='Username' 
                    type="text" 
                    value={username} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                        setMessage("");
                    }} 
                    required />
                    <input 
                    placeholder='Password' 
                    type="password" 
                    value={password} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                        setMessage("");
                    }} 
                    required />
                    <input 
                    className="submitBtn" 
                    type="submit" 
                    value="Submit" 
                    disabled={username.trim() === '' || password.trim() === ''} />
                </form>
            </div>
            <hr />
            <p className='message'>{message}</p>
            <button className='resetButton' onClick={resetUsers}>Reset</button>
        </>
    );
}

export default UsernameAndPassword;