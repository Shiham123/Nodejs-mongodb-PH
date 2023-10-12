import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import ErrorPage from '../pages/errorpage';
import Users from '../pages/users';
import Update from '../pages/update';

const router = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
  {
    path: '/users',
    element: <Users />,
    loader: () => fetch('http://localhost:3000/users'),
  },
  {
    path: '/update/:id',
    element: <Update />,
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
  },
]);

export default router;
