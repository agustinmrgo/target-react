import { useSelector, shallowEqual } from 'react-redux';

export const useTargets = () =>
  useSelector(
    ({ targetsReducer: { targets, getStatus, createStatus } }) => ({
      targets,
      getStatus,
      createStatus
    }),
    shallowEqual
  );
