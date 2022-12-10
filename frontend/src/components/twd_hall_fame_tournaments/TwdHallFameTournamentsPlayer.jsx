import React from 'react';
import { Disclosure } from '@headlessui/react';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import StarFill from 'assets/images/icons/star-fill.svg';
import { TwdHallFameDeckHeader } from 'components';

const testStar = (eventName) => {
  return (
    RegExp(
      /(NAC|NC|EC|RESAC|SAC|ACC|Continental Championship) \d{4}( -- |$)/i,
      'i'
    ).test(eventName) ||
    RegExp(/(NAC|NC|EC) \d{4} Day 2$/i, 'i').test(eventName)
  );
};

const TwdHallFameTournamentsPlayer = ({ name, decks }) => {
  const getStars = (decks) => {
    let stars = 0;
    decks.map((deck) => {
      if (testStar(deck['event'])) {
        stars += 1;
      }
    });

    return stars;
  };

  const byDate = (a, b) => {
    return b.date - a.date;
  };

  const starsQty = getStars(decks);
  const stars = [];
  for (let i = 0; i < starsQty; i++) {
    stars.push(<StarFill key={i} height="13" width="12" viewBox="0 0 18 18" />);
  }

  return (
    <>
      <Disclosure.Button>
        <div className="flex items-center">
          {Object.keys(decks).length}
          <div className="pl-1 pr-3 flex">
            <TrophyFill height="13" width="13" viewBox="0 0 18 18" />
          </div>
          <div className="flex items-center whitespace-nowrap">
            {name}
            <div
              className="flex px-1 pt-1"
              title="National or Continental Championships (in bold below)"
            >
              {stars}
            </div>
          </div>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className="p-0">
        {decks.sort(byDate).map((deck) => {
          return (
            <TwdHallFameDeckHeader
              key={deck.deckid}
              deck={{ ...deck, author: name }}
              isStar={testStar(deck['event'])}
            />
          );
        })}
      </Disclosure.Panel>
    </>
  );
};

export default TwdHallFameTournamentsPlayer;
