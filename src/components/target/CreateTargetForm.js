import React, { useEffect } from 'react';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import Navbar from 'components/common/Navbar';
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
import { createTarget, setCurrentTargetCoordinates } from 'state/actions/targetActions';
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
  const setClickedCoordenates = useDispatch(setCurrentTargetCoordinates);
  const { topics } = useTopic();
  const validator = useValidation(targetValidations);

  useEffect(() => {
    getAllTopicsRequest();
  }, [getAllTopicsRequest]);

  const clearCurrentTargetCoordinates = () => setClickedCoordenates({ lat: 0, lng: 0 });

  const areCurrentTargetCoordinatesValid =
    currentTargetCoordinates &&
    currentTargetCoordinates.lat !== 0 &&
    currentTargetCoordinates.lng !== 0;

  const handleCreateSubmit = formData => {
    if (areCurrentTargetCoordinatesValid) {
      createTargetRequest({ ...currentTargetCoordinates, ...formData });
      clearCurrentTargetCoordinates();
    }
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
      onSubmit: handleCreateSubmit,
      validator,
      validateOnBlur: true
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
      <Navbar className="navbar-blue" title={<FormattedMessage id="target.navbar" />} />
      <img src={TargetIcon} alt="targetIcon" className="target-icon" />
      <p className="target-icon-label">
        <FormattedMessage id="target.header" />
      </p>
      <form onSubmit={handleSubmit} className="create-target-form">
        {createTargetStatus === REJECTED && <strong className="error">{createTargetError}</strong>}
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
            name="topicId"
            label={intl.formatMessage(messages.topic)}
            isSearchable={false}
            options={topicsOptions}
            placeholder={intl.formatMessage(messages.topicPlaceholder)}
            {...selectProps(fields.topicId)}
          />
        </div>
        <button type="submit" className="">
          <FormattedMessage id="target.form.submit" />
        </button>
        {!areCurrentTargetCoordinatesValid && (
          <div className="span-error">
            <FormattedMessage id="coordinates.presence" />
          </div>
        )}
        {(getAllTopicsStatus === PENDING || createTargetStatus === PENDING) && <Loading />}
      </form>
    </>
  );
};

export default CreateTargetForm;
