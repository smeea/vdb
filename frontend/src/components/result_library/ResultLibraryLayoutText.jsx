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
import { AKA, BLOOD_COST, POOL_COST, BURN_OPTION, TRIFLE, PLAYTEST } from '@/utils/constants';

const Requirements = ({ card, noClose, handleClose, inPopover }) => {
  const { isNarrow } = useApp();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {card.Requirement && <ResultLibraryRequirements value={card.Requirement} />}
        <div className="flex gap-1.5">
          {card.Discipline && <ResultLibraryDisciplines value={card.Discipline} />}
          {card.Clan && <ResultLibraryClan value={card.Clan} />}
        </div>
      </div>
      {card[BURN_OPTION] && <ResultMiscImage value={BURN_OPTION} />}
      {card[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
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
  );
};

const ResultLibraryLayoutText = ({ card, handleClose, noClose, inPopover }) => {
  const { isMobile } = useApp();
  const legalRestriction = getLegality(card);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div
          className={`${isMobile || inPopover ? 'basis-full flex-col items-start' : 'items-center'} flex justify-between gap-1 whitespace-nowrap sm:gap-3`}
        >
          <div
            className={`flex items-center justify-between gap-2 whitespace-nowrap ${isMobile || inPopover ? 'w-full' : ''}`}
          >
            <div className="flex items-center gap-2">
              <ResultLibraryTypeImage value={card.Type} />
              <div className="space-x-1 font-bold text-fgName dark:text-fgNameDark">
                <ResultName card={card} />
              </div>
            </div>
            {(isMobile || inPopover) && (
              <Requirements
                card={card}
                noClose={noClose}
                handleClose={handleClose}
                inPopover={inPopover}
              />
            )}
          </div>
          {card[AKA] && <ResultNameAka card={card} />}
        </div>
        {!(isMobile || inPopover) && (
          <Requirements
            card={card}
            noClose={noClose}
            handleClose={handleClose}
            inPopover={inPopover}
          />
        )}
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card.Id} />
      </div>
      <Hr />
      {(card[BLOOD_COST] || card[POOL_COST]) && (
        <>
          <div className="flex items-center justify-between">
            <ResultLibraryCost valuePool={card[POOL_COST]} valueBlood={card[BLOOD_COST]} />
          </div>
          <Hr />
        </>
      )}
      {card.Banned && (
        <div className="text-fgRed dark:text-fgRedDark" title={`Banned in ${card.Banned}`}>
          Banned in {card.Banned}
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
