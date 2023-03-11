import React from 'react';
import { Button } from '@/components';

const ButtonIconed = ({
  className,
  disabled,
  icon,
  onClick,
  text,
  title,
  type,
  variant,
}) => {
  return (
    <Button
      className={`min-h-[41px] ${className ?? ''}`}
      onClick={onClick}
      title={title}
      disabled={disabled}
      variant={variant}
      type={type}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center">{icon}</div>
        {text && <div>{text}</div>}
      </div>
    </Button>
  );
};

export default ButtonIconed;
