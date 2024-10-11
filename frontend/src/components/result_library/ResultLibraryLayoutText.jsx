import React from 'react';
import {
  ButtonCloseModal,
  Hr,
  ResultLayoutTextText,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
  ResultMiscImage,
  ResultName,
  ResultNameAka,
  ResultLibraryTypeImage,
} from '@/components';
import { getLegality } from '@/utils';
import { useApp } from '@/context';
import {
  AKA,
  BANNED,
  BLOOD_COST,
  BURN_OPTION,
  CLAN,
  DISCIPLINE,
  PLAYTEST,
  POOL_COST,
  REQUIREMENT,
  TRIFLE,
} from '@/utils/constants';

const Requirements = ({ card }) => {
  return (
    <div className="flex items-center gap-3">
      {(card[BLOOD_COST] || card[POOL_COST]) && (
        <div className="flex items-center justify-between">
          <ResultLibraryCost valuePool={card[POOL_COST]} valueBlood={card[BLOOD_COST]} />
        </div>
      )}
      <div className="flex items-center gap-3">
        {(card[REQUIREMENT] || card[CLAN] || card[DISCIPLINE]) && (
          <div className="flex items-center gap-2">
            {card[REQUIREMENT] && <ResultLibraryRequirements value={card[REQUIREMENT]} />}
            {(card[CLAN] || card[DISCIPLINE]) && (
              <div className="flex gap-1.5">
                {card[CLAN] && <ResultLibraryClan value={card[CLAN]} />}
                {card[DISCIPLINE] && <ResultLibraryDisciplines value={card[DISCIPLINE]} />}
              </div>
            )}
          </div>
        )}
        {card[BURN_OPTION] && <ResultMiscImage value={BURN_OPTION} />}
        {card[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
      </div>
    </div>
  );
};

const ResultLibraryLayoutText = ({ card, handleClose, noClose, inPopover }) => {
  const { isNarrow, isMobile } = useApp();
  const legalRestriction = getLegality(card);
  const hasRequirements =
    card[REQUIREMENT] ||
    card[CLAN] ||
    card[DISCIPLINE] ||
    card[TRIFLE] ||
    card[BURN_OPTION] ||
    card[BLOOD_COST] ||
    card[POOL_COST];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div
          className={`${isMobile || inPopover ? 'flex-col' : ''} flex justify-between gap-1 whitespace-nowrap sm:gap-3`}
        >
          <div className="flex items-center justify-between gap-2 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <ResultLibraryTypeImage value={card.Type} />
              <div className="space-x-1 font-bold text-fgName dark:text-fgNameDark">
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
        <ResultLayoutTextText cardid={card.Id} />
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
