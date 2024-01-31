import { createSlice } from "@reduxjs/toolkit";

const colorsSlice = createSlice({
	name: "colors",
	initialState: {
		palette: [],
		activeColor: "",
	},
	reducers: {
		addColor: (state, action) => {
			state.palette.push(action.payload);
		},
		removeColor: (state, action) => {
			state.palette = state.palette.filter(
				(color) => color.id !== action.payload
			);
		},
		resetColors: (state) => {
			state.palette = [];
		},
		setActiveColor: (state, action) => {
			console.log(action.payload);
			state.activeColor = action.payload;
		},
	},
});

export const { addColor, removeColor, resetColors, setActiveColor } =
	colorsSlice.actions;
export const selectColors = (state) => state.colors.list;
export default colorsSlice.reducer;
