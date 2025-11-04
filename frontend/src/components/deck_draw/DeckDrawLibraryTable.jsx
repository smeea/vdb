import { DeckDrawProbability, ResultLibraryTableRowCommon, Tr } from "@/components";
import { ID, NAME } from "@/constants";

const DeckDrawLibraryTable = ({
  handleClick,
  shouldShowModal,
  restCards,
  resultCards,
  ashHeap,
}) => {
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

  const onChange = (idx) => handleClick(idx);

  return (
    <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
      <tbody>
        {resultCards.map((card, idx) => {
          return (
            <Tr key={idx}>
              <ResultLibraryTableRowCommon
                card={card}
                handleClick={onChange}
                idx={idx}
                shouldShowModal={shouldShowModal}
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

export default DeckDrawLibraryTable;
