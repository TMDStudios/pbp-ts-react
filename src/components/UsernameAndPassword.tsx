import {useState} from 'react';

function UsernameAndPassword() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [users, setUsers] = useState<string[]>(['Bob', 'Tina', 'Alice']);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsers([...users, username]);
        setUsername('');
        setPassword('');
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
                    <input placeholder='Username' type="text" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value);}} required />
                    <input placeholder='Password' type="text" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value);}} required />
                    <input className="submitBtn" type="submit" value="Submit" />
                </form>
            </div>
            <hr />
            <button className='resetButton' onClick={resetUsers}>Reset</button>
        </>
    );
}

export default UsernameAndPassword;