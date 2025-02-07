import { useActionState, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, ErrorOverlay, FlexGapped, Input, Modal } from '@/components';
import { TEXT, YES } from '@/constants';
import { useApp } from '@/context';

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
  const [error, setError] = useState(false);

  const handleClose = useCallback(() => {
    setError(false);
    handleCancel();
  }, [handleCancel]);

  const confirm = useCallback(
    async (prevState, formData) => {
      if (withWrittenConfirmation) {
        if (formData.get(TEXT) === YES) {
          setError(false);
          handleConfirm();
        } else {
          setError(true);
        }
      } else {
        handleConfirm();
      }

      return { [TEXT]: formData.get(TEXT) };
    },
    [withWrittenConfirmation, handleConfirm],
  );

  const [data, action] = useActionState(confirm);

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
        <form action={action} className={twMerge('flex justify-end gap-2', !children && 'pt-3')}>
          {withWrittenConfirmation && (
            <>
              <div className="relative w-full">
                <Input
                  placeholder={`Type '${YES}' to confirm`}
                  name={TEXT}
                  defaultValue={data?.[TEXT]}
                  autoFocus
                />
                {error && (
                  <ErrorOverlay placement="bottom">Type &apos;{YES}&apos; to confirm</ErrorOverlay>
                )}
              </div>
            </>
          )}
          <div className="flex justify-between gap-2">
            <Button disabled={disabled} variant={buttonVariant} type="submit">
              {buttonText}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </form>
      </FlexGapped>
    </Modal>
  );
};

export default ModalConfirmation;
