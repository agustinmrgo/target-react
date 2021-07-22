import React, { useEffect } from 'react';
import { useSession, useResponsive } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';

import routes from 'constants/routesPaths';
import { black, white, primaryBlue } from 'constants/colors';

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
      setCookie('isFirstTimeUser', 'true', { path: routes.index });
      history.push(routes.welcome);
    }
  }, [setCookie, cookies, history]);

  const navbarTitle = () => {
    switch (window.location.pathname) {
      case routes.welcome:
        return '';
      case routes.createTarget:
        return 'target.navbar';
      default:
        return 'home.bold_target';
    }
  };

  const showBackArrow = window.location.pathname === routes.createTarget;
  const showNavbarTitle = window.location.pathname !== routes.welcome;

  const isWhiteNavbar =
    window.location.pathname === routes.index || window.location.pathname === routes.welcome;

  const navBarStyles = {
    backgroundColor: isWhiteNavbar ? white : primaryBlue,
    color: isWhiteNavbar ? black : white
  };

  return (
    <>
      {user?.email &&
        (isTabletOrMobile ? (
          <div className="main-layout-container">
            <Map />
          </div>
        ) : (
          <div className="main-layout-container">
            <div className="sidebar-container">
              <div className="sidebar-navbar" style={navBarStyles}>
                {showBackArrow && (
                  <div className="back-arrow-icon" onClick={() => history.push('/')}>
                    <img src={BackArrowIcon} alt="backArrowIcon" />
                  </div>
                )}
                {showNavbarTitle && (
                  <h3 className="navbar-title">
                    <FormattedMessage id={navbarTitle()} />
                  </h3>
                )}
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
