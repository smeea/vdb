import React from 'react';
import { ResultCryptTableRowCommon, DeckDrawProbability } from '@/components';
import { getKeyDisciplines } from '@/utils';
import { useApp } from '@/context';
import { ID, NAME } from '@/constants';

const DeckDrawCryptTable = ({
  handleClick,
  shouldShowModal,
  restCards,
  resultCards,
  ashHeap,
  crypt,
}) => {
  const { isMobile } = useApp();
  const { disciplinesSet, keyDisciplines } = getKeyDisciplines(crypt);

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
              <ResultCryptTableRowCommon
                card={card}
                shouldShowModal={shouldShowModal}
                handleClick={() => handleClick(card)}
                keyDisciplines={keyDisciplines}
                disciplinesSet={disciplinesSet}
                inDeck
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

export default DeckDrawCryptTable;
