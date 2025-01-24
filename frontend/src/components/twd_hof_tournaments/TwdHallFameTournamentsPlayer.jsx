import React from 'react';
import { Disclosure } from '@headlessui/react';
import TrophyFill from '@icons/trophy-fill.svg?react';
import StarFill from '@icons/star-fill.svg?react';
import { TwdHallFameDeckHeader } from '@/components';
import { AUTHOR, DATE, DECKID } from '@/constants';

const testStar = (eventName) => {
  return (
    RegExp(/(NAC|NC|EC|RESAC|SAC|ACC|Continental Championship) \d{4}( -- |$)/i, 'i').test(
      eventName,
    ) || RegExp(/(NAC|NC|EC) \d{4} Day 2$/i, 'i').test(eventName)
  );
};

const TwdHallFameTournamentsPlayer = ({ name, decks }) => {
  const getStars = (decks) => {
    let stars = 0;
    decks.forEach((deck) => {
      if (testStar(deck['event'])) {
        stars += 1;
      }
    });

    return stars;
  };

  const byDate = (a, b) => {
    return b[DATE] - a[DATE];
  };

  const starsQty = getStars(decks);
  const stars = [];
  for (let i = 0; i < starsQty; i++) {
    stars.push(<StarFill key={i} height="13" width="12" viewBox="0 0 18 18" />);
  }

  return (
    <div className="border-borderPrimary bg-bgThird dark:border-borderPrimaryDark dark:bg-bgThirdDark rounded-sm border">
      <Disclosure.Button className="w-full p-3">
        <div className="text-fgName dark:text-fgNameDark flex items-center gap-4 px-2">
          <div className="flex items-center gap-1">
            {Object.keys(decks).length}
            <TrophyFill width="13" height="13" viewBox="0 0 16 16" />
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <div>{name}</div>
            <div
              className="flex items-center"
              title="National or Continental Championships (in bold below)"
            >
              {stars}
            </div>
          </div>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel>
        <div className="flex flex-col gap-1.5 px-2">
          {decks.toSorted(byDate).map((deck) => {
            return (
              <TwdHallFameDeckHeader
                key={deck[DECKID]}
                deck={{ ...deck, [AUTHOR]: name }}
                isStar={testStar(deck['event'])}
              />
            );
          })}
        </div>
      </Disclosure.Panel>
    </div>
  );
};

export default TwdHallFameTournamentsPlayer;
