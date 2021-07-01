import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Smilies } from 'assets/smilies.svg';

import './welcomeContent.scss';

const WelcomeContent = () => (
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
    <button type="button">
      <FormattedMessage id="home.ok_button" />
    </button>
  </div>
);

export default WelcomeContent;
