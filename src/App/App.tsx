import { AppContextProvider } from '../AppContext/AppContext';
import { StartPage } from '../pages/StartPage';
import { PageTwo } from '../pages/PageTwo';
import style from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/transactions',
    element: <PageTwo />,
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <AppContextProvider>
      <div className={style.container}>
        <RouterProvider router={router} />
      </div>
    </AppContextProvider>
  );
}
