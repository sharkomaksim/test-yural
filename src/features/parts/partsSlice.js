import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	input: '',
	query: '',
	selectedPart: null
};

const partsSlice = createSlice({
	name: 'parts',
	initialState,
	reducers: {
		setInput(state, action) {
			if (state.input === action.payload) {
				return;
			}

			state.input = action.payload;
			state.selectedPart = null;
		},
		setQuery(state, action) {
			if (state.query === action.payload) {
				return;
			}

			state.query = action.payload;
			state.selectedPart = null;
		},
		selectPart(state, action) {
			state.selectedPart = action.payload;
		}
	}
});

export const { setInput, setQuery, selectPart } = partsSlice.actions;

export const selectInput = state => state.parts.input;

export const selectQuery = state => state.parts.query;

export const selectSelectedPart = state => state.parts.selectedPart;

export default partsSlice.reducer;
