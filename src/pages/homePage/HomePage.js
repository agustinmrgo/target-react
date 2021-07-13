import React, { useEffect } from 'react';
import { useSession, useResponsive } from 'hooks';
import { Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import RouteFromPath from 'components/routes/RouteFromPath';
import sidebarRoutes from 'components/routes/sidebarRoutes';
import Map from 'components/common/Map/Map';
import './homePage.scss';

const HomePage = () => {
  const { user, authenticated } = useSession();
  const isTabletOrMobile = useResponsive();
  const [cookies, setCookie] = useCookies(['isFirstTimeUser']);

  useEffect(() => {
    if (!cookies.isFirstTimeUser) {
      setCookie('isFirstTimeUser', 'true', { path: '/' });
      window.location.href = '/welcome'; // si funciona
    }
    if (cookies.isFirstTimeUser || !cookies.isFirstTimeUser) {
      // window.location.href = '/welcome';
    }
  }, [setCookie, cookies]);
  // console.log('🚀🚀🚀🚀 ~ cookies2', cookies.isFirstTimeUser);

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
                {sidebarRoutes.map((route, index) => {
                  // if (cookies.isFirstTimeUser === true && window.location !== '/welcome') {
                  //   return <Redirect to="/welcome" />;
                  // }
                  return (
                    <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
                  );
                })}
                {/* {cookies.isFirstTimeUser === true && <Redirect to="/welcome" />} */}
                {/* no funciona */}
              </Switch>
              {cookies.isFirstTimeUser === true && <Redirect to="/welcome" />}
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
