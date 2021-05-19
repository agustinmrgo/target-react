import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { login as loginValidations } from 'utils/constraints';
import { useStatus, useForm, useValidation, useTextInputProps } from 'hooks';
import { login } from 'state/actions/userActions';
import { ReactComponent as Smilies } from 'assets/smilies.svg';
import './loginForm.scss';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

const fields = {
  email: 'email',
  password: 'password'
};

export const LoginForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(login);
  const validator = useValidation(loginValidations);
  const {
    values,
    errors,
    handleValueChange,
    handleSubmit,
    handleFocus,
    handleBlur,
    activeFields,
    touched
  } = useForm(
    {
      onSubmit,
      validator,
      validateOnBlur: true
    },
    [onSubmit]
  );

  const inputProps = useTextInputProps(
    handleValueChange,
    handleFocus,
    handleBlur,
    values,
    errors,
    activeFields,
    touched
  );

  return (
    <div className="login-form-container">
      <Smilies />
      <h2 className="login-form_title">TARGET MVD</h2>
      <h4>Find people near you & Connect</h4>
      <p>
        Create a target wherever on the map, specify your interest: Travel, Dating, Music, etc and
        start conecting with others who share your interest.
      </p>
      <form onSubmit={handleSubmit}>
        {status === REJECTED && <strong>{error}</strong>}
        <div>
          <Input
            name="email"
            type="email"
            label={intl.formatMessage(messages.email)}
            {...inputProps(fields.email)}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <Input
            name="password"
            type="password"
            label={intl.formatMessage(messages.password)}
            {...inputProps(fields.password)}
          />
        </div>
        <button type="submit">
          <FormattedMessage id="login.form.submit" />
        </button>
        {status === PENDING && <Loading />}
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(LoginForm);
