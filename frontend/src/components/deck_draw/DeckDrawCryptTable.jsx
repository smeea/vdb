import React from 'react';
import { ResultCryptTableRowCommon, DeckDrawProbability } from '@/components';
import { useKeyDisciplines } from '@/hooks';

const DeckDrawCryptTable = ({
  handleClick,
  restCards,
  resultCards,
  ashHeap,
  crypt,
}) => {
  let N = 0;
  let n = 0;
  const nonPlayed = {};

  if (restCards && resultCards) {
    N = restCards.length + resultCards.length;
    n = resultCards.length;

    [...restCards, ...resultCards].forEach((c) => {
      if (c.Id in nonPlayed) {
        nonPlayed[c.Id] += 1;
      } else {
        nonPlayed[c.Id] = 1;
      }
    });
  }

  const { disciplinesSet, keyDisciplines } = useKeyDisciplines(crypt);

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {resultCards.map((card, idx) => {
          return (
            <tr
              key={`${idx}-${card.Id}`}
              className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
                idx % 2
                  ? 'bg-bgThird dark:bg-bgThirdDark'
                  : 'bg-bgPrimary dark:bg-bgPrimaryDark'
              } `}
            >
              <ResultCryptTableRowCommon
                card={card}
                handleClick={() => handleClick(idx)}
                keyDisciplines={keyDisciplines}
                disciplinesSet={disciplinesSet}
                inDeck
              />
              <td className="w-9 text-right text-fgSecondary  dark:text-fgSecondaryDark">
                {!ashHeap && (
                  <DeckDrawProbability
                    cardName={card.Name}
                    N={N}
                    n={n}
                    k={nonPlayed[card.Id]}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckDrawCryptTable;
