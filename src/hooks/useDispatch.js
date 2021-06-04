import { useCallback } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';

export const useDispatch = (action, ...dependencies) => {
  const dispatch = useReduxDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(payload => dispatch(action(payload)), [dispatch, action, ...dependencies]);
};
