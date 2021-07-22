import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Smilies } from 'assets/smilies.svg';
import routes from 'constants/routesPaths';
import { NavLink, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './welcomeContent.scss';

const WelcomeContent = () => {
  const [cookies, setCookie] = useCookies(['isFirstTimeUser']);
  const history = useHistory();

  useEffect(() => {
    if (cookies.isFirstTimeUser === 'false') {
      history.replace('/');
    }
  }, [history, cookies]);

  return (
    <div className="welcome-container">
      <Smilies />
      <h2 className="welcome-title">
        <FormattedMessage id="home.welcome" />
        <span>
          <FormattedMessage id="home.bold_target" />
        </span>
      </h2>
      <h4>
        <FormattedMessage id="home.subtitle" />
      </h4>
      <ul className="welcome-list">
        <li>
          <span>
            <FormattedMessage id="home.item_1" />
          </span>
        </li>
        <li>
          <span className="target-bold-text">
            <FormattedMessage id="home.bold_target" />
          </span>
          <span>
            <FormattedMessage id="home.item_2" />
          </span>
        </li>
      </ul>
      <NavLink
        to={routes.index}
        onClick={() => setCookie('isFirstTimeUser', 'false', { path: routes.index })}
      >
        <button type="button">
          <FormattedMessage id="home.ok_button" />
        </button>
      </NavLink>
    </div>
  );
};

export default WelcomeContent;
