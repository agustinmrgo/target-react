import React from 'react';

import routesPaths from 'constants/routesPaths';
import HomePage from 'pages/homePage/HomePage';
import LoginPage from 'pages/loginPage/LoginPage';
import SignUpPage from 'pages/signupPage/SignUpPage';
import NotFoundPage from 'pages/NotFoundPage';

const routes = [
  {
    path: routesPaths.login,
    component: <LoginPage />,
    exact: true
  },
  {
    path: routesPaths.signUp,
    component: <SignUpPage />,
    exact: true
  },
  {
    path: routesPaths.index,
    component: <HomePage />,
    private: true
  },
  {
    component: <NotFoundPage />
  }
];

export default routes;
