import React, { useState } from 'react';
import { OverlayTrigger, Popover, Modal } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';
import OverlayTooltip from './OverlayTooltip.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

const probability = (x, N, n, k) => {
  const factorial = (n) => {
    return n ? n * factorial(n - 1) : 1;
  };

  const combinations = (n, r) => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const exactProbability = (i, N, n, k) => {
    return (
      (combinations(k, i) * combinations(N - k, n - i)) / combinations(N, n)
    );
  };

  let prob = 0;
  for (let i = 0; i <= n; i++) {
    if (i >= x && i <= k) {
      if (N - n < k) {
        prob = 1;
        continue;
      } else {
        prob += exactProbability(i, N, n, k);
      }
    }
  }
  if (0.99 < prob && prob < 1) {
    prob = 0.99;
  }
  if (0 < prob && prob < 0.01) {
    prob = 0.01;
  }
  return prob;
};

function ResultCryptTable(props) {
  let resultTrClass;

  const [modalCard, setModalCard] = useState(undefined);
  const [modalDraw, setModalDraw] = useState(undefined);

  const N = props.total;
  const n = props.resultCards.length;

  const cardRows = props.resultCards.map((card, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    const k = props.crypt[card['Id']].q;

    const probText = (
      <div className="prob">
        <div className="d-flex justify-content-between">
          <div className="pr-2">1+</div>
          <div>{`${Math.floor(probability(1, N, n, k) * 100)}%`}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pr-2">2+</div>
          <div>
            {k < 2 ? null : `${Math.floor(probability(2, N, n, k) * 100)}%`}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pr-2">3+</div>
          <div>
            {k < 3 ? null : `${Math.floor(probability(3, N, n, k) * 100)}%`}
          </div>
        </div>
      </div>
    );

    const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <ResultCryptPopover card={props.card} showImage={children} />
          </Popover.Content>
        </Popover>
      );
    });
    CardPopover.displayName = 'CardPopover';

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="capacity pr-1 pl-2" onClick={() => setModalCard(card)}>
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines px-1" onClick={() => setModalCard(card)}>
            <ResultCryptDisciplines
              value={card['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              nonKeyDisciplines={props.nonKeyDisciplines}
              isMobile={props.isMobile}
            />
          </td>
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card}>{props.showImage}</CardPopover>}
            >
              <td className="name px-1" onClick={() => setModalCard(card)}>
                <ResultCryptName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => setModalCard(card)}>
              <ResultCryptName card={card} />
            </td>
          )}
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
            {props.isMobile ? (
              <div
                onClick={() =>
                  setModalDraw({ name: card['Name'], prob: probText })
                }
              >
                {`${Math.floor(probability(1, N, n, k) * 100)}%`}
              </div>
            ) : (
              <OverlayTooltip
                delay={{ show: 0, hide: 150 }}
                placement="right"
                text={probText}
              >
                <div>{`${Math.floor(probability(1, N, n, k) * 100)}%`}</div>
              </OverlayTooltip>
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
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
          isMobile={props.isMobile}
        />
      )}
      {modalDraw && (
        <Modal
          size="xs"
          show={modalDraw}
          className="d-flex justify-content-center"
          dialogClassName="w-50"
          onHide={() => setModalDraw(null)}
          animation={false}
          centered={true}
        >
          <Modal.Header className="px-3 py-2" closeButton>
            <div className="prob">
              <b>{modalDraw.name}</b>:
            </div>
          </Modal.Header>
          <Modal.Body className="px-4 py-3" closeButton>
            {modalDraw.prob}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ResultCryptTable;
