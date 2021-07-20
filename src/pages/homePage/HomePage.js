import React, { useEffect } from 'react';
import { useSession, useResponsive } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';

import RouteFromPath from 'components/routes/RouteFromPath';
import sidebarRoutes from 'components/routes/sidebarRoutes';
import Map from 'components/common/Map/Map';
import BackArrowIcon from 'assets/back_arrow_icon.svg';
import Smilies from 'assets/smilies.svg';
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

  // const navbarTitle = () => {
  //   switch (window.location.pathname) {
  //     case '/welcome':
  //       return '';
  //     case '/create-target':
  //       return 'CREATE TARGET';
  //     default:
  //       return 'TARGET';
  //   }
  // };

  return (
    <>
      {user?.email &&
        (isTabletOrMobile ? (
          <div className="map-container">
            <Map />
          </div>
        ) : (
          <div className="main-layout-container">
            <div className="sidebar-container">
              <div className="sidebar-navbar">
                <div className="back-arrow-icon">
                  <img src={BackArrowIcon} alt="backArrowIcon" />
                </div>
                <h3 className="nav-title">
                  <FormattedMessage id="target.navbar" />
                </h3>
              </div>
              <div className="sidebar-content">
                {sidebarRoutes.map((route, index) => {
                  return (
                    <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
                  );
                })}
              </div>
              <footer className="sidebar-footer">
                <img src={Smilies} alt="fireSpot" className="smilies-footer" />
              </footer>
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
