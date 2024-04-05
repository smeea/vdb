import React, { useState } from 'react';
import { Modal, Tooltip } from '@/components';

const ConditionalTooltipOrModal = ({
  children,
  title,
  placement,
  overlay,
  isModal,
  className = '',
  centered = true,
}) => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      {isModal ? (
        <div className={className} onClick={() => setShowModal(true)}>
          {children}
        </div>
      ) : (
        <Tooltip className={className} placement={placement} overlay={overlay}>
          {children}
        </Tooltip>
      )}
      {showModal && (
        <Modal
          title={title}
          handleClose={() => setShowModal(false)}
          centered={centered}
        >
          {overlay}
        </Modal>
      )}
    </>
  );
};

export default ConditionalTooltipOrModal;
