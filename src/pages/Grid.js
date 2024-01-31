import React from "react";
import { ColorList } from "../components/ColorList";
import { ColorMe } from "../components/ColorMe";
import { ColorCreator } from "../components/ColorCreator";

const Grid = () => {
	return (
		<div className="flex">
			<div className="w-1/4 p-4 bg-[#442727] h-screen max-h-screen text-[#ffc18c]">
				<ColorCreator />
			</div>
			<div className="w-1/4 p-4 bg-[#ffc18c] text-[#6e4040] h-screen font-semibold">
				<ColorList />
			</div>
			<div className="w-1/2 p-4 bg-[#e7cfb4] text-[#6e4040] h-screen">
				<h2 className="h2-main">
					Experiment with your colors by clicking on any face part
				</h2>

				<ColorMe />
			</div>
		</div>
	);
};

export default Grid;
