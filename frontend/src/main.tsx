import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Explore,
  TrendingRecipes,
  Landing,
  Login,
  NotFound,
  Recipes,
  Register,
  FAQ,
  Assistant,
} from './pages';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { HomeRootLayout } from './layouts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, RequireAuth } from './components/auth';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: '/home',
    element: (
      <RequireAuth>
        <HomeRootLayout />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: '/home',
        element: <Navigate to="/home/trending" replace={true} />,
      },
      {
        path: '/home/trending',
        element: <TrendingRecipes />,
      },
      {
        path: '/home/explore',
        element: <Explore />,
      },
      {
        path: '/home/recipes',
        element: <Recipes />,
      },
      {
        path: '/home/faq',
        element: <FAQ />,
      },
      {
        path: '/home/assistant',
        element: <Assistant />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
