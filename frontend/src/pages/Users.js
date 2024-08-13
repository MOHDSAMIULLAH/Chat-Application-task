import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    console.log(users,"users");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data,"response fetchUsers data")
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/user/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data,"response data")
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error(err);
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <div className="container mx-auto mt-10">
            <div className='flex justify-between my-8'>
            <h1 className="text-3xl flex-1 text-center font-semibold mb-5">User Management</h1> 
            <button className="bg-green-500 text-white px-8 rounded " onClick={logout}  >LogOut</button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className='bg-gray-800 text-white'>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className='border-b last:border-none hover:bg-gray-100'>
                            <td className="border text-center px-4 py-2">{user.id}</td>
                            <td className="border text-center px-4 py-2">{user.name}</td>
                            <td className="border text-center px-4 py-2">{user.email}</td>
                            <td className="border text-center px-4 py-2">{user.phone}</td>
                            <td className="border text-center px-4 py-2">{user.role}</td>
                            <td className="border-b text-center flex justify-center px-4 py-2">
                                <Link to={`/update-user/${user.id}`} className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">
                                    Edit
                                </Link>
                                <button className="bg-red-500 text-white py-1 px-2 rounded " onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
