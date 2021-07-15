import React, { useEffect } from 'react';
import { useSession, useResponsive } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import RouteFromPath from 'components/routes/RouteFromPath';
import sidebarRoutes from 'components/routes/sidebarRoutes';
import Map from 'components/common/Map/Map';
import './homePage.scss';

const HomePage = () => {
  const { user, authenticated } = useSession();
  const isTabletOrMobile = useResponsive();
  const [cookies, setCookie] = useCookies(['isFirstTimeUser']);
  const history = useHistory();

  useEffect(() => {
    if (!cookies.isFirstTimeUser) {
      setCookie('isFirstTimeUser', 'true', { path: '/' });
      history.push('/welcome');
    }
  }, [setCookie, cookies, history]);

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
              {sidebarRoutes.map((route, index) => {
                return (
                  <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
                );
              })}
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
