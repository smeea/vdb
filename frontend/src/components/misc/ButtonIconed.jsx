import React from 'react';

const ButtonIconed = ({
  className,
  disabled,
  icon,
  onClick,
  text,
  title,
  variant,
}) => {
  const btnVariant = `btn-${variant}`;

  return (
    <button
      className={`${btnVariant} items-center justify-center  rounded-md ${
        className ?? ''
      }`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {text === undefined || text === null ? (
        <>{icon}</>
      ) : (
        <div className="flex items-center justify-center">
          <div>{icon}</div>
          {text}
        </div>
      )}
    </button>
  );
};

export default ButtonIconed;
