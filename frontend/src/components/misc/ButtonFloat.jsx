import React from 'react';

const ButtonFloat = ({
  onClick,
  position = 'bottom',
  variant = 'primary',
  children,
}) => {
  const positionClass =
    position === 'top'
      ? 'bottom-[175px] sm:bottom-[145px]'
      : position === 'middle'
      ? 'bottom-[115px] sm:bottom-[85px]'
      : 'bottom-[55px] sm:bottom-[25px]';

  const getStyle = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-midGray dark:bg-midGrayDark opacity-80';
      case 'secondary':
        return 'bg-darkGray dark:bg-darkGrayDark opacity-30';
      case 'danger':
        return 'bg-bgRed dark:bg-bgRedDark opacity-80';
      case 'success':
        return 'bg-bgGreen dark:bg-bgGreenDark opacity-80';
    }
  };

  const style = getStyle(variant);

  return (
    <div
      onClick={onClick}
      className={`fixed right-[15px] z-20 h-[48px] w-[48px] items-center justify-center rounded-[25px] text-[#fff] sm:right-[25px] ${positionClass} ${style}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ButtonFloat;
