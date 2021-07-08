import { createSlice } from '@reduxjs/toolkit';
import {
  getAllTargetsFulfilled,
  getAllTargetsPending,
  createTargetFulfilled,
  createTargetPending
} from 'state/actions/targetActions';

const initialState = {
  targets: [],
  getStatus: 'idle',
  createStatus: 'idle'
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  extraReducers: {
    [getAllTargetsFulfilled]: (state, { payload }) => {
      state.targets = payload;
      state.getStatus = 'fulfilled';
    },
    [getAllTargetsPending]: state => {
      state.getStatus = 'pending';
    },
    [createTargetFulfilled]: state => {
      state.createStatus = 'fulfilled';
    },
    [createTargetPending]: state => {
      state.createStatus = 'pending';
    }
  }
});

export default targetSlice.reducer;
