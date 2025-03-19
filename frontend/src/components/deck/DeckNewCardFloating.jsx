import { useState } from 'react';
import { ButtonFloat, DeckNewCard } from '@/components';
import { CRYPT } from '@/constants';

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
      <ButtonFloat onClick={handleClick} position={target === CRYPT ? 'top' : 'middle'}>
        <div className="flex items-center text-2xl">
          <div>+</div>
          <div>{target === CRYPT ? 'C' : 'L'}</div>
        </div>
      </ButtonFloat>
      {showAdd && (
        <div className="bg-bgPrimary dark:bg-bgPrimaryDark fixed bottom-[40px] z-20 flex w-full p-2">
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
