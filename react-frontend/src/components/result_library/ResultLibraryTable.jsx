import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  UsedPopover,
  ButtonAddCard,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultModal,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  ConditionalOverlayTrigger,
} from 'components';
import { POOL_COST, BLOOD_COST, CARD_TEXT, BURN_OPTION } from 'utils/constants';
import { getHardTotal, getSoftMax } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const ResultLibraryTable = ({ resultCards, library, placement }) => {
  const {
    activeDeck,
    inventoryLibrary,
    usedLibraryCards,
    addMode,
    inventoryMode,
    nativeLibrary,
    isMobile,
    isDesktop,
    setShowFloatingButtons,
  } = useApp();

  let resultTrClass;

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(resultCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const cardRows = resultCards.map((card, index) => {
    const handleClick = () => {
      handleModalCardOpen(index);
      setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const inDeck = (library && library[card.Id] && library[card.Id].q) || 0;

    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let inInventory = 0;

    if (inventoryMode) {
      if (inventoryLibrary[card.Id]) {
        inInventory = inventoryLibrary[card.Id].q;
      }

      softUsedMax = getSoftMax(usedLibraryCards.soft[card.Id]);
      hardUsedTotal = getHardTotal(usedLibraryCards.hard[card.Id]);
    }

    return (
      <React.Fragment key={card.Id}>
        <tr className={resultTrClass}>
          {activeDeck.src === 'my' && addMode && (
            <td className="quantity-add pe-1">
              <ButtonAddCard
                cardid={card.Id}
                deckid={activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          {inventoryMode && (
            <OverlayTrigger
              placement={isDesktop ? 'left' : 'right'}
              overlay={<UsedPopover cardid={card.Id} />}
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
            className={card[BLOOD_COST] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card[BLOOD_COST]}
              valuePool={card[POOL_COST]}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick()}>
            <ResultLibraryTypeImage value={card.Type} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryClan value={card.Clan} />
            {card.Discipline && card.Clan && '+'}
            <ResultLibraryDisciplines value={card.Discipline} />
          </td>
          <ConditionalOverlayTrigger
            placement={placement}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalOverlayTrigger>
          <td className="burn px-1" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card[BURN_OPTION]} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id][CARD_TEXT]} />
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
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ResultLibraryTable;
