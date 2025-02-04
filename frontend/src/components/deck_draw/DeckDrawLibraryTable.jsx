import React, { useCallback } from 'react';
import { ResultLibraryTableRowCommon, DeckDrawProbability } from '@/components';
import { useApp } from '@/context';
import { ID, NAME } from '@/constants';

const DeckDrawLibraryTable = ({
  handleClick,
  shouldShowModal,
  restCards,
  resultCards,
  ashHeap,
}) => {
  const { isMobile } = useApp();

  const N = restCards && resultCards ? restCards.length + resultCards.length : 0;
  const n = resultCards ? resultCards.length : 0;
  const nonPlayed = {};

  if (restCards && resultCards) {
    [...restCards, ...resultCards].forEach((c) => {
      if (c[ID] in nonPlayed) {
        nonPlayed[c[ID]] += 1;
      } else {
        nonPlayed[c[ID]] = 1;
      }
    });
  }

  const onChange = useCallback(
    (idx) => {
      handleClick(idx);
    },
    [handleClick],
  );

  return (
    <table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
      <tbody>
        {resultCards.map((card, idx) => {
          return (
            <tr
              key={idx}
              className="row-bg border-bgSecondary dark:border-bgSecondaryDark h-[38px] border-y"
            >
              <ResultLibraryTableRowCommon
                card={card}
                handleClick={onChange}
                shouldShowModal={shouldShowModal}
              />
              {(!ashHeap || !isMobile) && (
                <td className="text-fgSecondary dark:text-fgSecondaryDark min-w-[45px] text-right sm:p-1">
                  {!ashHeap && (
                    <DeckDrawProbability
                      cardName={card[NAME]}
                      N={N}
                      n={n}
                      k={nonPlayed[card[ID]]}
                    />
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckDrawLibraryTable;
