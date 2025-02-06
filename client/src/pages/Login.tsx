import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: object;
}

const Login: React.FC = () => {
  const navigate = useNavigate(); // hook for navigation
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email , password);
    
    try {
      const response: LoginResponse = await login(email, password);
      if (response.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials, please try again.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Something went wrong. Please try again later.' + err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
