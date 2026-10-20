import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'theme';

function readStoredTheme() {
	try {
		const value = localStorage.getItem(STORAGE_KEY);

		return value === 'light' || value === 'dark' ? value : null;
	} catch {
		return null;
	}
}

function getSystemTheme() {
	const media = typeof window === 'undefined' ? null : window.matchMedia?.('(prefers-color-scheme: dark)');

	return media?.matches ? 'dark' : 'light';
}

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		mode: readStoredTheme() ?? getSystemTheme()
	},
	reducers: {
		toggleTheme(state) {
			state.mode = state.mode === 'dark' ? 'light' : 'dark';
		}
	}
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = state => state.theme.mode;

export default themeSlice.reducer;
