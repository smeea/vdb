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
      <td
        className={isMobile ? 'capacity' : 'capacity'}
        onClick={() => handleClick(card)}
      >
        <ResultCryptCapacity value={card.Capacity} />
      </td>
      {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
        <td className="disciplines" onClick={() => handleClick(card)}>
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
      <td
        className="name text-fgName dark:text-fgNameDark"
        onClick={() => handleClick(card)}
      >
        <ConditionalTooltip
          placement={placement}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
          noPadding
        >
          <ResultCryptName card={card} />
        </ConditionalTooltip>
      </td>
      {isWide ? (
        <>
          <td className="title" onClick={() => handleClick(card)}>
            {card.Title && <ResultCryptTitle value={card.Title} />}
          </td>
          <td className="clan" onClick={() => handleClick(card)}>
            <ResultClanImage value={card.Clan} />
          </td>
          <td className="group" onClick={() => handleClick(card)}>
            <ResultCryptGroup value={card.Group} />
          </td>
        </>
      ) : (
        <>
          <td className="clan-group" onClick={() => handleClick(card)}>
            <div>
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="flex justify-end text-xs">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                {card.Title && <ResultCryptTitle value={card.Title} />}
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </td>
        </>
      )}
    </>
  );
};

export default ResultCryptTableRowCommon;
