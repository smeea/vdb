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
    <>
      <div className="border-thick m-md-2 m-1 p-2">
        <div
          onClick={() => handleClick()}
          className={`link-like flex justify-between ${isStar ? 'bold' : ''}`}
        >
          <div className="flex items-center">
            {deck.players}
            <div className="pl-1 pr-3 flex pt-1">
              <PeopleFill viewBox="0 0 18 18" />
            </div>
            {`${deck.event}: ${deck.location}`}
          </div>
          <div className="pl-2 whitespace-nowrap">
            {isMobile ? deck.date.slice(0, 4) : deck.date}
          </div>
        </div>

        {showDeck && cards && (
          <div className="p-0">
            <hr />
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
    </>
  );
};

export default TwdHallFameDeckHeader;
