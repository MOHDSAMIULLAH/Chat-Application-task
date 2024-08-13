import React, { useState } from 'react';
import { register } from '../../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Student',
        password: '',
    });

    const { name, email, phone, role, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(formData);
            console.log('User registered:', user);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                    name="role"
                    value={role}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Institute">Institute</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Register
            </button>
        </form>
    );
};

export default Register;
