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
}) => {
  const [showModal, setShowModal] = useState();

  return (
    <>
      {isModal ? (
        <div className={className} onClick={() => setShowModal(true)}>
          {children}
        </div>
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
      {showModal && (
        <Modal
          noPadding={noPadding}
          title={title}
          size={size}
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
