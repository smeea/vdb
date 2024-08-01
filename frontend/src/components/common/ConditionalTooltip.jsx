import React from 'react';
import { Tooltip } from '@/components';

const ConditionalTooltip = ({
  children,
  className,
  size,
  noPadding,
  placement,
  overlay,
  disabled,
}) => {
  return (
    <>
      {!disabled ? (
        <Tooltip
          className={className}
          placement={placement}
          overlay={overlay}
          noPadding={noPadding}
          size={size}
        >
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </>
  );
};

export default ConditionalTooltip;
