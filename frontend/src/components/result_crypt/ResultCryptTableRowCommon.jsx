import React from 'react';
import {
  CardPopover,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  DeckCryptDisciplines,
  ResultName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultCryptClanGroupTitle,
  ConditionalTooltip,
} from '@/components';
import { useApp } from '@/context';

const ResultCryptTableRowCommon = ({
  card,
  handleClick,
  keyDisciplines,
  disciplinesSet,
  inSearch,
  inDeck,
  noDisciplines,
  shouldShowModal,
  isBanned,
}) => {
  const { isMobile, isNarrow, isWide } = useApp();
  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 17;

  return (
    <>
      <td className="min-w-[25px] md:min-w-[35px]" onClick={() => handleClick(card)}>
        <div className="flex items-center justify-center">
          <ResultCryptCapacity card={card} />
        </div>
      </td>
      {!noDisciplines && (!inSearch || !isNarrow) && (
        <td className="sm:min-w-[170px]" onClick={() => handleClick(card)}>
          {inDeck && keyDisciplines && disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
            <DeckCryptDisciplines
              value={card.Disciplines}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
            />
          ) : (
            <ResultCryptDisciplines value={card.Disciplines} />
          )}
        </td>
      )}
      <td className="w-full" onClick={() => handleClick(card)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card} />}
          disabled={isMobile || shouldShowModal}
          noPadding
        >
          <div className="flex cursor-pointer px-1">
            <ResultName card={card} isBanned={isBanned} />
          </div>
        </ConditionalTooltip>
      </td>
      {isWide && !inSearch ? (
        <>
          <td className="min-w-[25px]" onClick={() => handleClick(card)}>
            <div className="flex justify-center">
              {card.Title && <ResultCryptTitle value={card.Title} />}
            </div>
          </td>
          <td className="min-w-[35px]" onClick={() => handleClick(card)}>
            <div className="flex justify-center">
              <ResultClanImage value={card.Clan} />
            </div>
          </td>
          <td className="min-w-[30px]" onClick={() => handleClick(card)}>
            <div className="flex justify-center">
              <ResultCryptGroup value={card.Group} />
            </div>
          </td>
        </>
      ) : (
        <td className="min-w-[40px]" onClick={() => handleClick(card)}>
          <ResultCryptClanGroupTitle card={card} />
        </td>
      )}
    </>
  );
};

export default ResultCryptTableRowCommon;
