import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonIconed = ({
  onClick,
  variant,
  title,
  text,
  icon,
  disabled,
  className,
}) => {
  return (
    <Button
      className={`${className ?? ''} h-100`}
      variant={variant}
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
    </Button>
  );
};

export default ButtonIconed;
