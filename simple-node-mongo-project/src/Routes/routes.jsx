import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import ErrorPage from '../pages/errorpage';
import Users from '../pages/users';

const router = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
  {
    path: '/users',
    element: <Users />,
    loader: () => fetch('http://localhost:3000/users'),
  },
]);

export default router;
