import React, { useState } from 'react';
import { Modal, ButtonFloat, DeckNewCard } from '@/components';
import { useApp } from '@/context';

const DeckNewCardFloating = ({ deckid, cards, cardChange, target }) => {
  const { isMobile, setShowFloatingButtons, showFloatingButtons } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const handleClick = () => {
    setShowAdd(true);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    setShowAdd(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      {isMobile && showFloatingButtons && (
        <ButtonFloat
          onClick={handleClick}
          position={target === 'crypt' ? 'top' : 'middle'}
          variant="primary"
        >
          <div className="flex items-center">
            <div className="text-[24px]">+</div>
            <div className="text-[28px]">{target === 'crypt' ? 'C' : 'L'}</div>
          </div>
        </ButtonFloat>
      )}
      {showAdd && (
        <Modal
          handleClose={handleClose}
          title={`Add ${target === 'crypt' ? 'Crypt' : 'Library'} Card`}
        >
          <div>
            <DeckNewCard
              handleClose={handleClose}
              cards={cards}
              deckid={deckid}
              target={target}
              cardChange={cardChange}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeckNewCardFloating;
