import { useCallback } from 'react';
import {
  CardPopover,
  ConditionalTooltip,
  DeckCryptDisciplines,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptClanGroupTitle,
  ResultCryptDisciplines,
  ResultCryptGroup,
  ResultCryptSect,
  ResultCryptTitle,
  ResultName,
  ResultPathImage,
} from '@/components';
import { CLAN, DISCIPLINES, GROUP, PATH, SECT, TITLE } from '@/constants';
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
  idx,
}) => {
  const { isMobile, isNarrow, isDesktop, isWide } = useApp();
  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 17;

  const onClick = useCallback(() => {
    handleClick(idx || card);
  }, [card]);

  return (
    <>
      <td className="min-w-[28px] md:min-w-[35px]" onClick={onClick}>
        <div className="flex items-center justify-center">
          <ResultCryptCapacity card={card} />
        </div>
      </td>
      {!noDisciplines && (!inSearch || !isNarrow) && (
        <td className="sm:min-w-[170px]" onClick={onClick}>
          {inDeck && keyDisciplines && disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
            <DeckCryptDisciplines
              value={card[DISCIPLINES]}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
            />
          ) : (
            <ResultCryptDisciplines value={card[DISCIPLINES]} />
          )}
        </td>
      )}
      <td className="w-full" onClick={onClick}>
        <ConditionalTooltip
          overlay={<CardPopover card={card} />}
          disabled={isMobile || shouldShowModal}
          noPadding
          noClick
        >
          <div className="flex cursor-pointer px-1">
            <ResultName card={card} isBanned={isBanned} />
          </div>
        </ConditionalTooltip>
      </td>
      {((!isNarrow && !isDesktop) || isWide) && !inSearch ? (
        <>
          <td className="min-w-[25px]" onClick={onClick}>
            <div className="flex justify-center">
              <ResultCryptTitle value={card[TITLE]} />
            </div>
          </td>
          <td className="min-w-[25px]" onClick={onClick}>
            <div className="flex justify-center">
              {card[PATH] ? (
                <ResultPathImage value={card[PATH]} />
              ) : (
                <ResultCryptSect value={card[SECT]} />
              )}
            </div>
          </td>
          <td className="min-w-[35px]" onClick={onClick}>
            <div className="flex justify-center">
              <ResultClanImage value={card[CLAN]} />
            </div>
          </td>
          <td className="min-w-[30px]" onClick={onClick}>
            <div className="flex justify-center">
              <ResultCryptGroup value={card[GROUP]} />
            </div>
          </td>
        </>
      ) : (
        <td className="min-w-[40px]" onClick={onClick}>
          <ResultCryptClanGroupTitle card={card} />
        </td>
      )}
    </>
  );
};

export default ResultCryptTableRowCommon;
