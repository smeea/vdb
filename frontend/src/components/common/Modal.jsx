import React, { useRef } from 'react';
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
  bordered = false,
  initialFocus,
}) => {
  const { isNarrow } = useApp();
  const emptyRef = useRef();
  // TODO close with Esc

  const widthClass = {
    sm: 'min-w-full sm:min-w-[65%] md:min-w-[50%] lg:min-w-[45%] xl:min-w-[35%] 2xl:min-w-[25%]',
    md: 'min-w-full sm:min-w-[80%] md:min-w-[65%] lg:min-w-[55%] xl:min-w-[45%] 2xl:min-w-[35%]',
    lg: 'min-w-full sm:min-w-full md:min-w-[80%] lg:min-w-[75%] xl:min-w-[70%] 2xl:min-w-[60%]',
    xl: 'min-w-full sm:min-w-full md:min-w-[90%] lg:min-w-[85%] xl:min-w-[75%] 2xl:min-w-[70%]',
  };

  return (
    <Dialog
      initialFocus={initialFocus ?? emptyRef}
      onClose={handleClose}
      className="relative z-50"
      open
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div
        className={`fixed inset-0 flex justify-center overflow-auto p-0 sm:p-8 ${
          centered ? 'items-center' : 'items-start'
        }`}
      >
        <Dialog.Panel
          className={`
            ${
              bordered
                ? 'border border-borderNestModal dark:border-borderNestModalDark'
                : ''
            } ${
            widthClass[size]
          } rounded border border-bgSecondary bg-bgPrimary ${
            noPadding ? '' : 'p-3 sm:p-5'
          } dark:border-bgSecondaryDark dark:bg-bgPrimaryDark`}
        >
          {title && (
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
          )}
          <div className="max-h-0 max-w-0 opacity-0">
            <button />
          </div>
          {children}
        </Dialog.Panel>
      </div>
      {isNarrow && <ButtonFloatClose handleClose={handleClose} />}
    </Dialog>
  );
};

export default Modal;
