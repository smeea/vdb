import React from 'react';
import { Tooltip } from 'components';

const ConditionalTooltip = ({ children, placement, overlay, disabled }) => {
  return (
    <>
      {!disabled ? (
        <Tooltip placement={placement} overlay={overlay} noPadding>
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </>
  );
};

export default ConditionalTooltip;
