import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  OverlayTooltip,
  ResultCryptCapacity,
  DeckCryptDisciplines,
  ResultCryptName,
  ResultCryptClan,
  ResultCryptGroup,
  ResultCryptTitle,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
} from 'components';

import drawProbability from 'components/drawProbability.js';
import { useApp } from 'context';

function DeckDrawCryptTable(props) {
  const { isMobile, isWide } = useApp();
  const [modalDraw, setModalDraw] = useState(undefined);
  let resultTrClass;

  let N = 0;
  let n = 0;
  const nonPlayed = {};

  if (props.restCards && props.resultCards) {
    N = props.restCards.length + props.resultCards.length;
    n = props.resultCards.length;

    [...props.restCards, ...props.resultCards].forEach((c) => {
      if (c.Id in nonPlayed) {
        nonPlayed[c.Id] += 1;
      } else {
        nonPlayed[c.Id] = 1;
      }
    });
  }

  const cardRows = props.resultCards.map((card, index) => {
    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const k = nonPlayed[card.Id];

    return (
      <React.Fragment key={`${index}-${card['Id']}`}>
        <tr className={resultTrClass}>
          <td
            className={isMobile ? 'capacity px-1' : 'capacity px-2'}
            onClick={() => props.handleClick(index)}
          >
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines" onClick={() => props.handleClick(index)}>
            <DeckCryptDisciplines
              value={card['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              nonKeyDisciplines={props.nonKeyDisciplines}
            />
          </td>
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} />}
            >
              <td
                className="name px-1"
                onClick={() => props.handleClick(index)}
              >
                <ResultCryptName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => props.handleClick(index)}>
              <ResultCryptName card={card} />
            </td>
          )}
          {isWide ? (
            <>
              <td
                className="title pe-2"
                onClick={() => props.handleClick(index)}
              >
                <ResultCryptTitle value={card['Title']} />
              </td>
              <td className="clan" onClick={() => props.handleClick(index)}>
                <ResultCryptClan value={card['Clan']} />
              </td>
              <td className="group" onClick={() => props.handleClick(index)}>
                <ResultCryptGroup value={card['Group']} />
              </td>
            </>
          ) : (
            <>
              {isMobile ? (
                <td
                  className="clan-group"
                  onClick={() => props.handleClick(index)}
                >
                  <div>
                    <ResultCryptClan value={card['Clan']} />
                  </div>
                  <div className="d-flex small justify-content-end">
                    <b>
                      <ResultCryptTitle value={card['Title']} />
                    </b>
                    <ResultCryptGroup value={card['Group']} />
                  </div>
                </td>
              ) : (
                <>
                  <td
                    className="title pe-2"
                    onClick={() => props.handleClick(index)}
                  >
                    <ResultCryptTitle value={card['Title']} />
                  </td>
                  <td
                    className="clan-group"
                    onClick={() => props.handleClick(index)}
                  >
                    <div>
                      <ResultCryptClan value={card['Clan']} />
                    </div>
                    <div className="d-flex small justify-content-end">
                      <ResultCryptGroup value={card['Group']} />
                    </div>
                  </td>
                </>
              )}
            </>
          )}
          <td className="prob px-1">
            {!props.ashHeap && (
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
                  <OverlayTooltip
                    placement="right"
                    text={<DeckDrawProbabilityText N={N} n={n} k={k} />}
                  >
                    <div>{`${Math.floor(
                      drawProbability(1, N, n, k) * 100
                    )}%`}</div>
                  </OverlayTooltip>
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
      <table className={props.className}>
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
}

export default DeckDrawCryptTable;
