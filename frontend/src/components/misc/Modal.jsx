import React from 'react';
import { Dialog } from '@headlessui/react';
import X from 'assets/images/icons/x.svg';

const Modal = ({ handleClose, centered, size = 'md', title, children }) => {
  // TODO unfocus close
  // TODO close with Esc

  const getWidth = (s) => {
    switch (s) {
      case 'md':
        return 'min-w-full sm:min-w-[80%] md:min-w-[65%] lg:min-w-[55%] xl:min-w-[45%] 2xl:min-w-[40%]';
      case 'lg':
        return 'min-w-full sm:min-w-full md:min-w-[80%] lg:min-w-[70%] xl:min-w-[60%] 2xl:min-w-[55%]';
      case 'xl':
        return 'min-w-full sm:min-w-full md:min-w-[95%] lg:min-w-[85%] xl:min-w-[75%] 2xl:min-w-[70%]';
    }
  };

  const widthClass = getWidth(size);

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-[#000] bg-opacity-50"
        aria-hidden="true"
      />

      <div
        className={`fixed inset-0 flex justify-center overflow-auto p-0 sm:p-8 ${
          centered ? 'items-center' : 'items-start'
        }`}
      >
        <Dialog.Panel
          className={`${widthClass} space-y-2 rounded border border-bgSecondary bg-bgPrimary p-5 dark:border-bgSecondaryDark dark:bg-bgPrimaryDark`}
        >
          {title && (
            <Dialog.Title className="flex items-start justify-between border-none">
              <div className="text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
                {title}
              </div>
              <button onClick={handleClose}>
                <X width="32" height="32" viewBox="0 0 16 16" />
              </button>
            </Dialog.Title>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
