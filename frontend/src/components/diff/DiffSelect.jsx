import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeftRight from '@/assets/images/icons/arrow-left-right.svg';
import { DiffSelectDeck, Button } from '@/components';

const DiffSelect = ({ decks, deck, deckTo, deckidFrom, deckidTo }) => {
  const navigate = useNavigate();

  const handleSwap = () => {
    navigate(`/diff/${deckidTo}/${deckidFrom}`);
  };

  return (
    <div className="flex max-sm:flex-col gap-2 sm:gap-4 lg:gap-6 xl:gap-8">
      <div className="sm:basis-1/2">
        <DiffSelectDeck
          target="from"
          title="Deck You Edit"
          deck={deck}
          decks={decks}
          deckidFrom={deckidFrom}
          deckidTo={deckidTo}
        />
      </div>
      <div className="flex items-center justify-center">
        <Button variant="primary" onClick={handleSwap}>
          <ArrowLeftRight />
        </Button>
      </div>
      <div className="sm:basis-1/2">
        <DiffSelectDeck
          target="to"
          title="Show Changes Against:"
          deck={deckTo}
          decks={decks}
          deckidFrom={deckidFrom}
          deckidTo={deckidTo}
        />
      </div>
    </div>
  );
};

export default DiffSelect;
