import React, { useState } from 'react';
import {
  Tooltip,
  ResultLibraryTableRowCommon,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
} from '@/components';
import { drawProbability } from '@/utils';
import { useApp } from '@/context';

const DeckDrawLibraryTable = ({
  handleClick,
  restCards,
  resultCards,
  ashHeap,
  placement,
}) => {
  const { isMobile } = useApp();
  const [modalDraw, setModalDraw] = useState();

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

  const cardRows = resultCards.map((card, idx) => {
    const k = nonPlayed[card.Id];

    return (
      <tr
        key={`${idx}-${card.Id}`}
        className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
          idx % 2
            ? 'bg-bgThird dark:bg-bgThirdDark'
            : 'bg-bgPrimary dark:bg-bgPrimaryDark'
        }`}
      >
        <ResultLibraryTableRowCommon
          card={card}
          handleClick={handleClick}
          placement={placement}
        />
        <td className="w-9 text-right text-fgSecondary  dark:text-fgSecondaryDark">
          {!ashHeap && (
            <>
              {isMobile ? (
                <div
                  onClick={() =>
                    setModalDraw({
                      name: card['Name'],
                      prob: <DeckDrawProbabilityText N={N} n={n} k={k} />,
                    })
                  }
                >
                  {`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}
                </div>
              ) : (
                <Tooltip
                  placement={placement}
                  overlay={<DeckDrawProbabilityText N={N} n={n} k={k} />}
                >
                  <div>{`${Math.floor(
                    drawProbability(1, N, n, k) * 100
                  )}%`}</div>
                </Tooltip>
              )}
            </>
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
        <tbody>{cardRows}</tbody>
      </table>
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default DeckDrawLibraryTable;
