import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CookiesProvider } from 'react-cookie';

import { useSession, useResponsive } from 'hooks';
import RouteFromPath from 'components/routes/RouteFromPath';
import LayoutWrapper from 'components/common/LayoutWrapper';
import mobileRoutes from 'components/routes/sidebarRoutes';
import webRoutes from '../routes';

const App = () => {
  const { authenticated } = useSession();
  const isTabletOrMobile = useResponsive();

  const routes = isTabletOrMobile ? [...mobileRoutes, ...webRoutes] : webRoutes;

  return (
    <>
      <Helmet>
        <title>Target</title>
      </Helmet>
      <CookiesProvider>
        <BrowserRouter>
          <LayoutWrapper>
            <Switch>
              {routes.map((route, index) => (
                <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
              ))}
            </Switch>
          </LayoutWrapper>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
};

export default App;
