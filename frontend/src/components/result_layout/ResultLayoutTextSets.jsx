import React from 'react';
import { Link } from 'react-router-dom';
import { CardImage, ConditionalTooltipOrModal } from '@/components';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { useApp } from '@/context';
import { POD, PLAYTEST, PROMO } from '@/utils/constants';

const PreconsDetailed = ({ sets, set }) => {
  return Object.keys(sets[set]).map((i) => {
    const abbrevs = {
      U: 'Uncommon',
      R: 'Rare',
      C: 'Common',
      V: 'Vampire',
    };

    if (setsAndPrecons[set].precons?.[i]) {
      return (
        <li key={`${set}-${i}`} className="whitespace-nowrap">
          <Link target="_blank" rel="noreferrer" to={`/decks/${set}:${i}`}>
            {setsAndPrecons[set].precons[i].name}
          </Link>{' '}
          - {sets[set][i]}x
        </li>
      );
    } else {
      if (set === PROMO) {
        return <li key={`${set}-${i}`}>{i}</li>;
      } else if (i !== 'DTC') {
        return <li key={`${set}-${i}`}>{abbrevs[i]}</li>;
      }
    }
  });
};

const PopoverSet = ({ card, set }) => {
  return (
    <div className="flex max-sm:flex-col sm:gap-2">
      <div className="flex flex-col gap-1 p-3 sm:min-w-[220px] sm:p-4">
        <div className="whitespace-nowrap">
          <b>{setsAndPrecons[set].name}</b>
          {![POD, PROMO, PLAYTEST].includes(set) && ' - ' + setsAndPrecons[set].date.slice(0, 4)}
        </div>
        {![POD, PROMO].includes(set) && (
          <ul className="flex flex-col gap-1">
            <PreconsDetailed sets={card.Set} set={set} />
          </ul>
        )}
      </div>
      <CardImage size="sm" card={card} set={set !== POD && set.toLowerCase()} />
    </div>
  );
};

const ResultLayoutTextSets = ({ card }) => {
  const { setShowFloatingButtons, playtestMode } = useApp();
  const byDate = (a, b) => setsAndPrecons[a].date > setsAndPrecons[b].date;

  return (
    <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
      {Object.keys(card.Set)
        .filter((set) => playtestMode || set !== PLAYTEST)
        .toSorted(byDate)
        .map((set) => {
          const preconsShort = Object.keys(card.Set[set]).join('/');

          return (
            <div className="inline-block whitespace-nowrap" key={set}>
              <ConditionalTooltipOrModal
                onClick={() => setShowFloatingButtons(false)}
                onClose={() => setShowFloatingButtons(true)}
                overlay={<PopoverSet card={card} set={set} />}
                placement="bottom"
                size="lg"
                noPadding
              >
                <div className="text-fgSecondary dark:text-fgPrimaryDark">
                  {set}
                  <div className="inline text-midGray dark:text-midGrayDark">
                    {preconsShort ? `:${preconsShort}` : null}
                  </div>
                </div>
              </ConditionalTooltipOrModal>
            </div>
          );
        })}
    </div>
  );
};

export default ResultLayoutTextSets;
