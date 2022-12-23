import React, { useState } from 'react';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { useApp } from 'context';
import { TwdHallFameDeckBody } from 'components';
import { useDeck } from 'hooks';

const TwdHallFameDeckHeader = ({ deck, isStar }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();

  const [showDeck, setShowDeck] = useState(false);
  const [cards, setCards] = useState(null);

  const getCards = async () => {
    const url = `${process.env.API_URL}deck/${deck.deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    const result = await fetch(url, options).then((response) =>
      response.json()
    );

    const cardsData = useDeck(result.cards, cryptCardBase, libraryCardBase);
    setCards(cardsData);
  };

  const handleClick = async () => {
    if (!cards) await getCards();
    setShowDeck(!showDeck);
  };

  return (
    <div className="rounded-md border-2 border-borderPrimary dark:border-borderPrimaryDark">
      <div
        onClick={() => handleClick()}
        className={`link-like flex justify-between ${
          isStar ? 'font-bold' : ''
        }`}
      >
        <div className="flex items-center">
          {deck.players}
          <div className="flex   ">
            <PeopleFill viewBox="0 0 18 18" />
          </div>
          {`${deck.event}: ${deck.location}`}
        </div>
        <div className="whitespace-nowrap ">
          {isMobile ? deck.date.slice(0, 4) : deck.date}
        </div>
      </div>

      {showDeck && cards && (
        <div>
          <hr className="border-1 border-neutral-500" />
          {deck && (
            <TwdHallFameDeckBody
              deck={{
                ...deck,
                creation_date: deck.date,
                crypt: cards.crypt,
                library: cards.library,
              }}
              isMobile={isMobile}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TwdHallFameDeckHeader;
