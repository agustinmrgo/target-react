import { createSlice } from '@reduxjs/toolkit';
import { getAllTargetsFulfilled, getAllTargetsPending } from 'state/actions/targetActions';

const initialState = {
  targets: [],
  status: 'idle'
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  extraReducers: {
    [getAllTargetsFulfilled]: (state, { payload }) => {
      state.targets = payload;
      state.status = 'fulfilled';
    },
    [getAllTargetsPending]: state => {
      state.status = 'pending';
    }
  }
});

export default targetSlice.reducer;
