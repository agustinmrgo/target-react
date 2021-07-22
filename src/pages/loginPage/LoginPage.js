import React, { memo } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import LoginForm from 'components/user/loginForm/LoginForm';
import LandingLayout from 'components/common/LandingLayout';
import { login } from 'state/actions/userActions';
import routes from 'constants/routesPaths';
import { ReactComponent as Smilies } from 'assets/smilies.svg';
import './loginPage.scss';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);

  if (authenticated) {
    return <Redirect exact to={routes.index} />;
  }

  return (
    <LandingLayout
      leftSideElement={
        <>
          <div className="login-text">
            <Smilies className="smilies" />
            <h2 className="login-title">
              <FormattedMessage id="login.title" />
            </h2>
            <h4>
              <FormattedMessage id="login.subtitle" />
            </h4>
            <p>
              <FormattedMessage id="login.intro" />
            </p>
          </div>
          <div className="login-form">
            <LoginForm onSubmit={loginRequest} />
            <p className="forgot-password">
              <FormattedMessage id="login.forgot_password" />
            </p>
          </div>
          <p className="sign-in-facebook">
            <FormattedMessage id="login.facebook" />
          </p>
          <hr />
          <NavLink to={routes.signUp} className="signup-button">
            <FormattedMessage id="login.signup" />
          </NavLink>
        </>
      }
    />
  );
};

export default memo(LoginPage);
