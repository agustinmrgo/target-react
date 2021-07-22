import React, { useEffect } from 'react';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { REJECTED, PENDING } from 'constants/actionStatusConstants';
import routes from 'constants/routesPaths';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import {
  useStatus,
  useForm,
  useTextInputProps,
  useSelectProps,
  useTarget,
  useTopic,
  useDispatch
} from 'hooks';
import { createTarget } from 'state/actions/targetActions';
import { getAllTopics } from 'state/actions/topicActions';
import TargetIcon from 'assets/target_icon.svg';
import BackArrowIcon from 'assets/back_arrow_icon.svg';

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
  const history = useHistory();

  useEffect(() => {
    getAllTopicsRequest();
  }, [getAllTopicsRequest]);

  const handleCreateSubmit = formData => {
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

  const handleBackClick = () => history.push(routes.index);

  return (
    <>
      <div className="top-nav">
        <div className="back-arrow-icon" onClick={handleBackClick}>
          <img src={BackArrowIcon} alt="backArrowIcon" />
        </div>
        <h3 className="nav-title">
          <FormattedMessage id="target.navbar" />
        </h3>
      </div>
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
            name="topic"
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
        {(getAllTopicsStatus === PENDING || createTargetStatus === PENDING) && <Loading />}
      </form>
    </>
  );
};

export default CreateTargetForm;
