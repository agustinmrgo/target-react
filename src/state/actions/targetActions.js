import targetService from 'services/targetService';
import parseError from 'utils/parseError';
import createAsyncThunk from 'utils/createAsyncThunk';

export const getAllTargets = createAsyncThunk('target/getAll', async () => {
  try {
    const {
      data: { targets }
    } = await targetService.getAllTargets({ page: 1 });
    return targets;
  } catch ({ response: { targets } }) {
    throw parseError(targets);
  }
});

export const { fulfilled: getAllTargetsFulfilled, rejected: getAllTargetsRejected } = getAllTargets;
