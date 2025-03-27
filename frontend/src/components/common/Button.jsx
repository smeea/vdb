import { twMerge } from 'tailwind-merge';

const Button = ({
  borderStyle = 'border',
  children,
  className,
  disabled,
  id,
  name,
  noOutline,
  noPadding,
  onClick,
  roundedStyle = 'rounded-sm',
  tabIndex,
  title,
  type = 'button',
  value,
  variant = 'primary',
}) => {
  const mainStyle = {
    primary:
      'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark hover:border-borderPrimary dark:hover:border-borderPrimaryDark',
    secondary:
      'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border-borderThird dark:border-borderThirdDark hover:border-borderPrimary dark:hover:border-borderPrimaryDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark',
    third:
      'border-fgThird dark:border-lightGrayDark bg-borderSecondary dark:bg-borderPrimaryDark text-black dark:text-fgPrimaryDark',
    danger:
      'bg-bgError dark:bg-bgErrorDark hover:border-bgErrorSecondary hover:dark:border-bgErrorSecondaryDark hover:bg-bgErrorSecondary dark:hover:bg-bgErrorSecondaryDark text-white dark:text-whiteDark border-bgError dark:border-bgErrorDark',
    success: 'bg-bgSuccess dark:bg-bgSuccessDark border-bgSuccess dark:border-borderSuccessDark',
    group: 'border-borderSecondary dark:border-borderSecondaryDark',
    groupSelected:
      'border-borderPrimary dark:border-borderPrimaryDark bg-borderPrimary dark:bg-borderPrimaryDark text-black dark:text-fgPrimaryDark',
  };

  return (
    <button
      className={twMerge(
        'flex items-center justify-center font-normal cursor-pointer',
        mainStyle[variant],
        !noPadding && 'px-3 py-1.5',
        !noOutline &&
          'outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark focus:outline',
        roundedStyle,
        borderStyle,
        className,
      )}
      onClick={onClick}
      title={title}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      tabIndex={tabIndex}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
