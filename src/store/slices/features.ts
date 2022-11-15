import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { defaultFeatures } from 'src/utils/features/default';
import { Features, FeatureValue } from 'src/utils/features';

const featuresSlice = createSlice({
  name: 'features',
  initialState: defaultFeatures,
  reducers: {
    setFeatures: (state, { payload }: PayloadAction<Features>) => {
      state = payload;
      return state;
    },
  },
});

export const featuresSliceReducer = featuresSlice.reducer;

export const { setFeatures } = featuresSlice.actions;

export const featuresSelector = (state: RootState): Features => {
  return state.features;
};

export const selectIsHomeEnabled = (state: RootState): FeatureValue | undefined => state.features['home-page'];

export const selectIsInterestPageEnabled = (state: RootState): FeatureValue | undefined => state.features['ilp'];
