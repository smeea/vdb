import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import CardPopover from './CardPopover.jsx';
import OverlayTooltip from './OverlayTooltip.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import DeckDrawProbabilityText from './DeckDrawProbabilityText.jsx';
import DeckDrawProbabilityModal from './DeckDrawProbabilityModal.jsx';
import drawProbability from './drawProbability.js';
import AppContext from '../../context/AppContext.js';

function DeckDrawLibraryTable(props) {
  const { nativeLibrary } = useContext(AppContext);
  let resultTrClass;
  const [modalDraw, setModalDraw] = useState(undefined);
  const N = props.total;
  const n = props.resultCards.length;

  const cardRows = props.resultCards.map((card, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    const k = props.library[card['Id']].q;

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td
            className="cost py-0 px-1"
            onClick={() => props.burnLibrary(index)}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => props.burnLibrary(index)}>
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td
            className="disciplines px-1"
            onClick={() => props.burnLibrary(index)}
          >
            <ResultLibraryDisciplines value={card['Discipline']} />
            <ResultLibraryClan value={card['Clan']} />
          </td>
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} showImage={props.showImage} />}
            >
              <td
                className="name px-1"
                onClick={() => props.burnLibrary(index)}
              >
                <ResultLibraryName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => props.burnLibrary(index)}>
              <ResultLibraryName card={card} />
            </td>
          )}
          <td className="burn px-1" onClick={() => props.burnLibrary(index)}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
          </td>
          <td className="prob px-1">
            {props.isMobile ? (
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
                <div>{`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}</div>
              </OverlayTooltip>
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
