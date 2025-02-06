/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, ReactNode } from 'react';
import { login } from '../api/authApi';

interface AuthContextType {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    setUser(data.message);
  };



  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
