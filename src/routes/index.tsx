import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HealthRecord from '../health/HealthRecord';
import CreateHealth from '../health/CreateHealth';
import UpdateHealth from '../health/UpdateHealth';
import { loadHealthcares } from '../loaders/healthcare.loader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/auth',
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        path: '/health-records',
        children: [
          { index: true,
            loader: loadHealthcares,
            element: <HealthRecord />,
           },
          { path: 'create', element: <CreateHealth />},
          { path: ':id/edit', element: <UpdateHealth />}
        ]
      }
    ],
  },
]);
