import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./colorsSlice";

const store = configureStore({
	reducer: {
		colors: colorsReducer,
	},
});

export default store;
