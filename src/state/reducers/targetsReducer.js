import { createSlice } from '@reduxjs/toolkit';
import { getAllTargetsFulfilled, setCurrentTargetCoordinates } from 'state/actions/targetActions';

const initialState = {
  targets: [],
  currentTargetCoordinates: { lat: 0, lng: 0 }
};

const targetSlice = createSlice({
  name: 'target',
  initialState,
  extraReducers: {
    [getAllTargetsFulfilled]: (state, { payload }) => {
      state.targets = payload;
    },
    [setCurrentTargetCoordinates]: (state, { payload }) => {
      state.currentTargetCoordinates = payload;
    }
  }
});

export default targetSlice.reducer;
