import { PropsWithChildren, useState } from 'react';
import { User } from '../../types';
import { AuthContext } from '../../contexts';
import { useLocalStorage } from '../../hooks';

export function AuthProvider({ children }: PropsWithChildren) {
  const { getItem } = useLocalStorage();

  const persistedToken = getItem('token') as string | null;
  const persistedUser = getItem('user') as User | null;

  const [user, setUser] = useState<User | null>(persistedUser);
  const [token, setToken] = useState<string | null>(persistedToken);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
