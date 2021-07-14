import React, { useEffect } from 'react';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING, FULFILLED } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import { createTarget as targetValidations } from 'utils/constraints';
import {
  useStatus,
  useForm,
  useTextInputProps,
  useSelectProps,
  useTarget,
  useTopic,
  useDispatch,
  useValidation
} from 'hooks';
import { createTarget } from 'state/actions/targetActions';
import { getAllTopics } from 'state/actions/topicActions';
import TargetIcon from 'assets/target_icon.svg';

import './createTargetForm.scss';

const messages = defineMessages({
  title: { id: 'target.form.title' },
  titlePlaceholder: { id: 'target.form.title.placeholder' },
  radius: { id: 'target.form.radius' },
  topic: { id: 'target.form.topic' },
  topicPlaceholder: { id: 'target.form.topic.placeholder' }
});

const fields = {
  title: 'title',
  radius: 'radius',
  topicId: 'topicId',
  lat: 'lat',
  lng: 'lng'
};

const CreateTargetForm = () => {
  const intl = useIntl();
  const createTargetRequest = useDispatch(createTarget);
  const { status: createTargetStatus, error: createTargetError } = useStatus(createTarget);
  const getAllTopicsRequest = useDispatch(getAllTopics);
  const { status: getAllTopicsStatus, error: getAllTopicsError } = useStatus(getAllTopics);
  const { currentTargetCoordinates } = useTarget();
  const { topics } = useTopic();
  // console.log('🚀 ~ file: CreateTargetForm.js ~ line 56 ~ CreateTargetForm ~ topics', topics);
  const validator = useValidation(targetValidations);

  useEffect(() => {
    if (getAllTopicsStatus !== FULFILLED) {
      getAllTopicsRequest();
    }
  }, [getAllTopicsRequest, getAllTopicsStatus]);

  const handleCreateSubmit = formData => {
    console.log('🚀 ~ currentTargetCoordin  coordinates', currentTargetCoordinates);
    console.log('🚀 ~ CreateTargetForm ~ ev', formData);
    createTargetRequest({ ...currentTargetCoordinates, ...formData });
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
      onSubmit: handleCreateSubmit
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

  const topicsOptions = topics.map(({ topic: { id, label } }) => ({ value: id, label }));

  return (
    <>
      <div className="top-nav">
        <h3 className="nav-title">
          <FormattedMessage id="target.navbar" />
        </h3>
      </div>
      <img src={TargetIcon} alt="targetIcon" className="target-icon" />
      <p className="target-icon-label">
        <FormattedMessage id="target.header" />
      </p>
      <form onSubmit={handleSubmit} className="create-target-form">
        {/* {status === REJECTED && <strong className="error">{error}</strong>} */}
        {getAllTopicsStatus === REJECTED && <strong className="error">{getAllTopicsError}</strong>}
        <div>
          <Input
            name="radius"
            type="number"
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
            options={topicsOptions}
            placeholder={intl.formatMessage(messages.topicPlaceholder)}
            {...selectProps(fields.topicId)}
            // disabled={getAllTopicsStatus !== FULFILLED}
          />
        </div>
        <button type="submit" className="">
          <FormattedMessage id="target.form.submit" />
        </button>
        {(getAllTopicsStatus === PENDING || createTargetStatus === PENDING) && <Loading />}
      </form>
    </>
  );
};

export default CreateTargetForm;
