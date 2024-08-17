import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '@models/data.model';

interface DataState {
  data: Data | null;
}

const initialState: DataState = {
  data: null,
};

export const controlledSlice = createSlice({
  name: 'controlled',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Data>) => {
      state.data = action.payload;
    },
  },
});

export const controlledReducer = controlledSlice.reducer;
export const controlledActions = controlledSlice.actions;
