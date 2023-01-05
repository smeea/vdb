import React from 'react';
import {
  CardPopover,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  DeckCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultCryptClanGroupTitle,
  ConditionalTooltip,
} from 'components';
import { useApp } from 'context';

const ResultCryptTableRowCommon = ({
  card,
  handleClick,
  placement,
  maxDisciplines,
  keyDisciplines,
  nonKeyDisciplines,
  disciplinesSet,
  inSearch,
  inDeck,
}) => {
  const { isMobile, isDesktop, isNarrow, isWide } = useApp();
  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 17;

  return (
    <>
      <td className="min-w-[25px]" onClick={() => handleClick(card)}>
        <ResultCryptCapacity value={card.Capacity} />
      </td>
      {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
        <td className="min-w-[170px]" onClick={() => handleClick(card)}>
          {inDeck &&
          keyDisciplines &&
          disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
            <DeckCryptDisciplines
              value={card.Disciplines}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              nonKeyDisciplines={nonKeyDisciplines}
            />
          ) : (
            <ResultCryptDisciplines
              value={card.Disciplines}
              maxDisciplines={maxDisciplines}
            />
          )}
        </td>
      )}
      <td className="w-full" onClick={() => handleClick(card)}>
        <ConditionalTooltip
          placement={placement}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
          noPadding
        >
          <div className="flex">
            <ResultCryptName card={card} />
          </div>
        </ConditionalTooltip>
      </td>
      {isWide ? (
        <>
          <td className="min-w-[25px]" onClick={() => handleClick(card)}>
            {card.Title && <ResultCryptTitle value={card.Title} />}
          </td>
          <td className="min-w-[35px]" onClick={() => handleClick(card)}>
            <ResultClanImage value={card.Clan} />
          </td>
          <td className="min-w-[15px]" onClick={() => handleClick(card)}>
            <ResultCryptGroup value={card.Group} />
          </td>
        </>
      ) : (
        <>
          <td className="min-w-[50px]" onClick={() => handleClick(card)}>
            <ResultCryptClanGroupTitle card={card} />
          </td>
        </>
      )}
    </>
  );
};

export default ResultCryptTableRowCommon;
