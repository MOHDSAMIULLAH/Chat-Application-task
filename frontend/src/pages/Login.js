import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            console.log("response: " + response, "email", email, "password", password);
            localStorage.setItem('token', response.data.token);
            navigate('/users');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className=''>
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <h1 className="text-xl font-semibold mb-4">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3 p-2 border rounded w-full"
                    required
                    />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-3 p-2 border rounded w-full"
                    required
                    />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                </button>
                <div className='mt-6'>

                <Link to="/register" className="  py-2  rounded text-blue-600">Go to signup</Link>
                </div>
            </form>
        </div>

                    </div>
    );
};

export default Login;
