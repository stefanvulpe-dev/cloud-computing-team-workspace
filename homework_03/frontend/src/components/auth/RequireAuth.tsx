import { useAuth } from '../../hooks';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }: PropsWithChildren) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return <>{children}</>;
}
