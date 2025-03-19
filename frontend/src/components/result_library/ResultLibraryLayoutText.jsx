import { twMerge } from 'tailwind-merge';
import {
  ButtonCloseModal,
  Hr,
  ResultLayoutTextText,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
  ResultLibraryTypeImage,
  ResultMiscImage,
  ResultName,
  ResultNameAka,
  ResultPathImage,
} from '@/components';
import {
  AKA,
  BANNED,
  BLOOD,
  BURN,
  CLAN,
  CONVICTION,
  DISCIPLINE,
  ID,
  PATH,
  PLAYTEST,
  POOL,
  REQUIREMENT,
  TRIFLE,
  TYPE,
} from '@/constants';
import { useApp } from '@/context';
import { getLegality } from '@/utils';

const Requirements = ({ card }) => {
  return (
    <div className="flex items-center gap-3">
      {!!(card[BLOOD] || card[POOL] || card[CONVICTION]) && (
        <div className="flex items-center justify-between">
          <ResultLibraryCost card={card} />
        </div>
      )}
      <div className="flex items-center gap-3">
        {(card[REQUIREMENT] || card[PATH] || card[CLAN] || card[DISCIPLINE]) && (
          <div className="flex items-center gap-2">
            <ResultLibraryRequirements value={card[REQUIREMENT]} />
            {(card[CLAN] || card[PATH] || card[DISCIPLINE]) && (
              <div className="flex gap-1.5">
                <ResultPathImage value={card[PATH]} />
                <ResultLibraryClan value={card[CLAN]} />
                <ResultLibraryDisciplines value={card[DISCIPLINE]} />
              </div>
            )}
          </div>
        )}
        {card[BURN] && <ResultMiscImage value={BURN} />}
        {card[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
      </div>
    </div>
  );
};

const ResultLibraryLayoutText = ({ card, handleClose, noClose, inPopover }) => {
  const { isNarrow, isMobile } = useApp();
  const legalRestriction = getLegality(card);
  const hasRequirements = !!(
    card[REQUIREMENT] ||
    card[CLAN] ||
    card[PATH] ||
    card[DISCIPLINE] ||
    card[TRIFLE] ||
    card[BURN] ||
    card[BLOOD] ||
    card[CONVICTION] ||
    card[POOL]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className={twMerge(
            'flex justify-between gap-3 whitespace-nowrap',
            (isMobile || inPopover) && 'flex-col gap-1.5',
          )}
        >
          <div className="flex items-center justify-between gap-2 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <ResultLibraryTypeImage value={card[TYPE]} />
              <div className="font-bold">
                <ResultName card={card} />
              </div>
            </div>
          </div>
          {card[AKA] && <ResultNameAka card={card} />}
        </div>
        <div
          className={
            noClose || inPopover || isNarrow
              ? 'hidden max-h-0 max-w-0 opacity-0'
              : 'flex justify-center'
          }
        >
          <ButtonCloseModal handleClick={handleClose} />
        </div>
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card[ID]} />
      </div>
      <Hr />
      {hasRequirements && (
        <>
          <Requirements card={card} />
          <Hr />
        </>
      )}
      {card[BANNED] && (
        <div className="text-fgRed dark:text-fgRedDark" title={`Banned in ${card[BANNED]}`}>
          Banned in {card[BANNED]}
        </div>
      )}
      {legalRestriction && legalRestriction !== PLAYTEST && (
        <div
          className="text-fgRed dark:text-fgRedDark"
          title={`Not Tournament Legal until ${legalRestriction}`}
        >
          Not Tournament Legal until {legalRestriction}
        </div>
      )}
    </div>
  );
};

export default ResultLibraryLayoutText;
