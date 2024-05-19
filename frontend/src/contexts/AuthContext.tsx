import { User } from '../types';
import { createContext } from 'react';

type AuthContextType = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
