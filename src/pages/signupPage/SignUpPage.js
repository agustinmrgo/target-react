import React, { memo } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSession, useDispatch } from 'hooks';
import { signUp } from 'state/actions/userActions';
import SignUpForm from 'components/user/signupForm/SignUpForm';
import routes from 'constants/routesPaths';
import LandingLayout from 'components/common/LandingLayout';
import './signupPage.scss';

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
          <h2 className="signup-title">
            <FormattedMessage id="signup.title" />
          </h2>
          <div>
            <SignUpForm onSubmit={signUpRequest} />
          </div>
          <hr />
          <NavLink to={routes.login} className="signin-button">
            <FormattedMessage id="signup.signin" />
          </NavLink>
        </>
      }
    />
  );
};

export default memo(SignUpPage);
