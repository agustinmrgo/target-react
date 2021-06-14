import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
import { useMediaQuery } from 'react-responsive';

import LogoutButton from 'components/user/LogoutButton';
import MainLayout from 'components/common/MainLayout';
import MapComponent from 'components/common/MapComponent';

import './homePage.scss';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSession();

  const isTabletOrMobile = useMediaQuery({ query: ' (max-width: 960px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {user &&
        user.email &&
        (isTabletOrMobile || isPortrait ? (
          <div className="mobile-layout-container">
            <div className="topnav">
              <a className="icon burger-menu" onClick={toggleMenu} style={{}}>
                <i className="fas fa-bars" />
              </a>
              <a href="#home" className="nav-title">
                TARGET
              </a>
              <a className="icon">
                <i className="fas fa-map-marker-alt" />
              </a>
            </div>
            {isMenuOpen && (
              <div className="topnav">
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
              </div>
            )}
            <MapComponent style={{ position: 'relative', height: '100%' }} />
          </div>
        ) : (
          <MainLayout
            sidebarContent={
              <>
                <p>
                  <FormattedMessage id="home.welcome" values={user} />
                </p>
                <LogoutButton />
              </>
            }
            mainContent={<MapComponent />}
          />
        ))}
    </>
  );
};

export default HomePage;
