import { Action, combineSlices, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { userSlice } from './features/user/user-slice';
import { authSlice } from './features/auth/auth-slice';

const rootReducer = combineSlices(userSlice, authSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
