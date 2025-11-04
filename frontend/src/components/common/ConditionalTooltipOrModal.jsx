import { useState } from "react";
import { Modal, Tooltip } from "@/components";
import { useApp } from "@/context";

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

  const handleClick = () => {
    try {
      onClick();
    } catch {}
    setShowModal(true);
  }

  const handleClose = () => {
    try {
      onClose();
    } catch {}
    setShowModal(false);
  }

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
