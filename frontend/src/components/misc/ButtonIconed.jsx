import React from 'react';
import { Button } from 'components';

const ButtonIconed = ({
  className,
  disabled,
  icon,
  onClick,
  text,
  title,
  variant,
}) => {
  return (
    <Button
      className={className ?? null}
      onClick={onClick}
      title={title}
      disabled={disabled}
      variant={variant}
    >
      {text === undefined || text === null ? (
        <>{icon}</>
      ) : (
        <div className="flex items-center justify-center">
          <div className="pr-2">{icon}</div>
          {text}
        </div>
      )}
    </Button>
  );
};

export default ButtonIconed;
