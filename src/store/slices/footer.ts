import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { NewsletterResponse } from 'lib/api/content/getNewsletter/Types';
import { FooterResponseType } from 'lib/api/content/getFooter/Types';

type State = {
  footer?: FooterResponseType;
  newsletter?: NewsletterResponse;
};

const initialState: State = {
  footer: undefined,
  newsletter: undefined,
};

const footerSlice = createSlice({
  name: 'footer',
  initialState: initialState,
  reducers: {
    setFooterData: (state, { payload }: PayloadAction<FooterResponseType>) => {
      state.footer = payload;
      return state;
    },
    setNewsletterData: (state, { payload }: PayloadAction<NewsletterResponse>) => {
      state.newsletter = payload;
      return state;
    },
  },
});

export const footerSliceReducer = footerSlice.reducer;

export const { setFooterData, setNewsletterData } = footerSlice.actions;

export const selectFooter = (state: RootState): FooterResponseType | undefined => {
  return state.footer.footer;
};

export const selectNewsletter = (state: RootState): NewsletterResponse | undefined => {
  return state.footer.newsletter;
};
