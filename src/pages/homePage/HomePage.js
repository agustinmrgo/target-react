import React from 'react';
import { useSession, useResponsive } from 'hooks';
import { Switch } from 'react-router-dom';

import RouteFromPath from 'components/routes/RouteFromPath';
import sidebarRoutes from 'components/routes/sidebarRoutes';
import Map from 'components/common/Map/Map';
// import WelcomeContent from 'components/home/welcome/WelcomeContent';
import './homePage.scss';

const HomePage = () => {
  const { user, authenticated } = useSession();
  const isTabletOrMobile = useResponsive();

  return (
    <>
      {user?.email &&
        (isTabletOrMobile ? (
          <div className="map-container">
            <Map />
          </div>
        ) : (
          <div className="main-layout-container">
            <div className="sidebar-content">
              <Switch>
                {sidebarRoutes.map((route, index) => (
                  <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
                ))}
              </Switch>
            </div>
            <div className="main-content">
              <Map />
            </div>
          </div>
        ))}
    </>
  );
};

export default HomePage;
