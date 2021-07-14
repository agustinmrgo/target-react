import { createSlice } from '@reduxjs/toolkit';
import { getAllTopicsFulfilled } from 'state/actions/topicActions';

const initialState = {
  topics: []
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  extraReducers: {
    [getAllTopicsFulfilled]: (state, { payload }) => {
      state.topics = payload;
    }
  }
});

export default topicSlice.reducer;
