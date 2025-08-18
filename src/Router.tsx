import React from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/layout';
import MainPage from './pages/Main/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <Layout showHeader showFooter headerProps={{ type: 'main' }}>
              <MainPage />
            </Layout>
          </>
        ),
      },
    ],
  },
]);

export default router;
