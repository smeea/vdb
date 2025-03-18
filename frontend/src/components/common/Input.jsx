import { twMerge } from "tailwind-merge";

const Input = ({
	name,
	value,
	defaultValue,
	placeholder,
	onChange,
	onBlur,
	id,
	onFocus,
	required = false,
	type = "text",
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
		<input
			className={twMerge(
				"border-borderSecondary bg-bgPrimary outline-bgCheckboxSelected placeholder:text-midGray dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:outline-bgCheckboxSelectedDark dark:placeholder:text-midGrayDark min-h-[42px] w-full px-2 focus:outline",
				borderStyle,
				roundedStyle,
				className,
			)}
			placeholder={placeholder}
			type={type}
			name={name}
			autoComplete={autoComplete}
			spellCheck={spellCheck}
			value={value}
			defaultValue={defaultValue}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			autoFocus={autoFocus}
			disabled={readOnly}
			required={required}
			id={id}
			ref={ref}
		/>
	);
};

export default Input;
