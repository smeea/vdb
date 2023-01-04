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

const Tooltip = ({ children, overlay, noPadding, placement = 'right' }) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement,
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

  // TODO add sizing as in modals for other than max-w-[800px]

  // TODO see if getFloatingProps required
  // console.log(getFloatingProps());

  return (
    <>
      <div className="inline" ref={reference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            className={`max-w-[800px] rounded-md border border-bgSecondary bg-bgPrimary text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark ${
              noPadding ? '' : 'p-3'
            }`}
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
              <div className="text-midGray dark:text-midGrayDarkk:text-midGrayDark absolute top-1/2 left-[-12]">
                <CaretLeftFill />
              </div>
            )}
            {placement === 'left' && (
              <div className="text-midGray dark:text-midGrayDark absolute top-1/2 right-[-12]">
                <CaretRightFill />
              </div>
            )}
            {placement === 'top' && (
              <div className="text-midGray dark:text-midGrayDark absolute left-1/2 top-[-12]">
                <CaretUpFill />
              </div>
            )}
            {placement === 'bottom' && (
              <div className="text-midGray dark:text-midGrayDark absolute left-1/2 bottom-[-12]">
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
