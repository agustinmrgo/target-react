import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
import { useMediaQuery } from 'react-responsive';

import LogoutButton from 'components/user/LogoutButton';
import MainLayout from 'components/common/MainLayout';
import Map from 'components/common/Map/Map';
import './homePage.scss';

const HomePage = () => {
  const { user } = useSession();

  const isTabletOrMobile = useMediaQuery({ query: ' (max-width: 960px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return (
    <>
      {user &&
        user.email &&
        (isTabletOrMobile || isPortrait ? (
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
