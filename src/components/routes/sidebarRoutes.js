import React from 'react';

import routesPaths from 'constants/routesPaths';
import WelcomeContent from 'components/home/welcome/WelcomeContent';
import MainContent from 'components/home/main/MainContent';

const sidebarRoutes = [
  {
    path: routesPaths.index,
    component: <MainContent />,
    exact: true,
    private: true
  },
  {
    path: routesPaths.welcome,
    component: <WelcomeContent />,
    exact: true,
    private: true
  }
];

export default sidebarRoutes;