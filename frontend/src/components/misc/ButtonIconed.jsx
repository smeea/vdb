import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonIconed = ({ onClick, variant, title, text, icon, disabled }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      <div className="d-flex justify-content-center align-items-center">
        {icon && (
          <div
            className={`d-flex ${
              text === undefined || text === null ? '' : 'pe-2'
            }`}
          >
            {icon}
          </div>
        )}
        {text}
      </div>
    </Button>
  );
};

export default ButtonIconed;
