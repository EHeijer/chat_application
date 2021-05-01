import { useState } from "react";
import axios from 'axios';

const LoginForm = ( ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "7231ad82-5edf-4a35-8d28-5ac4c2c4e90d", 'User-Name': username, 'User-Secret': password};

        try {
            //username | password => chatengine -> give messages
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            //works out -> logged in
            //set username and password in localstorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            // error -> try with new username
            console.log("error")
        }

        
        
        
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;