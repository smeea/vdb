import { Tooltip } from "@/components";

const ConditionalTooltip = ({
  children,
  className,
  size,
  noPadding,
  placement,
  overlay,
  disabled,
  noClick,
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
          noClick={noClick}
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
