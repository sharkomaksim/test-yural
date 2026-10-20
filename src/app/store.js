import { configureStore } from '@reduxjs/toolkit';

import { partsApi } from '../features/parts/partsApi.js';
import partsReducer from '../features/parts/partsSlice.js';

export const store = configureStore({
	reducer: {
		parts: partsReducer,
		[partsApi.reducerPath]: partsApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(partsApi.middleware)
});
