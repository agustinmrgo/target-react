import React, { memo } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import { signUp } from 'state/actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';
import './signupPage.scss';
import LandingLayout from 'components/common/LandingLayout';

const SignUpPage = () => {
  const { authenticated } = useSession();
  const signUpRequest = useDispatch(signUp);

  if (authenticated) {
    return <Redirect to={routes.index} />;
  }

  return (
    <LandingLayout
      leftSideElement={
        <>
          <p>
            <FormattedMessage id="signup.title" />
          </p>
          <div className="login-form">
            <SignUpForm onSubmit={signUpRequest} />
          </div>
          <hr />
          <NavLink to={routes.login}>
            <FormattedMessage id="signup.signin" />
          </NavLink>
        </>
      }
    />
  );
};

export default memo(SignUpPage);
