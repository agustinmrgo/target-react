import React from 'react';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
// import { target as targetValidations } from 'utils/constraints';
import {
  useStatus,
  useForm,
  useTextInputProps,
  useSelectProps,
  useTargets,
  useDispatch
} from 'hooks';
import { createTarget } from 'state/actions/targetActions';

import './createTargetForm.scss';

const messages = defineMessages({
  title: { id: 'target.form.title' },
  titlePlaceholder: { id: 'target.form.title.placeholder' },
  radius: { id: 'target.form.radius' },
  topic: { id: 'target.form.topic' },
  topicPlaceholder: { id: 'target.form.topic.placeholder' }
});

const fields = {
  title: '',
  radius: 0,
  topicId: 0,
  lat: 0,
  lng: 0
};

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const CreateTargetForm = () => {
  const intl = useIntl();
  const createTargetRequest = useDispatch(createTarget);
  const { status, error } = useStatus(createTarget);
  const { currentTargetCoordinates } = useTargets();

  const handleCreateSubmit = ev => {
    console.log('🚀 ~ currentTargetCoordinates', currentTargetCoordinates);
    console.log('🚀 ~ CreateTargetForm ~ ev', ev);
  };

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
      handleCreateSubmit
      // validator,
      // validateOnBlur: true
    },
    [handleCreateSubmit]
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
    errors,
    activeFields,
    touched
  );

  return (
    <>
      <div className="top-nav">
        <h3>
          <FormattedMessage id="target.navbar" />
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        {status === REJECTED && <strong className="error">{error}</strong>}
        <div>
          <Input
            name="radius"
            label={intl.formatMessage(messages.radius)}
            {...inputProps(fields.radius)}
          />
        </div>
        <div>
          <Input
            name="title"
            label={intl.formatMessage(messages.title)}
            {...inputProps(fields.title)}
          />
        </div>
        <div>
          <Select
            name="topic"
            label={intl.formatMessage(messages.topic)}
            isSearchable={false}
            options={options}
            placeholder={intl.formatMessage(messages.topicPlaceholder)}
            {...selectProps(fields.topicId)}
          />
        </div>
        <button type="submit" className="sign-in-button">
          <FormattedMessage id="target.form.submit" />
        </button>
        {status === PENDING && <Loading />}
      </form>
    </>
  );
};

export default CreateTargetForm;
