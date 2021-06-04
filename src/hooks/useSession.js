import { useSelector, shallowEqual } from 'react-redux';

export const useSession = () =>
  useSelector(
    ({ session: { authenticated, user } }) => ({
      authenticated,
      user
    }),
    shallowEqual
  );
