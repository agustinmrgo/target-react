import React from 'react';
import { useSession, useResponsive } from 'hooks';

import MainLayout from 'components/common/MainLayout';
import Map from 'components/common/Map/Map';
import WelcomeContent from 'components/home/welcome/WelcomeContent';
import './homePage.scss';

const HomePage = () => {
  const { user } = useSession();
  const isTabletOrMobile = useResponsive();

  return (
    <>
      {user?.email &&
        (isTabletOrMobile ? (
          <div className="map-container">
            <Map />
          </div>
        ) : (
          <MainLayout sidebarContent={<WelcomeContent />} mainContent={<Map />} />
        ))}
    </>
  );
};

export default HomePage;
