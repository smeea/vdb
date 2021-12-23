import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  OverlayTooltip,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ConditionalOverlayTrigger,
} from 'components';

import drawProbability from 'components/drawProbability.js';
import { useApp } from 'context';

function DeckDrawLibraryTable(props) {
  const { nativeLibrary, isMobile } = useApp();
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
            className={card['Blood Cost'] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => props.handleClick(index)}>
            <ResultLibraryTypeImage value={card['Type']} />
          </td>
          <td
            className="disciplines px-1"
            onClick={() => props.handleClick(index)}
          >
            <ResultLibraryDisciplines value={card['Discipline']} />
            <ResultLibraryClan value={card['Clan']} />
          </td>

          <ConditionalOverlayTrigger
            placement={props.placement ? props.placement : 'right'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-1" onClick={() => props.handleClick(index)}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalOverlayTrigger>

          <td className="burn px-1" onClick={() => props.handleClick(index)}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
          </td>
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
      <table className="search-library-table">
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

export default DeckDrawLibraryTable;
