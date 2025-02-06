import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/tasks`;


export const getTaskById = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.warn('No authentication token found. User must be logged in.');
      return null; 
    }

    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

interface createTaskData {
  title: string;
  description: string;
  status: string;
}

export const createTask = async (taskData: createTaskData) => {
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const updateTask = async (taskId: string, taskData: { title: string; description: string}) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const completeTask = async (taskId: string, taskData: {status: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};