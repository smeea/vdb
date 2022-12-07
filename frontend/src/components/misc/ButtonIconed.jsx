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
        <div className="flex items-center justify-center">
          <div className="pe-2 flex">{icon}</div>
          {text}
        </div>
      )}
    </button>
  );
};

export default ButtonIconed;
