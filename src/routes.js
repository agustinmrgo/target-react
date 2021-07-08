import React from 'react';

import routesPaths from 'constants/routesPaths';
import HomePage from 'pages/homePage/HomePage';
import LoginPage from 'pages/loginPage/LoginPage';
import SignUpPage from 'pages/signupPage/SignUpPage';
import NotFoundPage from 'pages/NotFoundPage';

const routes = [
  {
    path: routesPaths.index,
    component: <HomePage />,
    // exact: true,
    private: true
  },
  {
    path: routesPaths.login,
    component: <LoginPage />
    // exact: true
  },
  {
    path: routesPaths.signUp,
    component: <SignUpPage />
  },
  {
    component: <NotFoundPage />
  }
];

export default routes;
