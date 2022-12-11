import React from 'react';
import { Dialog } from '@headlessui/react';
// import X from 'assets/images/icons/x.svg';
// import { useApp } from 'context';

const Modal = ({ handleClose, title, children }) => {
  // TODO respect dialogClassName and className (maybe merge), centered, size properties

  // TODO use or discard isMobile/isNarrow properties
  // const { isNarrow, isMobile } = useApp();

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="w-full rounded bg-neutral-700">
            {title && (
              <Dialog.Title className="   border-none   ">
                <div className="text-blue text-lg font-bold">{title}</div>
              </Dialog.Title>
            )}
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
