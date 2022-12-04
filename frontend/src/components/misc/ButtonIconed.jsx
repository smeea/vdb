import React from 'react';

const ButtonIconed = ({
  onClick,
  variant,
  title,
  text,
  icon,
  disabled,
  className,
}) => {
  const btnVariant = `btn-${variant}`;

  return (
    <button
      className={`btn ${btnVariant} ${className ?? ''}`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {text === undefined || text === null ? (
        <>{icon}</>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex pe-2">{icon}</div>
          {text}
        </div>
      )}
    </button>
  );
};

export default ButtonIconed;
