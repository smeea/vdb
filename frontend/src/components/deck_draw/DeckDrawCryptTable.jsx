import React from 'react';
import { ResultCryptTableRowCommon, DeckDrawProbability } from '@/components';
import { useKeyDisciplines } from '@/hooks';
import { useApp } from '@/context';

const DeckDrawCryptTable = ({
  handleClick,
  shouldShowModal,
  restCards,
  resultCards,
  ashHeap,
  crypt,
}) => {
  const { isMobile } = useApp();
  const { disciplinesSet, keyDisciplines } = useKeyDisciplines(crypt);

  const N = restCards && resultCards ? restCards.length + resultCards.length : 0;
  const n = resultCards ? resultCards.length : 0;
  const nonPlayed = {};

  if (restCards && resultCards) {
    [...restCards, ...resultCards].forEach((c) => {
      if (c.Id in nonPlayed) {
        nonPlayed[c.Id] += 1;
      } else {
        nonPlayed[c.Id] = 1;
      }
    });
  }

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {resultCards.map((card, idx) => {
          return (
            <tr
              key={`${idx}-${card.Id}`}
              className="row-bg h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark"
            >
              <ResultCryptTableRowCommon
                card={card}
                shouldShowModal={shouldShowModal}
                handleClick={() => handleClick(idx)}
                keyDisciplines={keyDisciplines}
                disciplinesSet={disciplinesSet}
                inDeck
              />
              {(!ashHeap || !isMobile) && (
                <td className="min-w-[45px] p-1 text-right text-fgSecondary dark:text-fgSecondaryDark">
                  {!ashHeap && (
                    <DeckDrawProbability cardName={card.Name} N={N} n={n} k={nonPlayed[card.Id]} />
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
