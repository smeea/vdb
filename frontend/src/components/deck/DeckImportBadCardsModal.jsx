import React, { useEffect, useState } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { useApp, deckCardChange } from 'context';
import { DeckCardQuantity, QuickSelect } from 'components';

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
      show={badCards.length > 0}
      onHide={() => setBadCards([])}
      animation={false}
      size="xl"
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
      >
        <div className="text-lg text-blue font-bold">Fix Bad Import</div>
        <Button variant="outline-secondary" onClick={() => setBadCards([])}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'px-0 pt-0' : 'px-4 pt-0'}>
        {badCards.map((c, idx) => {
          return (
            <div key={idx} className="flex flex-row items-center pt-2">
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
      </Modal.Body>
    </Modal>
  );
};

export default DeckImportBadCardsModal;
