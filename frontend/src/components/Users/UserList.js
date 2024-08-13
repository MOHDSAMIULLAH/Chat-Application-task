import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        <span className="font-bold">{user.name}</span> - {user.role} ({user.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
