import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AuthProvider, RequireAuth } from './components/auth';
import { HomeRootLayout } from './layouts';
import {
  Assistant,
  Explore,
  FAQ,
  Feedback,
  Landing,
  Login,
  NotFound,
  Recipes,
  Register,
  TrendingRecipes,
} from './pages';

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
    path: '/feedback',
    element: <Feedback />,
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
