import { useMemo } from 'react';
import { configureStore, EnhancedStore, StateFromReducersMapObject } from '@reduxjs/toolkit';

import { uiSliceReducer } from './slices/ui';
import { featuresSliceReducer } from './slices/features';
import { configSliceReducer } from './slices/config';
import { headSliceReducer } from 'src/store/slices/head';
import { footerSliceReducer } from 'src/store/slices/footer';
import { translationsSliceReducer } from 'src/store/slices/translations';
import { overlaysSliceReducer } from 'src/store/slices/overlay';

let store: ReturnType<typeof createStore>;

const rootReducer = {
  ui: uiSliceReducer,
  features: featuresSliceReducer,
  config: configSliceReducer,
  head: headSliceReducer,
  footer: footerSliceReducer,
  translations: translationsSliceReducer,
  overlays: overlaysSliceReducer,
};

const createStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
  });
};

export const initializeStore = (preloadedState?: RootState): EnhancedStore => {
  let reuseStore = false;
  let _store = store ?? createStore(preloadedState);
  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState });
    reuseStore = true;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store || reuseStore) {
    store = _store;
  }

  return _store;
};

export type RootState = StateFromReducersMapObject<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function useStore(initialState: RootState): EnhancedStore {
  return useMemo(() => createStore(initialState), [initialState]);
}
