import { useSelector, shallowEqual } from 'react-redux';

export const useTopic = () =>
  useSelector(({ topicReducer: { topics } }) => ({ topics }), shallowEqual);
