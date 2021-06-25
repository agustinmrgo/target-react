import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession, useResponsive } from 'hooks';

import LogoutButton from 'components/user/LogoutButton';
import MainLayout from 'components/common/MainLayout';
import Map from 'components/common/Map/Map';
import { ReactComponent as Smilies } from 'assets/smilies.svg';
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
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <Smilies />
                <h2 className="login-title">
                  <FormattedMessage id="home.welcome" />
                  <span>
                    <FormattedMessage id="home.bold_target" />
                  </span>
                </h2>
                <h4>
                  <FormattedMessage id="home.subtitle" />
                </h4>
                <ul>
                  <li>
                    <span>
                      <FormattedMessage id="home.item_1" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <FormattedMessage id="home.bold_target" />
                    </span>
                    <span>
                      <FormattedMessage id="home.item_2" />
                    </span>
                  </li>
                </ul>
                {/* <p>
                  <FormattedMessage id="home.welcome" values={user} />
                </p> */}
                <LogoutButton />
              </div>
            }
            mainContent={<Map />}
          />
        ))}
    </>
  );
};

export default HomePage;
