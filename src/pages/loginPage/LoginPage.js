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
import { ReactComponent as Smilies } from 'assets/smilies.svg';
import './loginPage.scss';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <div className="flex-container-centered">
      <div className="flex-item flex-column-container left-side">
        <div className="login-text">
          <Smilies className="smilies" />
          <h2 className="login_title">TARGET MVD</h2>
          <h4>Find people near you & Connect</h4>
          <p>
            Create a target wherever on the map, specify your interest: Travel, Dating, Music, etc
            and start conecting with others who share your interest.
          </p>
        </div>
        <div className="login-form">
          <LoginForm onSubmit={loginRequest} />
          <p className="forgot-password">Forgot your password?</p>
        </div>
        <p className="sign-in-facebook">Connect with facebook</p>
        <hr />
        <NavLink to={routes.signUp} className="signup-button">
          <FormattedMessage id="login.signup" />
        </NavLink>
      </div>

      <div className="flex-item blue-background flex-column-container">
        <Iphone6 className="iphone-6" />
        <AppStoreBtn />
        <div className="flex-container social-buttons-container">
          <FacebookBtn />
          <TwitterBtn />
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
