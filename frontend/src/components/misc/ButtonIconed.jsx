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
      className={`${btnVariant} items-center justify-center rounded-md px-3 py-1.5 ${
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
          <div className="pr-2">{icon}</div>
          {text}
        </div>
      )}
    </button>
  );
};

export default ButtonIconed;
