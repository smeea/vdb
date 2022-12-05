import React from 'react';

const Button = ({
  value,
  name,
  id,
  onClick,
  variant,
  title,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      className={`btn btn-${variant} ${className ?? ''}`}
      onClick={onClick}
      title={title}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
