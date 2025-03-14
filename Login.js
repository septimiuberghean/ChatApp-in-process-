import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (username.trim() === '') {
            setError("Username cannot be empty.");
            return;
        }

        setLoading(true);
        axios.post('/api/users', { username })
            .then(response => {
                setLoading(false);
                alert("Account created successfully!");
                setIsRegistering(false);
            })
            .catch(error => {
                setLoading(false);
                alert("Error: Account could not be created. Try a different username.");
            });
    };

   const handleLogin = () => {
    if (username.trim() === '') {
        setError("Username cannot be empty.");
        return;
    }

    setLoading(true);
    axios.post('/api/users/login', { username })
        .then(response => {
            setLoading(false);
            setUser(response.data); 
        })
        .catch(error => {
            setLoading(false);
            setError("Error: Username not found or account is inactive. Please register first.");
        });
};

    return (
        <div>
            <h1>{isRegistering ? "Register" : "Login"}</h1>
            <input
                type="text"
                value={username}
                onChange={e => {
                    setUsername(e.target.value);
                    setError('');
                }}
                placeholder="Enter your username"
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                isRegistering ? (
                    <button onClick={handleRegister}>Register</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )
            )}
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Switch to Login" : "Switch to Register"}
            </button>
        </div>
    );
};

export default Login;





