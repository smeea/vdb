import React from 'react';
import { Dialog } from '@headlessui/react';
import X from 'assets/images/icons/x.svg';
import { Button } from 'components';
// import { useApp } from 'context';

const Modal = ({ handleClose, centered, size, title, children }) => {
  // TODO use or discard isMobile/isNarrow properties
  // const { isNarrow, isMobile } = useApp();
  // TODO unfocus close
  // TODO close with Esc

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />

      <div
        className={`fixed inset-0 flex ${
          centered ? 'items-center' : 'items-start pt-8'
        } justify-center overflow-auto`}
      >
        <Dialog.Panel
          className={`${
            size ? `modal-${size}` : ''
          } rounded bg-neutral-700 p-5 space-y-2`}
        >
          {title && (
            <Dialog.Title className="flex border-none justify-between items-start">
              <div className="text-blue text-lg font-bold">{title}</div>
              <Button variant="outline-secondary" onClick={handleClose}>
                <X width="32" height="32" viewBox="0 0 16 16" />
              </Button>
            </Dialog.Title>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
