import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Store, StoreSwitcherCountry, StoreSwitcherResponseType } from 'lib/api/content/getStoreSwitcher/Types';
import {
  HeaderResponseType,
  HeaderSecondLevelMenuSliceType,
  HeaderServiceMenuSliceType,
  HeaderSupportMenuSliceType,
  HeaderTopMenuSliceType,
} from 'lib/api/content/getHeader/Types';

type HeadDataSlice = {
  header: HeaderResponseType;
  storeSwitcher: StoreSwitcherResponseType;
  isStoreSwitcherOpen: boolean;
  isHeaderHidden: boolean;
};

const initialState: HeadDataSlice = {
  header: {
    mainMenu: [],
    secondLevelMenu: [],
  },
  storeSwitcher: [],
  isStoreSwitcherOpen: false,
  isHeaderHidden: false,
};

const headSlice = createSlice({
  name: 'head',
  initialState,
  reducers: {
    setHeadData: (state, action: PayloadAction<HeaderResponseType>) => {
      state.header = action.payload;
    },
    setStoreSwitcherData: (state, action: PayloadAction<StoreSwitcherResponseType>) => {
      state.storeSwitcher = action.payload;
    },
    setStoreSwitcherIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isStoreSwitcherOpen = action.payload;
    },
    setStoreHeaderHidden: (state, action: PayloadAction<boolean>) => {
      state.isHeaderHidden = action.payload;
    },
  },
});

export const headSliceReducer = headSlice.reducer;

export const { setHeadData, setStoreSwitcherData, setStoreSwitcherIsOpen, setStoreHeaderHidden } = headSlice.actions;

export const selectHeaderTopMenu = (state: RootState): HeaderTopMenuSliceType =>
  state.head.header.mainMenu.find((i) => i.slice_type === 'header_top_menu') as HeaderTopMenuSliceType;

export const selectHeaderSupportMenu = (state: RootState): HeaderSupportMenuSliceType =>
  state.head.header.mainMenu.find((i) => i.slice_type === 'support_menu') as HeaderSupportMenuSliceType;

export const selectHeaderServiceMenu = (state: RootState): HeaderServiceMenuSliceType =>
  state.head.header.mainMenu.find((i) => i.slice_type === 'service_menu') as HeaderServiceMenuSliceType;

export const selectHeaderSecondLevelMenu = (state: RootState): HeaderSecondLevelMenuSliceType[] =>
  state.head.header.secondLevelMenu;

export const selectIsStoreSwitcherOpen = (state: RootState): boolean => state.head.isStoreSwitcherOpen;

export const selectIsHeaderHidden = (state: RootState): boolean => state.head.isHeaderHidden;

export const selectCurrentCountry = (state: RootState): StoreSwitcherCountry | undefined => {
  const currentStoreId = state.config.current_store_id;
  // eslint-disable-next-line eqeqeq
  return state.head.storeSwitcher.find((country) => country.stores.find((s) => s.store_id == currentStoreId));
};

export const selectCurrentStore = (state: RootState): Store | undefined => {
  const currentStoreId = state.config.current_store_id;
  // eslint-disable-next-line eqeqeq
  return selectCurrentCountry(state)?.stores.find((s) => s.store_id == currentStoreId);
};

export const selectStoreSwitcherCountries = (state: RootState): StoreSwitcherCountry[] => {
  return state.head.storeSwitcher;
};
