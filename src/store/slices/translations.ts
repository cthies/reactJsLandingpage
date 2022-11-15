import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export type DictionaryType = {
  copy_button: string;
  clipboard_copied: string;

  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  service_bar_consultation_and_service: string;
  service_bar_free_shipping: string;
  service_bar_country_language: string;

  user_login: string;
  user_logout: string;
  user_forgot_your_password: string;
  user_new_customer: string;
  user_register_now: string;
  user_account: string;
  user_orders: string;
  user_subscriptions: string;
  user_refer: string;
  user_loyalty: string;
  user_balance: string;
  user_review: string;

  header_minimal_quality: string;
  header_minimal_security: string;
  header_minimal_guarantee: string;

  linklabel_seeall: string;

  search_products: string;
  search_recipes: string;
  search_button: string;
  search_error: string;
  search_no_result: string;
  placeholder_search: string;

  product_label: string;
  product_added_label: string;
  product_disabled: string;
  product_flavor: string;
  product_cta_title: string;

  error_email_format: string;
  error_field_required: string;

  error_generic: string;
};

type ReferAFriendDictionaryType = {
  title: string;
  subtitle: string;
  list_copy: string;
  list_share: string;
  list_discount: string;
};

export type Translations = {
  microcopy?: DictionaryType;
  refer_a_friend?: ReferAFriendDictionaryType;
};

const initialState = {} as Translations;

const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    setTranslations: (state, { payload }: PayloadAction<Translations>) => {
      state = { ...state, ...payload };
      return state;
    },
  },
});

export const translationsSliceReducer = translationsSlice.reducer;

export const { setTranslations } = translationsSlice.actions;

export const selectTranslations = (state: RootState): Translations => state.translations;
