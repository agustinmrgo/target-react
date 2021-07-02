import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import ArtTopicIcon from 'assets/art_topic_icon.png';
import SeriesTopicIcon from 'assets/series_topic_icon.png';
import MoviesTopicIcon from 'assets/movies_topic_icon.png';
import FoodTopicIcon from 'assets/food_topic_icon.png';
import DatingTopicIcon from 'assets/dating_topic_icon.png';
import FootballTopicIcon from 'assets/football_topic_icon.png';
import MusicTopicIcon from 'assets/music_topic_icon.png';
import PoliticsTopicIcon from 'assets/politics_topic_icon.png';

export const parseInputErrors = error => {
  if (!error) {
    return;
  }
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const applyQueryParams = (url, params = {}) => {
  if (isEmpty(params)) {
    return url;
  }
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};

export const targetIcon = topicId => {
  switch (topicId) {
    case 2:
      return FootballTopicIcon;
    case 13:
      return PoliticsTopicIcon;
    case 14:
      return ArtTopicIcon;
    case 15:
      return DatingTopicIcon;
    case 16:
      return MusicTopicIcon;
    case 17:
      return MoviesTopicIcon;
    case 18:
      return SeriesTopicIcon;
    case 19:
      return FoodTopicIcon;
    default:
      return MusicTopicIcon;
  }
};
