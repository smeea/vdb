import { twMerge } from "tailwind-merge";

const Header = ({ className, children }) => {
	return (
		<div
			className={twMerge(
				"bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark flex min-h-[38px] items-center justify-between",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default Header;
