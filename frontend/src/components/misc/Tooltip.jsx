import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';

const Tooltip = ({ children, overlay, noPadding, placement = 'right' }) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const {
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement: arrowPlacement,
    x,
    y,
    reference,
    floating,
    strategy,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift(), arrow({ element: arrowRef })],
  });

  const hover = useHover(context, { move: false });
  // const focus = useFocus(context);
  // const dismiss = useDismiss(context);
  // const role = useRole(context, { role: 'tooltip' });
  // const { getReferenceProps, getFloatingProps } = useInteractions([
  //   hover,
  //   focus,
  //   dismiss,
  //   role,
  // ]);
  // TODO see if required
  // <div className="inline" ref={reference} {...getFloatingProps()} {...getReferenceProps()}>

  // TODO add sizing as in modals for other than max-w-[800px]

  const arrowOffset = {
    top: 'bottom-[-7px]',
    right: 'left-[-7px]',
    bottom: 'top-[-7px]',
    left: 'right-[-7px]',
  }[arrowPlacement.split('-')[0]];

  return (
    <>
      <div className="inline" ref={reference}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            className={`z-50 max-w-[800px] rounded-md border border-bgSecondary bg-bgPrimary text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark ${
              noPadding ? '' : 'p-3'
            }`}
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
          >
            {overlay}
            <div
              ref={arrowRef}
              className={`absolute z-[-1] h-[12px] w-[12px] border-l border-b border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark ${arrowOffset} rotate-45`}
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
