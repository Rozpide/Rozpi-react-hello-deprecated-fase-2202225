import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Obtener usuarios
        axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the users!", error);
        });

        // Obtener tareas predefinidas
        axios.get('/api/predefined_tasks', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the predefined tasks!", error);
        });
    }, []);

    const assignTaskToUser = (userId, taskId) => {
        axios.post('/api/assign_task', {
            task_id: taskId,
            user_id: userId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert('Task assigned successfully!');
            // Eliminar tarea asignada del estado
            setTasks(tasks.filter(task => task.id !== taskId));
        })
        .catch(error => {
            console.error('There was an error assigning the task!', error);
        });
    };

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td>
                                <select onChange={e => assignTaskToUser(user.id, e.target.value)}>
                                    <option value="">Select a task</option>
                                    {tasks.map(task => (
                                        <option key={task.id} value={task.id}>{task.title}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
