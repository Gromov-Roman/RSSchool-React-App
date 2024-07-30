import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '@models/result.model';

interface FavoritesState {
  favorites: Result[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.setItem('favorites', '[]');
    },
    toggleFavorite: (state, action: PayloadAction<Result>) => {
      const index = state.favorites.findIndex(({ id }) => id === action.payload.id);

      if (index !== -1) {
        state.favorites?.splice(index, 1);
      } else {
        state.favorites?.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const favoritesActions = favoritesSlice.actions;
