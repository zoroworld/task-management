import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.BASE_URL}/auth`;

interface SignupData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export const signup = async (userData: SignupData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error: any) {
    return { success: false, message: error?.message || 'Something went wrong' };
  }
};



interface LoginRequest {
  email: string;
  password: string;
}


export const login = async ({ email, password }: LoginRequest) => {
  try {
    // Send the LoginRequest object with email and password
    const response = await axios.post(
      `${API_URL}/login`, 
      { email, password },  // Send the login data as JSON
      {
        headers: getHeaders(),
      }
    );

    console.log(response);
    


    if (response.data.success) {
      loginUser(response.data);
      return { success: true, token: response.data.result.token, user: response.data.result.user }; 
    } else {

      return { success: false, message: response.data.message || 'Invalid credentials' };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Login error:', error.response.data);
      throw new Error(error.response.data.message || 'Login failed');
    }
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};


// Login function to handle the login and then set user
const loginUser = async (data) => {
  console.log(data);
  
  if (data.success) {
 
    localStorage.setItem('authToken', data.result.token);
    localStorage.setItem('user', JSON.stringify(data.result.user));


    console.log('Login successful', data.user);
  } else {
    console.log('Login failed:', data.message);
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  window.location.reload();
  

  window.location.href = '/login';  
};