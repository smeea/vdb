import React from 'react';
import { Tooltip } from '@/components';

const ConditionalTooltip = ({
  children,
  className,
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
