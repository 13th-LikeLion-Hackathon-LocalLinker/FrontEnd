import React from 'react';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import Layout from './layouts/layout';
import MainPage from './pages/Main/MainPage';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import ServiceIntroPage from './pages/ServiceIntro/ServiceIntroPage';
import ProfileSettingPage from './pages/ProfileSetting/ProfileSettingPage';
import CategoryPage from './pages/Category/CategoryPage';
import LatestPage from './pages/LatestPage/LatestPage';
import DuePage from './pages/DuePage/DuePage';
import BookmarkedNoticesPage from './pages/BookmarkedNotices/BookmarkedNoticesPage';

const RootPage = () => {
  const navigate = useNavigate();
  const onboardingDone = localStorage.getItem('onboardingDone');

  if (!onboardingDone) {
    return (
      <OnboardingPage
        onNext={() => {
          localStorage.setItem('onboardingDone', 'true');
          navigate('/');
        }}
      />
    );
  }

  return (
    <Layout showHeader showFooter headerProps={{ type: 'main' }}>
      <MainPage />
    </Layout>
  );
};

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
            <RootPage />
          </>
        ),
      },
      {
        path: 'service-intro',
        element: (
          <Layout showHeader showFooter headerProps={{ type: 'main' }}>
            <ServiceIntroPage />
          </Layout>
        ),
      },
      {
        path: 'profile-setting',
        element: (
          <Layout showHeader showFooter headerProps={{ type: 'main' }}>
            <ProfileSettingPage />
          </Layout>
        ),
      },
      {
        path: 'bookmarked',
        element: (
          <Layout showHeader showFooter headerProps={{ type: 'main' }}>
            <BookmarkedNoticesPage />
          </Layout>
        ),
      },
      {
        path: 'category',
        element: <CategoryPage />,
      },
      {
        path: 'postings/latest',
        element: <LatestPage />,
      },
      {
        path: 'postings/due',
        element: <DuePage />,
      },
    ],
  },
]);

export default router;
