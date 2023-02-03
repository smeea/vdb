import React from 'react';
import { Button } from '@/components';

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
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center">{icon}</div>
        {text && <div>{text}</div>}
      </div>
    </Button>
  );
};

export default ButtonIconed;
