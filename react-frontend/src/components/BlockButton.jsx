import React from 'react';
import { Button } from 'react-bootstrap';

const BlockButton = React.forwardRef(({ children, onClick, variant }, ref) => (
  <div className="d-grid">
    <Button
      variant={variant}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  </div>
));

BlockButton.displayName = 'BlockButton';

export default BlockButton;
