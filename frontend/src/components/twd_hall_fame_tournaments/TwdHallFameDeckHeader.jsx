import React, { useState } from 'react';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { useApp } from 'context';
import { Hr, TwdHallFameDeckBody } from 'components';
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
    <div className="bg-bgPrimary dark:bg-bgPrimaryDark rounded-md border-2 border-borderPrimary dark:border-borderPrimaryDark p-2.5">
      <div
        onClick={() => handleClick()}
        className={`flex justify-between text-fgSecondary hover:underline dark:text-fgSecondaryDark ${
          isStar ? 'font-bold' : ''
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div>{deck.players}</div>
            <div className="flex items-center">
              <PeopleFill width="15" height="15" viewBox="0 0 16 16" />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div>{`${deck.event}: ${deck.location}`}</div>
          </div>
        </div>
        <div className="whitespace-nowrap ">
          {isMobile ? deck.date.slice(0, 4) : deck.date}
        </div>
      </div>
      {showDeck && cards && (
        <div>
          <Hr variant="secondary" className="my-2" />
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
