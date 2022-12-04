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
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full rounded bg-neutral-700">
            {title && (
              <Dialog.Title className="no-border pt-2 pt-md-3 pb-0 pb-md-1 px-2 px-md-4">
                <div className="text-lg text-blue font-bold">{title}</div>
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
