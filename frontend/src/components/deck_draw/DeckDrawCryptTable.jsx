import { DeckDrawProbability, ResultCryptTableRowCommon, Tr } from "@/components";
import { ID, NAME } from "@/constants";
import { getKeyDisciplines } from "@/utils";
import { useCallback } from "react";

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
    <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
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
                idx={idx}
                inDeck
              />
              {!ashHeap && (
                <td className="min-w-[45px] p-1 text-right text-fgSecondary max-sm:hidden dark:text-fgSecondaryDark">
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
