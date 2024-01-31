import React from "react";
import { render } from "@testing-library/react";
import { PalettePreview } from "../components/PalettePreview";

import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: jest.fn(),
}));

describe("should render PalettePreview component", () => {
	const colors = [
		{ id: 1, hexCode: "#000", name: "Black" },
		{ id: 2, hexCode: "#fff", name: "White" },
		{ id: 3, hexCode: "#00ff00", name: "Green" },
	];

	it("renders PalettePreview component with colors", () => {
		const { getByText } = render(<PalettePreview colors={colors} />);

		colors.forEach((color) => {
			expect(getByText(color.name)).toBeInTheDocument();
		});
	});
	it("renders color circles with proper background", () => {
		const component = render(<PalettePreview colors={colors} />);
		const circles = component.getAllByTestId("round-circle-lg");

		colors.forEach((color, i) => {
			expect(circles[i]).toHaveStyle(`background: ${color.hexCode}`);
		});
	});
});
