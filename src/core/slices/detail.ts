import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '@models/result.model';

interface DetailState {
  detail: Result | undefined | null;
  isFetching: boolean;
}

const initialState: DetailState = {
  detail: null,
  isFetching: false,
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetail: (state, action: PayloadAction<Result | undefined | null>) => {
      state.detail = action.payload;
      state.isFetching = false;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

export const detailReducer = detailSlice.reducer;
export const detailActions = detailSlice.actions;
