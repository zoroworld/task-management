import React, { useState, useEffect } from 'react';
import { logout } from '../api/authApi';
import { getTaskById, createTask, updateTask, completeTask, deleteTask } from '../api/taskApi';
import TaskList from './TaskList';

type Task = {
  _id: string;  // Add _id here
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

interface User {
  name: string;
  address: string;
  phone: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTaskById();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const task = await createTask(newTask);
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', status: 'pending' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId, { status: 'completed' });  // Fix typo here
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleUpdateTask = async () => {
    if (!editTask) return;
    try {
      await updateTask(editTask._id, {
        title: editTask.title,
        description: editTask.description,
      });
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      {user ? (
        <div className="min-h-screen flex flex-col">
          <header className="bg-slate-900 text-white flex justify-between items-center p-4">
            <div className="text-lg font-bold">Logo</div>
            <div className="flex items-center space-x-4">
              <span>{user?.name}</span>
              <button
                onClick={() => { logout()}}
                className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500"
              >
                Log Out
              </button>
            </div>
          </header>

          <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div >
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Create Task</h2>
                <form onSubmit={handleCreateTask}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    required
                    className="w-full p-2 border rounded mb-2"
                  ></textarea>
                  <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Create Task
                  </button>
                </form>
              </div>
              <TaskList tasks={tasks} />
            </div>

            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Pending Tasks</h3>
              <ul>
                {tasks?.filter((task) => task.status === 'pending').map((task) => (
                  <li key={task._id} className="border-b py-2 flex flex-col justify-between">
                    <div>
                      {task.status}
                      <h4 className="font-semibold">{task.title}</h4>
                      <p>{task.description}</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => handleCompleteTask(task._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Task Completed
                      </button>
                      <button
                        onClick={() => setEditTask(task)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
              <ul>
                {tasks?.filter((task) => task.status === 'completed').map((task) => (
                  <div key={task._id}>
                    <li className="border-b py-2">
                      <div>
                        <h4 className="font-semibold">{task.title}</h4>
                        <p>{task.description}</p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <button
                          onClick={() => handleCompleteTask(task._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>

          </main>

          {editTask && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="w-full p-2 border rounded mb-2"
                ></textarea>
                <div className="flex justify-end space-x-2">
                  <button onClick={handleUpdateTask} className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                    Update
                  </button>
                  <button onClick={() => setEditTask(null)} className="bg-gray-500 text-white px-3 py-1 rounded-lg">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <footer className="bg-slate-900 text-white p-4 text-center">
            <p>&copy; 2025 Task Manager. All rights reserved.</p>
          </footer>
        </div>
      ) : (
        <>
          <h1>You are not Authorized</h1>
        </>
      )}
    </>
  );
};

export default Dashboard;
