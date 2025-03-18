import { twMerge } from "tailwind-merge";

const WindowRows = ({ index, style, data }) => {
	return (
		<div
			style={style}
			className={twMerge(
				index % 2 ? "bg-bgThird dark:bg-bgThirdDark" : "bg-bgPrimary dark:bg-bgPrimaryDark",
				"border-bgSecondary dark:border-bgSecondaryDark flex border-b",
			)}
		>
			{data[index]}
		</div>
	);
};

export default WindowRows;
