import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '@models/data.model';

interface DataState {
  data: Data[];
}

const initialState: DataState = {
  data: [],
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
  },
});

export const uncontrolledReducer = uncontrolledSlice.reducer;
export const uncontrolledActions = uncontrolledSlice.actions;
