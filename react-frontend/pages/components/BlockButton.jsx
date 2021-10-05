import React from 'react';
import { Button } from 'react-bootstrap';

const BlockButton = React.forwardRef(({ children, onClick }, ref) => (
  <div className="d-grid">
    <Button
      variant="secondary"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  </div>
));

export default BlockButton;
