import { twMerge } from 'tailwind-merge';
import { DisciplinesCryptSummary, ResultCryptCapacity } from '@/components';
import { CAPACITY, X } from '@/constants';
import { useApp } from '@/context';
import { countCards, countTotalCost, drawUniqueProbability } from '@/utils';

const UniqueDraw = ({ cards }) => {
  const { isMobile } = useApp();

  const quantityList = cards.map((card) => card.q);
  const probs = {};
  drawUniqueProbability(quantityList, 4).forEach((i, idx) => {
    if (i > 0 && i < 0.02) {
      probs[idx] = Math.round(i * 1000) / 10;
    } else if (i > 0.999) {
      probs[idx] = 100;
    } else if (i > 0) {
      probs[idx] = Math.round(i * 100);
    }
  });

  return (
    <div className={twMerge('flex', isMobile && Object.keys(probs).length > 2 ? 'gap-2' : 'gap-3')}>
      <>
        {Object.keys(probs).map((i) => {
          return (
            <div className="inline" key={i} title="Chance to draw X unique vampires">
              <div className="text-fgSecondary dark:text-fgSecondaryDark inline font-bold">
                {i}:
              </div>{' '}
              {probs[i]}%
            </div>
          );
        })}
      </>
    </div>
  );
};

const DeckCryptTotalInfo = ({ cards, disciplinesDetailed }) => {
  const cryptTotalQ = countCards(cards);
  const cryptTotalCap = countTotalCost(cards, CAPACITY);
  const cryptAvg = Math.round((cryptTotalCap / cryptTotalQ) * 100) / 100;

  return (
    <div className="bg-bgSecondary dark:bg-bgSecondaryDark flex flex-col gap-2 p-2">
      <div className="flex justify-between">
        <div className="flex gap-0.5" title="Average capacity">
          <div className="text-fgSecondary dark:text-fgSecondaryDark flex items-center gap-1">
            Avg.
            <ResultCryptCapacity card={{ [CAPACITY]: X }} />
          </div>
          <div>: {cryptAvg}</div>
        </div>
        <div className="flex gap-3">
          <div className="text-fgSecondary dark:text-fgSecondaryDark">Uniq:</div>
          <UniqueDraw cards={cards} />
        </div>
      </div>
      <DisciplinesCryptSummary disciplinesDetailed={disciplinesDetailed} />
    </div>
  );
};

export default DeckCryptTotalInfo;
