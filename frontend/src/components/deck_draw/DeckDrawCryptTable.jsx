import React, { useCallback } from 'react';
import { ResultCryptTableRowCommon, DeckDrawProbability, Tr } from '@/components';
import { getKeyDisciplines } from '@/utils';
import { ID, NAME } from '@/constants';

const DeckDrawCryptTable = ({
  handleClick,
  shouldShowModal,
  restCards,
  resultCards,
  ashHeap,
  crypt,
}) => {
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
            <Tr key={idx}>
              <ResultCryptTableRowCommon
                card={card}
                shouldShowModal={shouldShowModal}
                handleClick={onChange}
                keyDisciplines={keyDisciplines}
                disciplinesSet={disciplinesSet}
                inDeck
              />
              {!ashHeap && (
                <td className="text-fgSecondary dark:text-fgSecondaryDark min-w-[45px] p-1 text-right max-sm:hidden">
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
            </Tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckDrawCryptTable;
