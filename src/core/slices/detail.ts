import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '@models/result.model';

interface DetailState {
  detail: Result | undefined;
  isFetching: boolean;
}

const initialState: DetailState = {
  detail: undefined,
  isFetching: false,
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetail: (state, action: PayloadAction<Result | undefined>) => {
      state.detail = action.payload;
      state.isFetching = false;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

export const detailActions = detailSlice.actions;
