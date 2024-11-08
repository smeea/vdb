import React from 'react';
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

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {resultCards.map((card, idx) => {
          return (
            <tr
              key={`${idx}-${card[ID]}`}
              className="row-bg h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark"
            >
              <ResultLibraryTableRowCommon
                card={card}
                handleClick={() => handleClick(idx)}
                shouldShowModal={shouldShowModal}
              />
              {(!ashHeap || !isMobile) && (
                <td className="min-w-[45px] text-right text-fgSecondary dark:text-fgSecondaryDark sm:p-1">
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
