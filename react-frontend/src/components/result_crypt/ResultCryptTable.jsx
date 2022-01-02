import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  UsedPopover,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ButtonAddCard,
  ResultCryptModal,
  ConditionalOverlayTrigger,
} from 'components';
import { getSoftMax, getHardTotal } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const ResultCryptTable = (props) => {
  const { resultCards, notAuthor, placement, className, crypt } = props;
  const { setShowFloatingButtons } = props;

  const {
    activeDeck,
    inventoryCrypt,
    usedCryptCards,
    addMode,
    inventoryMode,
    isMobile,
    isDesktop,
    isWide,
  } = useApp();

  let resultTrClass;
  let maxDisciplines = 0;
  resultCards.map((card) => {
    const n = Object.keys(card['Disciplines']).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    isMobile && setShowFloatingButtons(true);
  };

  const cardRows = resultCards.map((card, index) => {
    const handleClick = () => {
      handleModalCardOpen(index);
      isMobile && setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const inDeck = (crypt && crypt[card.Id] && crypt[card.Id].q) || 0;

    let softUsedMax = 0;
    let hardUsedTotal = 0;

    let inInventory = 0;

    if (inventoryMode) {
      if (inventoryCrypt[card.Id]) {
        inInventory = inventoryCrypt[card.Id].q;
      }

      softUsedMax = getSoftMax(usedCryptCards.soft[card.Id]);
      hardUsedTotal = getHardTotal(usedCryptCards.hard[card.Id]);
    }

    return (
      <React.Fragment key={card['Id']}>
        <tr className={resultTrClass}>
          {!notAuthor && activeDeck.deckid && addMode && (
            <td className="quantity-add pe-1">
              <ButtonAddCard
                cardid={card['Id']}
                deckid={activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          {inventoryMode && (
            <OverlayTrigger
              placement={isDesktop ? 'left' : 'right'}
              overlay={<UsedPopover cardid={card['Id']} />}
            >
              <td className="used">
                {(inInventory > 0 || softUsedMax + hardUsedTotal > 0) && (
                  <div
                    className={`d-flex align-items-center justify-content-between used px-1 ms-1 ${
                      inInventory < softUsedMax + hardUsedTotal
                        ? 'inv-miss-full'
                        : ''
                    }
                  `}
                  >
                    {inInventory}
                    <div
                      className={`small ${
                        inInventory >= softUsedMax + hardUsedTotal
                          ? 'gray'
                          : 'white'
                      } ps-1`}
                    >
                      {inInventory >= softUsedMax + hardUsedTotal
                        ? `+${inInventory - softUsedMax - hardUsedTotal}`
                        : inInventory - softUsedMax - hardUsedTotal}
                    </div>
                  </div>
                )}
              </td>
            </OverlayTrigger>
          )}
          <td
            className={isMobile ? 'capacity px-1' : 'capacity px-2'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            <ResultCryptDisciplines
              maxDisciplines={maxDisciplines}
              value={card['Disciplines']}
            />
          </td>
          <ConditionalOverlayTrigger
            placement={placement}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultCryptName card={card} />
            </td>
          </ConditionalOverlayTrigger>
          {isWide ? (
            <>
              <td className="title pe-2" onClick={() => handleClick()}>
                <ResultCryptTitle value={card['Title']} />
              </td>
              <td className="clan" onClick={() => handleClick()}>
                <ResultClanImage value={card['Clan']} />
              </td>
              <td className="group" onClick={() => handleClick()}>
                <ResultCryptGroup value={card['Group']} />
              </td>
            </>
          ) : (
            <>
              <td className="clan-group" onClick={() => handleClick()}>
                <div>
                  <ResultClanImage value={card['Clan']} />
                </div>
                <div className="d-flex small justify-content-end">
                  <div className="bold blue">
                    <ResultCryptTitle value={card['Title']} />
                  </div>
                  <ResultCryptGroup value={card['Group']} />
                </div>
              </td>
            </>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={className}>
        <tbody>{cardRows}</tbody>
      </table>
      {shouldShowModal && (
        <ResultCryptModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ResultCryptTable;
