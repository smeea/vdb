import { useCallback, useState } from 'react';
import { Modal, Tooltip } from '@/components';
import { useApp } from '@/context';

const ConditionalTooltipOrModal = ({
  children,
  title,
  placement,
  overlay,
  isModal,
  noPadding,
  size,
  className,
  centered = true,
  withMobileMargin,
  onClick,
  onClose,
}) => {
  const { isMobile } = useApp();
  const withModal = isModal !== undefined ? isModal : isMobile;
  const [showModal, setShowModal] = useState();

  const handleClick = useCallback(() => {
    onClick && onClick();
    setShowModal(true);
  }, [onClick]);

  const handleClose = useCallback(() => {
    onClose && onClose();
    setShowModal(false);
  }, [onClose]);

  return (
    <>
      {withModal ? (
        <>
          <div className={className} onClick={handleClick}>
            {children}
          </div>
          {showModal && (
            <Modal
              noPadding={noPadding}
              title={title}
              size={size}
              handleClose={handleClose}
              centered={centered}
              withMobileMargin={withMobileMargin}
            >
              {overlay}
            </Modal>
          )}
        </>
      ) : (
        <Tooltip
          noPadding={noPadding}
          className={className}
          placement={placement}
          size={size}
          overlay={overlay}
        >
          {children}
        </Tooltip>
      )}
    </>
  );
};

export default ConditionalTooltipOrModal;
