import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { defaultMainConfig } from 'src/utils/config/default';
import { MainConfig } from 'src/utils/config';

const configSlice = createSlice({
  name: 'config',
  initialState: defaultMainConfig,
  reducers: {
    setMainConfig: (state, { payload }: PayloadAction<MainConfig>) => {
      state = payload;
      return state;
    },
  },
});

export const configSliceReducer = configSlice.reducer;

export const { setMainConfig } = configSlice.actions;

export const selectConfig = (state: RootState): MainConfig => state.config;

export const selectCurrentStoreId = (state: RootState): MainConfig['current_store_id'] => state.config.current_store_id;

export const selectDefaultLanguage = (state: RootState): MainConfig['defaultLanguage'] =>
  selectConfig(state).defaultLanguage;
