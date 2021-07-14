import topicService from 'services/topicService';
import parseError from 'utils/parseError';
import createAsyncThunk from 'utils/createAsyncThunk';

export const getAllTopics = createAsyncThunk('topic/getAll', async () => {
  try {
    const {
      data: { topics }
    } = await topicService.getAllTopics();
    return topics;
  } catch ({ response: { topics } }) {
    throw parseError(topics);
  }
});

export const { fulfilled: getAllTopicsFulfilled, rejected: getAllTopicsRejected } = getAllTopics;
