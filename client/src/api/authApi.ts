import axios from 'axios';
import { getHeaders } from './headers';

const API_URL = `${import.meta.env.VITE_BASEURL}/auth`;



interface SignupData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

interface SignupResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
  success: boolean;
  message?: string;
}

export const signup = async (userData: SignupData): Promise<SignupResponse> => {
  try {
    console.log( API_URL);
    
    const response = await axios.post<SignupResponse>(`${API_URL}/signup`, userData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Login error: '+ error); 
    throw error
  }
};





export const login = async (email: string, password : string) => {
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
      localStorage.setItem('authToken', response.data.result.token);
      localStorage.setItem('user', JSON.stringify(response.data.result.user));
  
  
      console.log('Login successful', response.data.user);
      return { success: true, token: response.data.result.token, user: response.data.result.user }; 
    } else {
      console.log('Login failed:',  response.data.message);
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




export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  window.location.reload();
  

  window.location.href = '/login';  
};