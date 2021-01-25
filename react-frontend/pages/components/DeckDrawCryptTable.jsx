import React, { useState } from 'react';
import OverlayTooltip from './OverlayTooltip.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

const probability = (x, N, n, k) => {
  const factorial = n => {
    return n ? n * factorial(n - 1) : 1;
  }

  const combinations = (n, r) => {
    return factorial(n) / (factorial(r) * factorial(n - r))
  }

  const exactProbability = (i, N, n, k) => {
    return combinations(k, i) * combinations(N - k, n - i) / combinations(N, n)
  }

  let prob = 0;
  for (let i = 0; i <= n; i++ ) {
    if (i >= x && i <= k) {
      if (N - n < k) {
        prob = 1;
        continue;
      } else {
        prob += exactProbability(i, N, n, k)
      }
    }
  }
  if (0.99 < prob && prob < 1) { prob = 0.99}
  if (0 < prob && prob < 0.01) { prob = 0.01}
  return prob;
}

function ResultCryptTable(props) {
  let resultTrClass;

  const [modalCard, setModalCard] = useState(undefined);

  const N = props.total
  const n = props.resultCards.length

  const cardRows = props.resultCards.map((card, index) => {
    if (resultTrClass == 'crypt-result-even') {
      resultTrClass = 'crypt-result-odd';
    } else {
      resultTrClass = 'crypt-result-even';
    }

    const k = props.crypt[card['Id']].q

    const probText = (
      <div className="prob">
        <div className="d-flex justify-content-between">
          <div className="pr-2">1+</div>
          <div>{`${Math.floor(probability(1, N, n, k) * 100)}%`}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pr-2">2+</div>
          <div>{k < 2 ? null : `${Math.floor(probability(2, N, n, k) * 100)}%`}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pr-2">3+</div>
          <div>{k < 3 ? null : `${Math.floor(probability(3, N, n, k) * 100)}%`}</div>
        </div>
      </div>
    );

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="capacity pr-1 pl-2" onClick={() => setModalCard(card)}>
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines px-1"
            onClick={() => setModalCard(card)}
          >
            <ResultCryptDisciplines
              value={card['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              nonKeyDisciplines={props.nonKeyDisciplines}
              isMobile={props.isMobile}
            />
          </td>
          <td className="name px-1" onClick={() => setModalCard(card)}>
            <ResultCryptName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          {props.isMobile || !props.isWide ? (
            <td className="clan-group" onClick={() => setModalCard(card)}>
              <div>
                <ResultCryptClan value={card['Clan']} />
              </div>
              <div className="d-flex small justify-content-end">
                <ResultCryptGroup value={card['Group']} />
              </div>
            </td>
          ) : (
            <>
              <td className="clan" onClick={() => setModalCard(card)}>
                <ResultCryptClan value={card['Clan']} />
              </td>
              <td className="group" onClick={() => setModalCard(card)}>
                <ResultCryptGroup value={card['Group']} />
              </td>
            </>
          )}
          <td className="prob px-1">
            <OverlayTooltip
              delay={{ show: 0, hide: 150 }}
              placement="right"
              text={probText}
            >
              <div>
                {`${Math.floor(probability(1, N, n, k) * 100)}%`}
              </div>
            </OverlayTooltip>
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
      {props.isMobile && modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default ResultCryptTable;
