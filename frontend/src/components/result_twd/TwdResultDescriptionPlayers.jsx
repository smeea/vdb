import { twMerge } from "tailwind-merge";
import PeopleFill from "@icons/people-fill.svg?react";

const TwdResultDescriptionPlayers = ({ players }) => {
	return (
		<div
			className={twMerge(
				"text-fgSecondary dark:text-fgSecondaryDark flex items-center justify-center gap-1 rounded-md border-dashed text-lg",
				players >= 30
					? "border-fgSecondary dark:border-fgSecondaryDark border-[3px] font-bold"
					: "border-borderPrimary dark:border-borderPrimaryDark border-2",
			)}
		>
			<PeopleFill />
			<div>{players}</div>
		</div>
	);
};

export default TwdResultDescriptionPlayers;
