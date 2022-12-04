import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';
import CaretLeftFill from 'assets/images/icons/caret-left-fill.svg';
import CaretRightFill from 'assets/images/icons/caret-right-fill.svg';
import CaretUpFill from 'assets/images/icons/caret-up-fill.svg';
import CaretDownFill from 'assets/images/icons/caret-down-fill.svg';

const Tooltip = ({ children, overlay, placement }) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement ?? 'right',
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // TODO see if getFloatingProps required
  // console.log(getFloatingProps());

  return (
    <>
      <div ref={reference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            className="tooltip-main"
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 1200,
            }}
          >
            {overlay}
            {placement === 'right' && (
              <div className="absolute top-1/2 left-[-12] text-neutral-500">
                <CaretLeftFill />
              </div>
            )}
            {placement === 'left' && (
              <div className="absolute top-1/2 right-[-12] text-neutral-500">
                <CaretRightFill />
              </div>
            )}
            {placement === 'top' && (
              <div className="absolute left-1/2 top-[-12] text-neutral-500">
                <CaretUpFill />
              </div>
            )}
            {placement === 'bottom' && (
              <div className="absolute left-1/2 bottom-[-12] text-neutral-500">
                <CaretDownFill />
              </div>
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
