import React, { memo } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
// import FacebookLogin from 'react-facebook-login';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import { useSession, useDispatch, useStatus } from 'hooks';
import LoginForm from 'components/user/loginForm/LoginForm';
import LandingLayout from 'components/common/LandingLayout';
import Loading from 'components/common/Loading';
import { login, loginFacebook } from 'state/actions/userActions';
import routes from 'constants/routesPaths';
import { ReactComponent as Smilies } from 'assets/smilies.svg';
import './loginPage.scss';

const LoginPage = () => {
  const { authenticated } = useSession();
  const loginRequest = useDispatch(login);
  const loginFacebookRequest = useDispatch(loginFacebook);
  const { status, error } = useStatus(loginFacebook);

  if (authenticated) {
    return <Redirect to={routes.index} />;
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
            {status === REJECTED && <strong className="error">{error}</strong>}
            <LoginForm onSubmit={loginRequest} />
            <p className="forgot-password">
              <FormattedMessage id="login.forgot_password" />
            </p>
            {status === PENDING && <Loading />}
          </div>
          <button className="sign-in-facebook" type="button" onClick={loginFacebookRequest}>
            <FormattedMessage id="login.facebook" />
          </button>
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
