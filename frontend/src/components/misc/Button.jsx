import React from 'react';

const Button = ({ onClick, variant, title, disabled, className, children }) => {
  return (
    <button
      className={`btn btn-${variant} ${className ?? ''} h-100`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
