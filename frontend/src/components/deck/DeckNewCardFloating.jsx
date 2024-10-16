import React, { useState } from 'react';
import { ButtonFloat, DeckNewCard } from '@/components';
import { CRYPT } from '@/utils/constants';

const DeckNewCardFloating = ({ deckid, cards, cardChange, target }) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleClick = () => {
    setShowAdd(true);
  };

  const handleClose = () => {
    setShowAdd(false);
  };

  return (
    <>
      <ButtonFloat
        onClick={handleClick}
        position={target === CRYPT ? 'top' : 'middle'}
        variant="primary"
      >
        <div className="flex items-center">
          <div className="text-[24px]">+</div>
          <div className="text-[28px]">{target === CRYPT ? 'C' : 'L'}</div>
        </div>
      </ButtonFloat>
      {showAdd && (
        <div className="fixed bottom-[40px] z-20 flex w-full flex-row bg-bgPrimary p-2 dark:bg-bgPrimaryDark">
          <div className="w-full" onBlur={handleClose}>
            <DeckNewCard
              handleClose={handleClose}
              cards={cards}
              deckid={deckid}
              target={target}
              cardChange={cardChange}
              menuPlacement="top"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DeckNewCardFloating;
