import React, { useState } from 'react';
import { Modal, Tooltip } from '@/components';

const ConditionalTooltipOrModal = ({
  children,
  title,
  placement,
  overlay,
  isModal,
  noPadding,
  size,
  className = '',
  centered = true,
  onClick,
  onClose,
}) => {
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    onClick && onClick();
    setShowModal(true);
  };

  const handleClose = () => {
    onClose && onClose();
    setShowModal(false);
  };

  return (
    <>
      {isModal ? (
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
