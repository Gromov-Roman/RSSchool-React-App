import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '@models/data.model';

interface DataState {
  data: Data[];
}

const initialState: DataState = {
  data: [],
};

export const controlledSlice = createSlice({
  name: 'controlled',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
      action.payload.id = Math.random();
      state.data.push(action.payload);
    },
  },
});

export const controlledReducer = controlledSlice.reducer;
export const controlledActions = controlledSlice.actions;
