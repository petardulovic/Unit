import React from "react";
import { useDispatch } from "react-redux";
import { setActiveColor } from "../slice/colorsSlice";
import PropTypes from "prop-types";

export const PalettePreview = ({ colors }) => {
	const dispatch = useDispatch();

	return (
		<div className="palette-container">
			{colors.map((color) => (
				<div
					key={color.id}
					className="palette-color-container"
					onClick={() => dispatch(setActiveColor(color.hexCode))}>
					<div
						data-testid="round-circle-lg"
						className="rounded-div lg"
						style={{ background: color.hexCode }}></div>
					<div className="sub-text">{color.name}</div>
				</div>
			))}
		</div>
	);
};

PalettePreview.propTypes = {
	colors: PropTypes.array.isRequired,
};
