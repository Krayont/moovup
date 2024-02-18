//
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Box
} from '@mui/material';

//
import ErrorPage from './pages/error';
import UsersPage from './pages/users';


//
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        margin: 0,
      }}
    >
      <Box
        sx={{
          width: '80vw',
          minHeight: '100vh',
          margin: '0 auto',
          backgroundColor: 'rgba(243, 246, 249)',
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </Box>
  );
}

//
export default App;