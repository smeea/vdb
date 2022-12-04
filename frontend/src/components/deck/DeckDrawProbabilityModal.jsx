import React from 'react';
import { Modal } from 'components';

const DeckDrawProbabilityModal = ({ setModalDraw, modalDraw }) => {
  return (
    <Modal
      size="xs"
      dialogClassName="w-50 flex justify-center nested-modal"
      handleClose={() => setModalDraw(null)}
      centered
      title={modalDraw.name}
    >
      <div>{modalDraw.prob}</div>
    </Modal>
  );
};

export default DeckDrawProbabilityModal;
