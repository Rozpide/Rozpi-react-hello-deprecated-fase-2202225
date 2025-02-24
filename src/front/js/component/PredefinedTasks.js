import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredefinedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState('');

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

    const assignTaskToUser = (e) => {
        e.preventDefault();
        if (!selectedUserId || !selectedTaskId) {
            alert('Please select both a user and a task.');
            return;
        }

        axios.post('/api/assign_task', {
            task_id: selectedTaskId,
            user_id: selectedUserId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert('Task assigned successfully!');
            // Puedes actualizar el estado aquí si es necesario
        })
        .catch(error => {
            console.error('There was an error assigning the task!', error);
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Predefined Tasks</h1>
            <form onSubmit={assignTaskToUser} className="p-4 border rounded-3 bg-light">
                <div className="mb-3">
                    <label htmlFor="userSelect" className="form-label">Select User</label>
                    <select
                        id="userSelect"
                        className="form-select"
                        value={selectedUserId}
                        onChange={e => setSelectedUserId(e.target.value)}
                        required
                    >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="taskSelect" className="form-label">Select Task</label>
                    <select
                        id="taskSelect"
                        className="form-select"
                        value={selectedTaskId}
                        onChange={e => setSelectedTaskId(e.target.value)}
                        required
                    >
                        <option value="">Select a task</option>
                        {tasks.map(task => (
                            <option key={task.id} value={task.id}>{task.title}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Assign Task</button>
            </form>
        </div>
    );
};

export default PredefinedTasks;