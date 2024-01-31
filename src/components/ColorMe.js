import React from "react";
import "../styles/face.css"; // Import the CSS styles
import { useSelector } from "react-redux";

export const ColorMe = () => {
	const activeColor = useSelector((state) => state.colors.activeColor);
	console.log(activeColor);

	const handleColoring = (e) => {
		if (activeColor)
			document.getElementById(e.target.id).style.background = activeColor;
		document.getElementById(e.target.id).style.background = activeColor;
	};

	return (
		<div id="face" onClick={(e) => handleColoring(e)} className="face">
			<div
				onClick={(e) => handleColoring(e)}
				id="leftEye"
				className="eye"></div>
			<div
				onClick={(e) => handleColoring(e)}
				id="rightEye"
				className="eye"
				style={{ left: "60%" }}></div>
			<div
				onClick={(e) => handleColoring(e)}
				id="mouth"
				className="mouth"></div>
			<div onClick={(e) => handleColoring(e)} id="nose" className="nose"></div>
			<div
				onClick={(e) => handleColoring(e)}
				id="eyebrow-left"
				className="eyebrow eyebrow-left"></div>
			<div
				onClick={(e) => handleColoring(e)}
				id="eyebrow eyebrow-right"
				className="eyebrow eyebrow-right"></div>
		</div>
	);
};
