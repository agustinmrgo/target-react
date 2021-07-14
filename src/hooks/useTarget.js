import { useSelector, shallowEqual } from 'react-redux';

export const useTarget = () =>
  useSelector(
    ({ targetReducer: { targets, currentTargetCoordinates } }) => ({
      targets,
      currentTargetCoordinates
    }),
    shallowEqual
  );
