import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { normalizeAnalogues, normalizeGoodsList } from '@/features/parts/normalize.js';
import { parseBody } from '@/lib/parse.js';

export const API_URL = import.meta.env.VITE_FAVORIT_API_URL || 'http://api.favorit-parts.ru/hs/hsprice/';

export const API_KEY = import.meta.env.VITE_FAVORIT_KEY || '';

export const partsApi = createApi({
	reducerPath: 'partsApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: builder => ({
		getBrands: builder.query({
			query: number => ({
				url: '',
				params: {
					key: API_KEY,
					number
				}
			}),
			transformResponse: raw => normalizeGoodsList(parseBody(raw))
		}),
		getAnalogues: builder.query({
			query: ({ number, brand }) => ({
				url: '',
				params: {
					key: API_KEY,
					number,
					brand,
					analogues: 'on',
					info: 'on'
				}
			}),
			transformResponse: raw => normalizeAnalogues(parseBody(raw))
		})
	})
});

export const { useGetBrandsQuery, useGetAnaloguesQuery } = partsApi;
