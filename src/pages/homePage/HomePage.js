import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession, useResponsive } from 'hooks';

import LogoutButton from 'components/user/LogoutButton';
import MainLayout from 'components/common/MainLayout';
import Map from 'components/common/Map/Map';
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
          <MainLayout
            sidebarContent={
              <>
                <p>
                  <FormattedMessage id="home.welcome" values={user} />
                </p>
                <LogoutButton />
              </>
            }
            mainContent={<Map />}
          />
        ))}
    </>
  );
};

export default HomePage;
