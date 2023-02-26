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
  const outlineStyle =
    'rounded focus:outline outline-1 outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark';

  const customStyle = {
    primary:
      'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark hover:border-borderPrimary dark:hover:border-borderPrimaryDark',
    secondary:
      'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border border-borderThird dark:border-borderThirdDark hover:border-borderPrimary dark:hover:border-borderPrimaryDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark',
    third: 'bg-borderPrimary dark:bg-borderPrimaryDark',
    'outline-primary':
      'border border-borderSecondary dark:border-borderSecondaryDark',
    danger:
      'bg-bgError dark:bg-bgErrorDark hover:border-bgErrorSecondary hover:dark:border-bgErrorSecondaryDark hover:bg-bgErrorSecondary dark:hover:bg-bgErrorSecondaryDark border border-bgError dark:border-bgError',
    success:
      'bg-bgSuccess dark:bg-bgSuccessDark border border-bgSuccess dark:border-borderSuccessDark',
  };

  return (
    <button
      className={`${outlineStyle} ${
        customStyle[variant]
      } flex items-center justify-center ${noPadding ? '' : 'px-3 py-1.5'} ${
        className ?? ''
      }`}
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
