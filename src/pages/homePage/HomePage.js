import React, { useEffect } from 'react';
import { useSession } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useIntl } from 'react-intl';

import routes from 'constants/routesPaths';

import RouteFromPath from 'components/routes/RouteFromPath';
import sidebarRoutes from 'components/routes/sidebarRoutes';
import Map from 'components/common/Map/Map';
import Smilies from 'assets/smilies.svg';
import './homePage.scss';

const HomePage = () => {
  const intl = useIntl();
  const { user, authenticated } = useSession();
  const [cookies, setCookie] = useCookies(['isFirstTimeUser']);
  const history = useHistory();

  useEffect(() => {
    if (!cookies.isFirstTimeUser) {
      setCookie('isFirstTimeUser', 'true', { path: routes.index });
      history.push(routes.welcome);
    }
  }, [setCookie, cookies, history]);

  return (
    <>
      {user?.email && (
        <div className="main-layout-container">
          <div className="flex-column-centered sidebar-container">
            {sidebarRoutes.map((route, index) => {
              return (
                <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
              );
            })}
            <footer className="sidebar-footer">
              <img
                src={Smilies}
                alt={intl.formatMessage({ id: 'alt.smilies' })}
                className="smilies-footer"
              />
            </footer>
          </div>
          <div className="main-content">
            <Map />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
