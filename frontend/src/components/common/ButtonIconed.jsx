import React from 'react';
import { Button } from '@/components';

const ButtonIconed = ({
  className = '',
  disabled,
  icon,
  onClick,
  text,
  title,
  type,
  variant = 'primary',
  borderStyle,
  noOutline,
}) => {
  const iconStyle = {
    primary: 'text-fgFourth dark:text-fgThirdDark',
    secondary: 'text-fgFourth dark:text-fgThirdDark',
    third: 'text-black dark:text-fgPrimaryDark',
    fourth: 'text-black dark:text-fgPrimaryDark',
    danger: 'text-white dark:text-whiteDark',
    success:
      'bg-bgSuccess dark:bg-bgSuccessDark border-bgSuccess dark:border-borderSuccessDark',
  };

  return (
    <Button
      className={`min-h-[41px] ${className}`}
      onClick={onClick}
      title={title}
      disabled={disabled}
      variant={variant}
      type={type}
      borderStyle={borderStyle}
      noOutline={noOutline}
    >
      <div className="flex items-center justify-center gap-2">
        <div className={`flex ${iconStyle[variant]} items-center`}>{icon}</div>
        {text && <div className="font-normal">{text}</div>}
      </div>
    </Button>
  );
};

export default ButtonIconed;
