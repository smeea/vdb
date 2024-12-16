import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FlexGapped, Input, Modal, Button, ErrorOverlay } from '@/components';
import { useApp } from '@/context';
import { YES } from '@/constants';

const ModalConfirmation = ({
  title,
  buttonText,
  withWrittenConfirmation,
  handleConfirm,
  handleCancel,
  centered,
  size = 'xs',
  disabled,
  children,
  buttonVariant = 'primary',
  withMobileMargin = 'true',
}) => {
  const { isMobile } = useApp();
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);

  const handleClick = () => {
    if (withWrittenConfirmation) {
      if (confirmation === YES) {
        setErrorConfirmation(false);
        setConfirmation('');
        handleConfirm();
      } else {
        setErrorConfirmation(true);
      }
    } else {
      handleConfirm();
    }
  };

  const handleClose = () => {
    setErrorConfirmation(false);
    setConfirmation('');
    handleCancel();
  };

  const handleChange = (event) => {
    setErrorConfirmation(false);
    setConfirmation(event.target.value);
  };

  return (
    <Modal
      handleClose={handleClose}
      centered={centered ?? isMobile}
      size={size}
      title={title}
      withMobileMargin={withMobileMargin}
    >
      <FlexGapped className="flex-col">
        {children}
        <div className={twMerge('flex justify-end gap-2', !children && 'pt-3')}>
          {withWrittenConfirmation && (
            <form onSubmit={handleClick} className="relative w-full">
              <Input
                placeholder={`Type '${YES}' to confirm`}
                name="text"
                value={confirmation}
                onChange={handleChange}
                autoFocus
              />
              {errorConfirmation && (
                <ErrorOverlay placement="bottom">Type &apos;{YES}&apos; to confirm</ErrorOverlay>
              )}
            </form>
          )}
          <div className="flex justify-between gap-2">
            <Button disabled={disabled} variant={buttonVariant} onClick={handleClick}>
              {buttonText}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default ModalConfirmation;
