import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import { signUp as signUpValidations } from 'utils/constraints';
import { useStatus, useForm, useValidation, useTextInputProps, useSelectProps } from 'hooks';
import { signUp } from 'state/actions/userActions';
import './signupForm.scss';

const messages = defineMessages({
  name: { id: 'signup.form.name' },
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' },
  passConfirmation: { id: 'signup.form.passconfirmation' },
  gender: { id: 'signup.form.gender' },
  minpassword: { id: 'signup.form.minpassword' },
  genderPlaceholder: { id: 'signup.form.gender_placeholder' }
});

const fields = {
  name: 'name',
  email: 'email',
  password: 'password',
  passwordConfirmation: 'passwordConfirmation',
  gender: 'gender'
};

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

export const SignUpForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(signUp);

  const validator = useValidation(signUpValidations);
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

  const selectProps = useSelectProps(
    handleValueChange,
    handleFocus,
    handleBlur,
    values,
    errors,
    activeFields,
    touched
  );

  return (
    <form onSubmit={handleSubmit}>
      {status === REJECTED && <strong className="error">{error}</strong>}
      <div>
        <Input name="name" label={intl.formatMessage(messages.name)} {...inputProps(fields.name)} />
      </div>
      <div>
        <Input
          name="email"
          label={intl.formatMessage(messages.email)}
          type="email"
          {...inputProps(fields.email)}
        />
      </div>
      <div>
        <Input
          name="password"
          label={intl.formatMessage(messages.password)}
          type="password"
          placeholder={intl.formatMessage(messages.minpassword)}
          {...inputProps(fields.password)}
        />
      </div>
      <div>
        <Input
          name="passwordConfirmation"
          label={intl.formatMessage(messages.passConfirmation)}
          type="password"
          {...inputProps(fields.passwordConfirmation)}
        />
      </div>
      <div>
        <Select
          name="gender"
          label={intl.formatMessage(messages.gender)}
          isSearchable={false}
          options={options}
          placeholder={intl.formatMessage(messages.genderPlaceholder)}
          {...selectProps(fields.gender)}
        />
      </div>
      <button type="submit" className="submit-button">
        <FormattedMessage id="login.signup" />
      </button>
      {status === PENDING && <Loading />}
    </form>
  );
};

SignUpForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(SignUpForm);
