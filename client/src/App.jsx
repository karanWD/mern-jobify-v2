import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin, EditJob,
} from './pages';

import ErrorElement from './components/ErrorElement';
import {registerAction} from "./pages/Register.jsx";
import {loginAction} from "./pages/Login.jsx";
import {dashboardLoader} from "./pages/DashboardLayout.jsx";
import {addJobAction} from "./pages/AddJob.jsx";
import {jobsLoader} from "./pages/AllJobs.jsx";
import {editJobAction, editJobLoader} from "./pages/EditJob.jsx";
import  {deleteJobAction} from "./pages/DeleteJob.jsx";
import {adminLoader} from "./pages/Admin.jsx";
import {profileAction} from "./pages/Profile.jsx";
import {statsLoader} from "./pages/Stats.jsx";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action:registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action:loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader:dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action:addJobAction
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader:jobsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader:editJobLoader,
            action:editJobAction
          },
          {
            path: 'delete-job/:id',
            action:deleteJobAction

          },
          {
            path: 'stats',
            element: <Stats />,
            loader:statsLoader
          },
          {
            path: 'profile',
            element: <Profile />,
            action:profileAction
          },
          {
            path: 'admin',
            element: <Admin />,
            loader:adminLoader
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};
export default App;
