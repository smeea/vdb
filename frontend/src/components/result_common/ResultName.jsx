import { twMerge } from 'tailwind-merge';
import { ResultLegalIcon } from '@/components';
import { ADV, BANNED, ID, NAME, PLAYTEST } from '@/constants';
import { getLegality } from '@/utils';

const ResultName = ({ card, isBanned, isColored = true }) => {
  const legalRestriction = getLegality(card);

  return (
    <div
      className={twMerge(
        'print:dark:text-fgName inline-flex items-center gap-1 whitespace-nowrap',
        isColored && 'text-fgName dark:text-fgNameDark',
      )}
    >
      <div
        className={twMerge(
          'inline whitespace-normal',
          (card[BANNED] || isBanned) && 'line-through',
        )}
      >
        {card[NAME]}
      </div>
      {card[ID] > 200000 && card[ADV][0] && (
        <div className="inline whitespace-nowrap">
          <img
            className="mb-1 inline"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
            width="12"
          />
        </div>
      )}
      {card[BANNED] && <ResultLegalIcon type={BANNED} value={card[BANNED]} />}
      {isBanned && <div className="text-fgRed dark:text-fgRedDark inline">[Limited]</div>}
      {legalRestriction && <ResultLegalIcon type={PLAYTEST} value={legalRestriction} />}
    </div>
  );
};

export default ResultName;
