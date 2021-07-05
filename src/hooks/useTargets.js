import { useSelector, shallowEqual } from 'react-redux';

export const useTargets = () =>
  useSelector(({ targetsReducer: { targets, status } }) => ({ targets, status }), shallowEqual);
