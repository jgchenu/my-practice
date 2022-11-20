import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '$src/types';

export interface AppState {
  user: Partial<User>;
  count: number;
}

const initialState: AppState = {
  user: {},
  count: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...action.payload };
    },
    increase: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrease: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, increase, decrease } = appSlice.actions;

export const appReducer = appSlice.reducer;
