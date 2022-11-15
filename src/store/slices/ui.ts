import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { DeviceType, DeviceOrientation } from 'src/hooks/useDeviceTypeWatcher';

type UiSliceType = {
  userAgent: string;
  isSubMenuOpen: boolean;
  userData: UserData;
  initialUrl: string;
  lang: string;
  country: string;
  deviceType: DeviceType;
  deviceOrientation: DeviceOrientation | null;
  previewRef: string;
};

type UserData = {
  csrf_form_key: string;
  customer_is_logged_in: boolean;
  mapped_store_id: string | number;
  minicartAmount: number;
  miniCartContent: string;
  total: number;
  total_for_simple_products: number;
  website_id: string;
  raf_page_visited?: boolean;
  show_refer_a_friend: string;
  newsletter_subscribed?: boolean;

  customer_data: {
    email?: string;
    email_hash?: string;
    id?: string;
    is_logged_in: boolean;
    status: string;
    tier: string;
  };
};

export const initialState: UiSliceType = {
  userAgent: '',
  isSubMenuOpen: false,
  userData: {
    csrf_form_key: '',
    customer_is_logged_in: false,
    mapped_store_id: '',
    minicartAmount: 0,
    miniCartContent: '',
    total: 0,
    total_for_simple_products: 0,
    website_id: '',
    show_refer_a_friend: '',
    customer_data: {
      is_logged_in: false,
      status: '',
      tier: '',
    },
  },
  initialUrl: '',
  lang: '',
  country: '',
  deviceType: 'mobile',
  deviceOrientation: null,
  previewRef: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUserAgent: (state, { payload }: PayloadAction<UiSliceType['userAgent']>) => {
      state.userAgent = payload;
    },
    openSubMenu: (state) => {
      state.isSubMenuOpen = true;
    },
    closeSubMenu: (state) => {
      state.isSubMenuOpen = false;
    },
    toggleSubMenu: (state) => {
      state.isSubMenuOpen = !state.isSubMenuOpen;
    },
    setUserData: (state, { payload }: PayloadAction<UserData>) => {
      state.userData = payload;
    },
    setInitialUrl: (state, { payload }: PayloadAction<string>) => {
      state.initialUrl = payload;
    },
    setLang: (state, { payload }: PayloadAction<string>) => {
      state.lang = (payload || '').replace(/\//g, '');
    },
    setCountry: (state, { payload }: PayloadAction<string>) => {
      state.country = (payload || '').toLowerCase();
    },
    setDeviceType: (state, action: PayloadAction<DeviceType>) => {
      state.deviceType = action.payload;
    },
    setDeviceOrientation: (state, action: PayloadAction<DeviceOrientation>) => {
      state.deviceOrientation = action.payload;
    },
    setCartAmount: (state, action: PayloadAction<number>) => {
      state.userData.minicartAmount = action.payload;
    },
    setMiniCartContent: (state, { payload }: PayloadAction<string>) => {
      state.userData.miniCartContent = payload || '';
    },
    setPreviewRef: (state, { payload }: PayloadAction<string>) => {
      state.previewRef = payload;
    },
  },
});

export const uiSliceReducer = uiSlice.reducer;

export const {
  setUserAgent,
  openSubMenu,
  closeSubMenu,
  toggleSubMenu,
  setUserData,
  setInitialUrl,
  setLang,
  setCountry,
  setDeviceType,
  setDeviceOrientation,
  setCartAmount,
  setMiniCartContent,
  setPreviewRef,
} = uiSlice.actions;

export const uiSelector = (state: RootState): UiSliceType => state.ui;

export const selectUserAgent = (state: RootState): UiSliceType['userAgent'] => state.ui.userAgent;

export const selectIsLighthouse = (state: RootState): boolean => !!selectUserAgent(state).match(/lighthouse/i);

export const selectLanguage = (state: RootState): string => state.ui.lang;

export const selectCountry = (state: RootState): string => state.ui.country;

export const selectDeviceType = (state: RootState): DeviceType => state.ui.deviceType;

export const selectDeviceOrientation = (state: RootState): DeviceOrientation | null => state.ui.deviceOrientation;

export const selectInitialUrl = (state: RootState): string => state.ui.initialUrl;

export const selectFormKey = (state: RootState): string => state.ui.userData.csrf_form_key;

export const selectUserEmail = (state: RootState): string | undefined => state.ui.userData.customer_data.email;

export const selectCartAmount = (state: RootState): number => state.ui.userData.minicartAmount;

export const selectWebsiteId = (state: RootState): string => state.ui.userData.website_id;

export const selectMiniCartContent = (state: RootState): string => state.ui.userData.miniCartContent;

export const selectPreviewRef = (state: RootState): string => state.ui.previewRef;

export const selectReferLink = (state: RootState): string => state.ui.userData.show_refer_a_friend;

export const selectIsLoggedIn = (state: RootState): boolean => state.ui.userData.customer_data.is_logged_in;

export const selectIsNewsletterSubscribed = (state: RootState): boolean | undefined =>
  state.ui.userData.newsletter_subscribed;
