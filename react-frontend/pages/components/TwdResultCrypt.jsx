import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultCryptPopover from './ResultCryptPopover.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function TwdResultCrypt(props) {
  let resultTrClass = 'result-even';

  const [modalCard, setModalCard] = useState(undefined);

  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(props.crypt).map((card, index) => {
    if (props.crypt[card].c['Group'] == 'ANY') {
      return;
    }
    if (
      props.crypt[card].c['Group'] < cryptGroupMin ||
      cryptGroupMin == undefined
    ) {
      cryptGroupMin = props.crypt[card].c['Group'];
    }

    if (
      props.crypt[card].c['Group'] > cryptGroupMax ||
      cryptGroupMax == undefined
    ) {
      cryptGroupMax = props.crypt[card].c['Group'];
    }
  });

  let cryptTotal = 0;
  for (const card in props.crypt) {
    if (card) {
      cryptTotal += props.crypt[card].q;
    }
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const SortByQuantityCapacity = (a, b) => {
    if (a.q > b.q) {
      return -1;
    } else if (a.q == b.q) {
      if (a.c['Capacity'] > b.c['Capacity']) return -1;
      else return 1;
    } else {
      return 1;
    }
  };

  const sortedCards = Object.values(props.crypt).sort(SortByQuantityCapacity);

  const cardLines = sortedCards.map((card, index) => {
    const handleClick = () => {
      setModalCard(card.c);
      props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <ResultCryptPopover card={card.c} showImage={children} />
          </Popover.Content>
        </Popover>
      );
    });
    CardPopover.displayName = 'CardPopover';

    return (
      <tr key={index} className={resultTrClass}>
        <td className="quantity-no-buttons px-1">{card.q}</td>
        <td className="capacity px-1" onClick={() => handleClick()}>
          <ResultCryptCapacity value={card.c['Capacity']} />
        </td>
        {!props.isMobile ? (
          <OverlayTrigger
            placement={props.placement ? props.placement : 'right'}
            overlay={<CardPopover card={card.c}>{props.showImage}</CardPopover>}
          >
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </OverlayTrigger>
        ) : (
          <td className="name px-1" onClick={() => handleClick()}>
            <ResultCryptName card={card.c} />
          </td>
        )}
        <td className="clan px-1" onClick={() => handleClick()}>
          <ResultCryptClan value={card.c['Clan']} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
        </b>
      </div>
      <table className="twd-crypt-table">
        <tbody>{cardLines}</tbody>
      </table>
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => {
            setModalCard(false);
            props.setShowFloatingButtons(true);
          }}
          isMobile={props.isMobile}
        />
      )}
    </>
  );
}

export default TwdResultCrypt;
