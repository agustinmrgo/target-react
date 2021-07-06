import { createSlice } from '@reduxjs/toolkit';
import { getAllTargetsFulfilled } from 'state/actions/targetActions';

const initialState = {
  targets: []
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  extraReducers: {
    [getAllTargetsFulfilled]: (state, { payload }) => {
      state.targets = payload;
    }
  }
});

export default targetSlice.reducer;
