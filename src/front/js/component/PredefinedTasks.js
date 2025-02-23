import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PredefinedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
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
    }, []);

    const assignTaskToUser = (taskId) => {
        if (!selectedUserId) {
            alert('Please select a user to assign the task.');
            return;
        }

        axios.post('/api/assign_task', {
            task_id: taskId,
            user_id: selectedUserId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert('Task assigned successfully!');
        })
        .catch(error => {
            console.error('There was an error assigning the task!', error);
        });
    };

    return (
        <div>
            <h1>Tasks Predefinidas</h1>
            <div>
                <label>Select User: </label>
                <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.email}</option>
                    ))}
                </select>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <button onClick={() => assignTaskToUser(task.id)}>Assign to User</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PredefinedTasks;
