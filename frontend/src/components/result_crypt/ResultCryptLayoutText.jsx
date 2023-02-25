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
  ResultCryptName,
  ResultLayoutTextText,
} from '@/components';

const ResultCryptLayoutText = ({ card, setCard, handleClose, noClose }) => {
  const { isNarrow, isMobile, cryptCardBase } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <ResultClanImage value={card.Clan} />
          <div className="space-x-2 font-bold text-fgName dark:text-fgNameDark">
            <ResultCryptName card={card} />
            {card.Adv[1] && (
              <ConditionalTooltip
                overlay={<CardPopover card={cryptCardBase[card.Adv[1]]} />}
                disabled={isMobile}
              >
                <div
                  className="inline text-fgSecondary dark:text-fgSecondaryDark"
                  onClick={() => setCard(cryptCardBase[card.Adv[1]])}
                >
                  [see {`${card.Adv[0] ? 'Base' : 'Adv'}`}]
                </div>
              </ConditionalTooltip>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ResultCryptGroup value={card.Group} />
          <div
            className={
              noClose || isNarrow
                ? 'max-h-0 max-w-0 opacity-0 hidden'
                : 'flex justify-center'
            }
          >
            <ButtonCloseModal handleClose={handleClose} />
          </div>
        </div>
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
    </div>
  );
};

export default ResultCryptLayoutText;
