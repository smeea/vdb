import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Dialog } from '@headlessui/react';
import { ButtonCloseModal, ButtonFloatClose } from '@/components';

const Modal = ({
  centered = false,
  children,
  className,
  handleClose,
  initialFocus,
  noBorder = false,
  noClose = false,
  noPadding = false,
  size = 'md',
  title,
  withMobileMargin = false,
}) => {
  const widthClass = {
    xs: 'min-w-full sm:min-w-[500px] sm:max-w-[550px]',
    sm: 'min-w-full sm:min-w-[650px] sm:max-w-[725px]',
    md: 'min-w-full sm:min-w-[850px] sm:max-w-[950px]',
    lg: 'min-w-full lg:min-w-[1150px] lg:max-w-[1250px]',
    xl: 'min-w-full xl:min-w-[1350px] xl:max-w-[1500px]',
    card: 'w-full sm:w-[900px]',
  };

  return (
    <Dialog initialFocus={initialFocus} onClose={handleClose} className="relative z-50" open>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div
          className={twMerge(
            'flex min-h-full justify-center p-8',
            centered ? 'items-center' : 'items-start',
            withMobileMargin ? 'max-sm:p-2' : 'max-sm:p-0',
          )}
        >
          <Dialog.Panel
            className={twMerge(
              'flex flex-col gap-1 rounded border-bgSecondary bg-bgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark',
              widthClass[size],
              !noBorder && 'border',
              !noPadding && 'px-5 pb-5 pt-4 max-sm:px-3 max-sm:pb-3 max-sm:pt-2',
              className,
            )}
          >
            {(title || !noClose) && (
              <Dialog.Title className="flex items-center justify-between border-none">
                <div
                  className={twMerge(
                    'text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark',
                    noPadding && 'px-2 pt-2',
                  )}
                >
                  {title}
                </div>
                {!noClose && (
                  <div className="flex items-center max-md:hidden">
                    <ButtonCloseModal handleClick={handleClose} />
                  </div>
                )}
              </Dialog.Title>
            )}
            <div className={twMerge('max-h-0 max-w-0 opacity-0', noClose && 'hidden')}>
              <button />
            </div>
            {children}
          </Dialog.Panel>
        </div>
      </div>
      <div className="md:hidden">
        <ButtonFloatClose handleClose={handleClose} />
      </div>
    </Dialog>
  );
};

export default Modal;
