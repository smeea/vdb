import React, { useState } from 'react';
import {
  CardPopover,
  Tooltip,
  ResultCryptCapacity,
  DeckCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ConditionalTooltip,
} from 'components';

import { drawProbability } from 'utils';
import { useApp } from 'context';

const DeckDrawCryptTable = ({
  handleClick,
  restCards,
  resultCards,
  className,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  ashHeap,
}) => {
  const { isMobile, isWide } = useApp();
  const [modalDraw, setModalDraw] = useState(undefined);

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
      <React.Fragment key={`${idx}-${card.Id}`}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          <td
            className={isMobile ? 'capacity px-1' : 'capacity px-2'}
            onClick={() => handleClick(idx)}
          >
            <ResultCryptCapacity value={card.Capacity} />
          </td>
          <td className="disciplines" onClick={() => handleClick(idx)}>
            <DeckCryptDisciplines
              value={card.Disciplines}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              nonKeyDisciplines={nonKeyDisciplines}
            />
          </td>
          <td className="name px-1" onClick={() => handleClick(idx)}>
            <ConditionalTooltip
              overlay={<CardPopover card={card} />}
              disabled={isMobile}
            >
              <ResultCryptName card={card} />
            </ConditionalTooltip>
          </td>
          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick(idx)}>
                <ResultCryptTitle value={card.Title} />
              </td>
              <td className="clan" onClick={() => handleClick(idx)}>
                <ResultClanImage value={card.Clan} />
              </td>
              <td className="group" onClick={() => handleClick(idx)}>
                <ResultCryptGroup value={card.Group} />
              </td>
            </>
          ) : (
            <td className="clan-group" onClick={() => handleClick(idx)}>
              <div>
                <ResultClanImage value={card.Clan} />
              </div>
              <div className="flex text-xs justify-end">
                <div className="font-bold text-blue">
                  <ResultCryptTitle value={card.Title} />
                </div>
                <ResultCryptGroup value={card.Group} />
              </div>
            </td>
          )}
          <td className="text-blue text-right w-9 px-1">
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
                    placement="right"
                    text={<DeckDrawProbabilityText N={N} n={n} k={k} />}
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
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={className}>
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

export default DeckDrawCryptTable;
