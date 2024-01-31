import React from "react";
import Remove from "../assets/remove.png";
import PropTypes from "prop-types";

export const ListPreview = ({ colorsToDisplay, removeItem }) => {
	return (
		<ul role="list" className="divide-y  color-ul">
			{colorsToDisplay.map((color, i) => (
				<li key={i} className="list-item-palette">
					<span
						className="rounded-div"
						style={{ background: color.hexCode }}></span>
					<span className="sub-text color-name">{color.name}</span>
					<span className="list-item-palette commands">
						<img
							onClick={() => removeItem(color.id)}
							src={Remove}
							className="h-5 w-5 cursor-pointer"
						/>
					</span>
				</li>
			))}
		</ul>
	);
};

ListPreview.propTypes = {
	colorsToDisplay: PropTypes.array.isRequired,
	removeItem: PropTypes.func.isRequired,
};
