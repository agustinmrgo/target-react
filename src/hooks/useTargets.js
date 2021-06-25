import { useSelector, shallowEqual } from 'react-redux';

export const useTargets = () =>
  useSelector(({ targetsReducer: { targets } }) => ({ targets }), shallowEqual);
