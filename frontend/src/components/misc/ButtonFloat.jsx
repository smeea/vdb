import React from 'react';

const ButtonFloat = ({ onClick, position = 'bottom', variant, children }) => {
  const positionClass =
    position === 'top'
      ? 'bottom-[175px] sm:bottom-[145px]'
      : position === 'middle'
      ? 'bottom-[115px] sm:bottom-[85px]'
      : 'bottom-[55px] sm:bottom-[25px]';

  return (
    <div
      onClick={onClick}
      className={`text-[#fff] fixed right-[15px] z-10 h-[48px] w-[48px] items-center justify-center rounded-[25px] sm:right-[25px] ${positionClass} ${variant}`}
    >
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ButtonFloat;
