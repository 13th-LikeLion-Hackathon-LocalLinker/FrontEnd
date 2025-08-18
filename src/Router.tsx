import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);

export default router;
