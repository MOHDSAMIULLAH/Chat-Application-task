import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'Student',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/register', formData);
            console.log("response: ",res, "formData: ",formData)
            navigate('/login');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <h1 className="text-xl font-semibold mb-4">Register</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mb-3 p-2 border rounded w-full"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-3 p-2 border rounded w-full"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mb-3 p-2 border rounded w-full"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-3 p-2 border rounded w-full"
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mb-3 p-2 border rounded w-full"
                >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Institute">Institute</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Register
                </button>
                <div className='mt-6'>

                <Link to="/login" className="  py-2  rounded text-blue-600">Go to Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
