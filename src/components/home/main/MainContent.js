import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { ReactComponent as ProfilePlaceholder } from 'assets/profile_placeholder.svg';
import FootballTopicIcon from 'assets/football_topic_icon.png';
import MusicTopicIcon from 'assets/music_topic_icon.png';
import TravelTopicIcon from 'assets/travel_topic_icon.png';
import { useSession } from 'hooks';

import Navbar from 'components/common/Navbar/Navbar';
import './mainContent.scss';

const MainContent = () => {
  const intl = useIntl();
  const { user } = useSession();

  return (
    <>
      <Navbar
        title={<FormattedMessage id="home.bold_target" />}
        className="navbar_white"
        showMenuIcon
      />
      <div className="flex-column-centered content-body">
        <div className="profile-container">
          <div className="profile-picture-background">
            <ProfilePlaceholder />
          </div>
          {user.username ? (
            <p>{user.userame}</p>
          ) : (
            <p>
              <FormattedMessage id="home.empty_username" />
            </p>
          )}
          <a className="profile-link">Edit</a> / <a className="profile-link">Logout</a>
        </div>
        <hr />
        <h4 className="empty_subtitle_1">
          <FormattedMessage id="home.empty.subtitle_1" />
        </h4>
        <div>
          <h6 className="empty_subtitle_2">
            <FormattedMessage id="home.empty.subtitle_2" />
          </h6>
          <ul className="home-topics-list">
            <li>
              <img src={FootballTopicIcon} alt={intl.formatMessage({ id: 'alt.football' })} />
              <span>
                <FormattedMessage id="topic.football" />
              </span>
            </li>
            <li>
              <img src={TravelTopicIcon} alt={intl.formatMessage({ id: 'alt.travel' })} />
              <span>
                <FormattedMessage id="topic.travel" />
              </span>
            </li>
            <li>
              <img src={MusicTopicIcon} alt={intl.formatMessage({ id: 'alt.music' })} />
              <span>
                <FormattedMessage id="topic.music" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainContent;
