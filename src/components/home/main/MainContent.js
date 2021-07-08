import React from 'react';
import { FormattedMessage } from 'react-intl';
// import { ReactComponent as Smilies } from 'assets/smilies.svg';
import Smilies from 'assets/smilies.svg';
import { ReactComponent as ProfilePlaceholder } from 'assets/profile_placeholder.svg';
import FootballTopicIcon from 'assets/football_topic_icon.png';
import MusicTopicIcon from 'assets/music_topic_icon.png';
import TravelTopicIcon from 'assets/travel_topic_icon.png';

import './mainContent.scss';

const MainContent = () => (
  <div className="main-container">
    <h2 className="main-title">
      <FormattedMessage id="home.bold_target" />
    </h2>
    <div className="home-body">
      <div className="profile-container">
        <div className="profile-picture-background">
          <ProfilePlaceholder />
        </div>
        <p>userName</p>
        <a className="profile-link">Edit</a> / <a className="profile-link">Logout</a>
      </div>
      <hr />
      <h4 className="empty_subtitle_1">
        <FormattedMessage id="home_empty.subtitle_1" />
      </h4>
      <div>
        <h6 className="empty_subtitle_2">
          <FormattedMessage id="home_empty.subtitle_2" />
        </h6>
        <ul className="home-topics-list">
          <li>
            <img src={FootballTopicIcon} alt="fireSpot" />
            <span>
              <FormattedMessage id="topic.football" />
            </span>
          </li>
          <li>
            <img src={TravelTopicIcon} alt="fireSpot" />
            <span>
              <FormattedMessage id="topic.travel" />
            </span>
          </li>
          <li>
            <img src={MusicTopicIcon} alt="fireSpot" />
            <span>
              <FormattedMessage id="topic.music" />
            </span>
          </li>
        </ul>
      </div>
    </div>
    {/* <Smilies className="smilies-footer" /> */}
    {/* <div className="smilies-footer" /> */}
    <footer>
      <img src={Smilies} alt="fireSpot" className="smilies-footer" />
      {/* <Smilies className="smilies-footer" /> */}
    </footer>
  </div>
);

export default MainContent;
