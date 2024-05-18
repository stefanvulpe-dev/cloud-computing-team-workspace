import { useAuth } from './useAuth.tsx';
import { useEffect } from 'react';
import { axiosClient } from '../api';
import { useLocalStorage } from './useLocalStorage.ts';

export function useAxios() {
  const { token } = useAuth();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const requestInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        const token = getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axiosClient.interceptors.request.eject(requestInterceptor);
    };
  }, [token, getItem]);

  return axiosClient;
}
