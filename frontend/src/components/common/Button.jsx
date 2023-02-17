import React from 'react';

const Button = ({
  children,
  className,
  disabled,
  id,
  name,
  onClick,
  title,
  value,
  type,
  tabIndex,
  variant = 'primary',
  noPadding,
}) => {
  const baseStyle =
    'focus:outline outline-2 outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark';

  // TODO style hover && copy to MenuButton
  // hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark hover:border hover:border-borderPrimary dark:hover:border-borderPrimaryDark
  const customStyle = {
    primary:
      'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark',
    secondary:
      'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border border-borderThird dark:border-borderThirdDark',
    third: 'bg-borderPrimary dark:bg-borderPrimaryDark',
    'outline-primary':
      'border border-borderSecondary dark:border-borderSecondaryDark',
    danger:
      'bg-bgError dark:bg-bgErrorDark hover:bg-bgErrorSecondary dark:hover:bg-bgErrorSecondaryDark border border-borderSecondary dark:border-borderSecondaryDark',
    success:
      'bg-bgSuccess dark:bg-bgSuccessDark border border-borderSecondary dark:border-borderSecondaryDark',
  };

  return (
    <button
      className={`${baseStyle} ${
        customStyle[variant]
      } flex items-center justify-center rounded ${
        noPadding ? '' : 'px-3 py-1.5'
      } ${className ?? ''}`}
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
