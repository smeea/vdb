import React, { useEffect, useState } from 'react';
import { useApp, deckCardChange } from '@/context';
import { Modal, DeckCardQuantity, QuickSelect } from '@/components';

const DeckImportBadCardsModal = ({ deckid, badCards, setBadCards }) => {
  const { isMobile } = useApp();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      badCards.map(() => ({
        c: null,
        q: null,
      }))
    );
  }, [badCards]);

  const handleCardChange = (deckid, idx, q) => {
    if (cards[idx] && q >= 0) {
      deckCardChange(deckid, cards[idx].c, q);
      setCards((prevState) => ({
        ...prevState,
        [idx]: {
          ...prevState[idx],
          q: q,
        },
      }));
    }
  };

  const handleSetCard = (card, idx) => {
    setCards((prevState) => ({
      ...prevState,
      [idx]: {
        ...prevState[idx],
        c: card,
      },
    }));
  };

  return (
    <Modal
      handleClose={() => setBadCards([])}
      size="xl"
      dialogClassName={isMobile ? '' : null}
      title="Fix Bad Import"
    >
      <div>
        {badCards.map((c, idx) => {
          return (
            <div key={idx} className="flex flex-row items-center ">
              <div className="md:basis-5/12">{c}</div>
              <div className="md:basis-1/12">
                <DeckCardQuantity
                  deckid={deckid}
                  cardChange={handleCardChange}
                  card={idx}
                  q={cards[idx]?.q}
                />
              </div>
              <div className="md:basis-1/2">
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
