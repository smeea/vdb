import React from 'react';
import { useImmer } from 'use-immer';
import { useApp, deckCardChange, inventoryCardChange } from '@/context';
import { Modal, DeckCardQuantity, QuickSelect } from '@/components';

const DeckImportBadCardsModal = ({
  deckid,
  badCards,
  setBadCards,
  inInventory,
}) => {
  const { isMobile } = useApp();

  const [cards, setCards] = useImmer(
    badCards.map(() => ({
      c: null,
      q: null,
    }))
  );

  const handleCardChange = (deckid, idx, q) => {
    if (cards[idx] && q >= 0) {
      if (inInventory) {
        inventoryCardChange(cards[idx].c, q);
      } else {
        deckCardChange(deckid, cards[idx].c, q);
      }
      setCards((draft) => {
        draft[idx].q = q;
      });
    }
  };

  const handleSetCard = (card, idx) => {
    setCards((draft) => {
      draft[idx].c = card;
    });
  };

  return (
    <Modal
      handleClose={() => setBadCards([])}
      size="lg"
      title="Fix Bad Import"
      noPadding={isMobile}
    >
      <div>
        {badCards.map((c, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-row items-center gap-1 sm:gap-3"
            >
              <div className="basis-1/3 sm:basis-2/5">{c}</div>
              <div className="min-w-[75px]">
                <DeckCardQuantity
                  deckid={deckid}
                  cardChange={handleCardChange}
                  card={idx}
                  q={cards[idx]?.q}
                  isEditable
                />
              </div>
              <div className="basis-2/3 sm:basis-3/5">
                <QuickSelect
                  setCard={(card) => handleSetCard(card, idx)}
                  selectedCardid={cards[idx]?.c?.Id}
                  inBadImport
                />
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default DeckImportBadCardsModal;
