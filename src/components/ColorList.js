import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeColor } from "../slice/colorsSlice";
import { PalettePreview } from "./PalettePreview";
import Search from "../assets/search-interface-symbol.png";
import { ListPreview } from "./ListPreview";

export const ColorList = () => {
	const colors = useSelector((state) => state.colors.palette);
	const [searchTerm, setSearchTerm] = useState("");
	const [colorsToDisplay, setColorsToDisplay] = useState([]);
	const [previewType, setPreviewType] = useState("list");
	const disaptch = useDispatch();

	useEffect(() => {
		if (!searchTerm) setColorsToDisplay(colors);
	}, [colors]);

	useEffect(() => {
		if (!searchTerm) {
			setColorsToDisplay(colors);
		} else {
			setColorsToDisplay(
				colors.filter(
					(color) =>
						color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						color.hexCode.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}
	}, [searchTerm, colors]);

	const removeItem = (id) => {
		disaptch(removeColor(id));
	};

	return (
		<>
			<h2 className="h2-main">Your palette:</h2>
			<span className="search-input-container">
				<div className="relative right-0">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<img src={Search} className="search-bar-image" />
					</div>
					<input
						type="search"
						id="default-search"
						className="block w-[75%] p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#442727] focus:border-[#442727] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none font-normal"
						placeholder="Search"
						required
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</span>
			<div className="mt-4 mb-4">
				{" "}
				<label htmlFor="select">Select preview:</label>
				<select
					className="ml-2"
					onChange={(e) => setPreviewType(e.target.value.toLowerCase())}
					id="select">
					<option id="list">List</option>
					<option id="palette">Palette</option>
				</select>
			</div>

			{previewType === "list" ? (
				<ListPreview
					colorsToDisplay={colorsToDisplay}
					removeItem={(id) => removeItem(id)}
				/>
			) : (
				<PalettePreview colors={colorsToDisplay} />
			)}
		</>
	);
};
