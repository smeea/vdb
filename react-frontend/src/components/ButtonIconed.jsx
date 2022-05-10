import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonIconed = ({ onClick, variant, title, text, icon }) => {
  return (
    <Button variant={variant} onClick={onClick} title={title}>
      <div className="d-flex justify-content-center align-items-center">
        <div className={`d-flex ${text !== undefined ? 'pe-2' : ''}`}>
          {icon}
        </div>
        {text}
      </div>
    </Button>
  );
};

export default ButtonIconed;
