import React from "react";
import { getByTestId, render, fireEvent, screen } from "@testing-library/react";
import { ColorCreator } from "../components/ColorCreator";

import "@testing-library/jest-dom";
import { Provider } from "react-redux";

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: jest.fn(),
}));

import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
describe("should render ColorCreator component", () => {
	const store = mockStore({
		colors: {
			palette: [{ id: 1, hexCode: "#000", name: "Black" }],
		},
	});

	it("should render ColorCreator", () => {
		const { getByText } = render(
			<Provider store={store}>
				<ColorCreator />{" "}
			</Provider>
		);

		expect(getByText("Create your color:")).toBeInTheDocument();
		expect(getByText("Or type the desired hex code:")).toBeInTheDocument();
		expect(getByText("Preview Color:")).toBeInTheDocument();
		expect(getByText("Name your color:")).toBeInTheDocument();
	});

	it("should display error if color name already exists", () => {
		render(
			<Provider store={store}>
				<ColorCreator />{" "}
			</Provider>
		);

		const addBtn = screen.getByTestId("add-btn");
		const nameInput = screen.getByTestId("name-input");
		const hexInput = screen.getByTestId("hex-input");

		fireEvent.change(nameInput, { target: { value: "Black" } });
		fireEvent.change(hexInput, { target: { value: "000" } });
		fireEvent.click(addBtn);

		expect(nameInput).toBeInTheDocument();
		expect(hexInput).toBeInTheDocument();
		expect(nameInput).toHaveValue("Black");
		expect(hexInput).toHaveValue("000");
		expect(screen.getByText("Name already exists")).toBeInTheDocument();
	});
});
