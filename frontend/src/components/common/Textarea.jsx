import { Textarea as TextareaHUI } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const Textarea = ({
	value,
	rows,
	placeholder,
	onChange,
	onBlur,
	onFocus,
	autoComplete = "off",
	spellCheck = false,
	autoFocus = false,
	readOnly = false,
	className,
	borderStyle = "border",
	roundedStyle = "rounded-sm",
	ref,
}) => {
	return (
		<TextareaHUI
			className={twMerge(
				"border-borderSecondary bg-bgPrimary outline-bgCheckboxSelected placeholder:text-midGray dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:outline-bgCheckboxSelectedDark dark:placeholder:text-midGrayDark w-full rounded-sm px-1.5 py-1 focus:outline",
				className,
				borderStyle,
				roundedStyle,
			)}
			rows={rows}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			autoFocus={autoFocus}
			onBlur={onBlur}
			onFocus={onFocus}
			readOnly={readOnly}
			autoComplete={autoComplete}
			spellCheck={spellCheck}
			ref={ref}
		/>
	);
};

export default Textarea;
