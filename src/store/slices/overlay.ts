import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqueId from 'lodash.uniqueid';
import { RootState } from '..';

export type OverlayType = 'notification' | 'modal';

export type Variants = 'default' | 'success' | 'error';

export type NotificationType = {
  uid?: string | undefined;
  expirationDuration?: number | false;
  type: OverlayType;
  variant: Variants;
  message?: string;
};

export type ModalType = {
  uid?: string | undefined;
  expirationDuration?: number | false;
  type: OverlayType;
  variant: Variants;
  title?: string;
  message?: string;
  html?: {
    content: string;
    className?: string;
  };
};

export type Overlay = NotificationType | ModalType;

export type Overlays = Overlay[];

const initialState = [] as Overlays;

const overlaysSlice = createSlice({
  name: 'overlays',
  initialState,
  reducers: {
    showOverlay: (state, { payload }: PayloadAction<Overlay>) => {
      state.push({ ...payload, uid: uniqueId() });
    },
    hideOverlay: (state, { payload }: PayloadAction<Overlay['uid']>) => {
      return state.filter((overlay) => overlay.uid !== payload);
    },
  },
});

export const overlaysSliceReducer = overlaysSlice.reducer;

export const { showOverlay, hideOverlay } = overlaysSlice.actions;

export const selectOverlays = (state: RootState): Overlays => state.overlays;
