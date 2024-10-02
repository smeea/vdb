import React from 'react';
import { useApp } from '@/context';
import {
  ButtonCloseModal,
  CardPopover,
  ConditionalTooltip,
  Hr,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptGroup,
  ResultName,
  ResultNameAka,
  ResultLayoutTextText,
} from '@/components';
import { getLegality } from '@/utils';
import { AKA, PLAYTEST } from '@/utils/constants';

const Group = ({ card, noClose, handleClose, inPopover }) => {
  const { isNarrow } = useApp();

  return (
    <div className="flex items-center space-x-3">
      <ResultCryptGroup value={card.Group} />
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

const ResultCryptLayoutText = ({ card, setCard, handleClose, noClose, inPopover }) => {
  const { isNarrow, isMobile, cryptCardBase } = useApp();
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
              <ResultClanImage value={card.Clan} />
              <div className="space-x-2 font-bold text-fgName dark:text-fgNameDark">
                <ResultName card={card} />
                {card.Adv[1] && (
                  <ConditionalTooltip
                    overlay={<CardPopover card={cryptCardBase[card.Adv[1]]} />}
                    disabled={isMobile}
                    noPadding
                  >
                    <div
                      className="inline text-fgSecondary dark:text-fgSecondaryDark"
                      onClick={() => setCard(cryptCardBase[card.Adv[1]])}
                    >
                      {inPopover ? (
                        <>
                          {!card.Adv[0] && (
                            <div className="inline-flex items-center">
                              [has
                              <img
                                className="ml-1 inline-flex items-center"
                                src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
                                title="Advanced"
                                width="12"
                              />
                              ]
                            </div>
                          )}
                        </>
                      ) : (
                        <>[see {`${card.Adv[0] ? 'Base' : 'Adv'}`}]</>
                      )}
                    </div>
                  </ConditionalTooltip>
                )}
              </div>
            </div>
            {(isMobile || inPopover) && (
              <Group
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
          <Group card={card} noClose={noClose} handleClose={handleClose} inPopover={inPopover} />
        )}
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card.Id} />
      </div>
      <Hr />
      <div className="flex items-center justify-between">
        <ResultCryptDisciplines value={card.Disciplines} />
        <ResultCryptCapacity card={card} />
      </div>
      <Hr />
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

export default ResultCryptLayoutText;
