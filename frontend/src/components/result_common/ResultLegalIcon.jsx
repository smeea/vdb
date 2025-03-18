import { twMerge } from "tailwind-merge";
import Exclamation from "@icons/exclamation-triangle.svg?react";
import Hammer from "@icons/hammer.svg?react";
import LightningChargeFill from "@icons/lightning-charge-fill.svg?react";
import { BANNED, DEFAULT, PLAYTEST } from "@/constants";

const ResultLegalIcon = ({ value, type = DEFAULT, className }) => {
	const title = {
		[PLAYTEST]: "Playtest",
		[BANNED]: `Banned in ${value}`,
		[DEFAULT]: "",
	};

	const icons = {
		[PLAYTEST]: (
			<LightningChargeFill className="inline" width="15" height="15" viewBox="0 0 16 16" />
		),
		[BANNED]: <Hammer className="inline" width="15" height="15" viewBox="0 0 16 16" />,
		[DEFAULT]: <Exclamation width="15" height="15" viewBox="0 0 16 16" />,
	};

	return (
		<div
			className={twMerge(
				"text-fgRed dark:text-fgRedDark inline-flex items-center whitespace-nowrap",
				className,
			)}
			title={title[type]}
		>
			{icons[type]}
		</div>
	);
};

export default ResultLegalIcon;
