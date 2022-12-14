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
      className={`fixed text-white items-center justify-center rounded-[25px] w-[48px] h-[48px] z-10 right-[15px] sm:right-[25px] ${positionClass} ${variant}`}
    >
      <div className="flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ButtonFloat;
