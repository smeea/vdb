import React from 'react';
import { Dialog } from '@headlessui/react';
import { ButtonCloseModal, ButtonFloatClose } from '@/components';
import { useApp } from '@/context';

const Modal = ({
  handleClose,
  title,
  children,
  size = 'md',
  noPadding = false,
  centered = false,
  initialFocus,
  // TODO implement bordered
  bordered = false,
}) => {
  const { isNarrow } = useApp();

  // TODO unfocus close
  // TODO close with Esc

  const getWidth = (s) => {
    switch (s) {
      case 'sm':
        return 'min-w-full sm:min-w-[65%] md:min-w-[50%] lg:min-w-[45%] xl:min-w-[35%] 2xl:min-w-[25%]';
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
    <Dialog
      initialFocus={initialFocus}
      onClose={handleClose}
      className="relative z-50"
      open
    >
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
          className={`${widthClass} rounded border border-bgSecondary bg-bgPrimary ${
            noPadding ? '' : 'p-3 sm:p-5'
          } dark:border-bgSecondaryDark dark:bg-bgPrimaryDark`}
        >
          <Dialog.Title
            className={`flex items-center justify-between border-none  ${
              noPadding ? 'p-1.5' : 'pb-1.5 sm:pb-3'
            }`}
          >
            <div className="text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
              {title}
            </div>
            {!isNarrow && <ButtonCloseModal handleClose={handleClose} />}
          </Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
      {isNarrow && <ButtonFloatClose handleClose={handleClose} />}
    </Dialog>
  );
};

export default Modal;
