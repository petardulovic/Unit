import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { addColor } from "../slice/colorsSlice";

export const ColorCreator = () => {
	const colors = useSelector((state) => state.colors.palette);
	const [background, setBackground] = useState("#fff");
	const [colorName, setColorName] = useState("");
	const [error, setError] = useState(false);
	const [realName, setRealName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [hexCode, setHexCode] = useState("");
	const [hexErr, setHexErr] = useState(false);
	const dispatch = useDispatch();

	const handleChangeComplete = (color) => {
		setBackground(color.hex);
	};

	const addToPalette = () => {
		if (colors.find((color) => color.name === colorName)) {
			setError("Name already exists");
		} else if (colorName && background) {
			dispatch(
				addColor({
					name: colorName,
					hexCode: background.includes("#") ? background : `#${background}`,
					id: colorName,
				})
			);
		} else {
			setError("Name is required");
		}
	};

	const handleGetName = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`https://www.thecolorapi.com/id?hex=${background.replace("#", "")}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setRealName(data.name.value);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error("Error fetching data:", error);
		}
	};

	const checkIfHex = (hex) => {
		const regex = /^#(?:[0-9a-f]{3}){1,2}$/i;
		return regex.test(hex);
	};

	const checkIfHexCharacter = (char) => {
		const regex = /^[0-9a-f]{1}$/;

		return regex.test(char);
	};

	const handleHexCodeChange = (e) => {
		const hex = e.target.value;

		if (checkIfHexCharacter(hex[hex.length - 1]) && hex.length <= 6) {
			setHexCode(hex);
			if (
				(hex.length === 3 || hex.length === 6) &&
				checkIfHex(`#${hex.trim()}`)
			) {
				setBackground(`#${hex.trim()}`);
				setHexErr(false);
			} else {
				setHexErr(true);
			}
		}

		if (hex.length === 0) {
			setHexCode("");
			setHexErr(false);
		}
	};

	return (
		<>
			<div className="color-picker-container">
				<h2 className="h2-main">Create your color:</h2>
				<SketchPicker
					color={background}
					onChangeComplete={(color) => handleChangeComplete(color)}
				/>
				Or type the desired hex code:
				<input
					data-testid="hex-input"
					className="input-name "
					value={hexCode}
					type="text"
					onChange={(e) => handleHexCodeChange(e)}
				/>
				{hexErr && <p className="error-text">Invalid hex code</p>}
				<p>Preview Color:</p>
				<div
					className="w-56 h-20 mt-3 border border-[#ffc18c] rounded-md"
					style={{ background: background }}></div>
				<span className="color-name-container">
					<div>
						<label htmlFor="colorName">Name your color:</label>
						<input
							data-testid="name-input"
							id="colorName"
							className={
								error
									? "error-name-input color-naming"
									: "input-name color-naming"
							}
							value={colorName}
							onChange={(e) => {
								setColorName(e.target.value);
								if (error) setError(false);
							}}
							type="text"
							placeholder="Color name"
						/>
					</div>
					{error && <p className="error-text">{error}</p>}
					{realName && (
						<span className="real-name-container">
							Real name: {realName}{" "}
							<button
								onClick={() => {
									setColorName(realName);
									setError(false);
								}}
								className="btn-light use-it sm">
								Use it!
							</button>
						</span>
					)}
					<span>
						<button onClick={handleGetName} className="btn-dark">
							{isLoading ? (
								<div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
							) : (
								"Get real color name"
							)}
						</button>

						<button
							data-testid="add-btn"
							onClick={addToPalette}
							className="btn-light add-to-palette">
							Add to palette
						</button>
					</span>
				</span>
			</div>
		</>
	);
};
