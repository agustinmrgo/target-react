import React, { memo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import LoginForm from 'components/user/LoginForm';
import { login } from 'state/actions/userActions';
import routes from 'constants/routesPaths';
import { ReactComponent as Iphone6 } from 'assets/iphone6.svg';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{ flex: 1 }}>
        <LoginForm onSubmit={loginRequest} />
        <Link to={routes.signUp}>
          <FormattedMessage id="login.signup" />
        </Link>
      </div>
      <div style={{ flex: 1 }}>
        <Iphone6 />
      </div>
    </div>
  );
};

export default memo(LoginPage);
