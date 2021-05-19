import React, { memo } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import LoginForm from 'components/user/loginForm/LoginForm';
import { login } from 'state/actions/userActions';
import routes from 'constants/routesPaths';
import { ReactComponent as Iphone6 } from 'assets/iphone6.svg';
import { ReactComponent as AppStoreBtn } from 'assets/appstore.svg';
import { ReactComponent as FacebookBtn } from 'assets/facebook.svg';
import { ReactComponent as TwitterBtn } from 'assets/twitter.svg';
import './loginPage.scss';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div className="flex-container-centered">
      <div className="flex-item">
        <LoginForm onSubmit={loginRequest} />
        <NavLink to={routes.signUp} className="signup-button selected">
          <FormattedMessage id="login.signup" />
        </NavLink>
      </div>
      <div className="flex-item blue-background flex-column-container">
        <Iphone6 style={{ height: 650 }} />
        <AppStoreBtn />
        <div className="flex-container social-buttons-container">
          <FacebookBtn className="" />
          <TwitterBtn className="" />
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
