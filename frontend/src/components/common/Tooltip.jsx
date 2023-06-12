import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useClick,
  useFocus,
  useDismiss,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';

const Tooltip = ({
  children,
  className = 'inline',
  size = 'md',
  overlay,
  noPadding,
  placement = 'right',
}) => {
  const widthClass = {
    sm: 'max-w-full sm:max-w-[300px]',
    md: 'max-w-full sm:max-w-[450px]',
    lg: 'max-w-full lg:max-w-[700px]',
    xl: 'max-w-full xl:max-w-[1000px]',
  };

  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const {
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement: arrowPlacement,
    x,
    y,
    refs,
    strategy,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(7), flip(), shift(), arrow({ element: arrowRef })],
  });

  const click = useClick(context);
  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    focus,
    dismiss,
  ]);

  const arrowOffset = {
    bottom: 'top-[-7px]',
    left: 'right-[-7px]',
    right: 'left-[-7px]',
    top: 'bottom-[-7px]',
  }[arrowPlacement.split('-')[0]];

  const arrowRotate = {
    bottom: 'rotate-[135deg]',
    left: 'rotate-[225deg]',
    right: 'rotate-[45deg]',
    top: 'rotate-[315deg]',
  }[arrowPlacement.split('-')[0]];

  return (
    <>
      <div
        className={className}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            className={`z-50 rounded-md border border-bgSecondary bg-bgPrimary text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark ${
              noPadding ? '' : 'p-3'
            } ${widthClass[size]}
`}
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {overlay}
            <div
              ref={arrowRef}
              className={`absolute z-[-1] h-[12px] w-[12px] border-b border-l border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark ${arrowOffset} ${arrowRotate}`}
              style={{
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
