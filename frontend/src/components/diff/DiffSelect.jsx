import React from 'react';
import { useNavigate } from 'react-router';
import ArrowLeftRight from '@icons/arrow-left-right.svg?react';
import { DiffSelectDeck, Button, FlexGapped } from '@/components';
import { FROM, TO } from '@/constants';

const DiffSelect = ({ decks, deck, deckTo, deckidFrom, deckidTo }) => {
  const navigate = useNavigate();

  const handleSwap = () => {
    navigate(`/diff/${deckidTo}/${deckidFrom}`);
  };

  return (
    <FlexGapped className="max-sm:flex-col max-sm:gap-1 max-sm:px-2 max-sm:pt-1">
      <div className="basis-full sm:basis-1/2">
        <DiffSelectDeck
          target={FROM}
          title="Deck You Edit:"
          deck={deck}
          decks={decks}
          deckidFrom={deckidFrom}
          deckidTo={deckidTo}
        />
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={handleSwap}>
          <ArrowLeftRight />
        </Button>
      </div>
      <div className="basis-full sm:basis-1/2">
        <DiffSelectDeck
          target={TO}
          title="Show Changes Against:"
          deck={deckTo}
          decks={decks}
          deckidFrom={deckidFrom}
          deckidTo={deckidTo}
        />
      </div>
    </FlexGapped>
  );
};

export default DiffSelect;
