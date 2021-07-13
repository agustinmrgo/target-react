import React from 'react';
import { FormattedMessage } from 'react-intl';

import './createTargetForm.scss';

const CreateTargetForm = () => {
  return (
    <div className="welcome-container">
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
    </div>
  );
};

export default CreateTargetForm;
