import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '@models/data.model';

interface DataState {
  data: Data | null;
}

const initialState: DataState = {
  data: null,
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Data>) => {
      state.data = action.payload;
    },
  },
});

export const uncontrolledReducer = uncontrolledSlice.reducer;
export const uncontrolledActions = uncontrolledSlice.actions;
