import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  CardPopover,
  UsedPopover,
  InventoryCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultModal,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalOverlayTrigger,
} from 'components';
import { POOL_COST, BLOOD_COST, CARD_TEXT, BURN_OPTION } from 'utils/constants';
import { librarySort, getHardTotal, getSoftMax } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const InventoryLibraryTable = ({
  cards,
  placement,
  sortMethod,
  compact,
  withCompact,
  newFocus,
  inShared,
}) => {
  const {
    usedLibraryCards,
    nativeLibrary,
    isMobile,
    isNarrow,
    setShowFloatingButtons,
  } = useApp();

  const sortedCards = librarySort(cards, sortMethod);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const cardRows = sortedCards.map((cardInfo, index) => {
    const handleClick = () => {
      handleModalCardOpen(index);
      setShowFloatingButtons(false);
    };

    const { c: card, q: qty } = cardInfo;

    const DisciplineOrClan = card.Clan ? (
      <ResultLibraryClan value={card.Clan} />
    ) : (
      <ResultLibraryDisciplines value={card.Discipline} />
    );
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (usedLibraryCards) {
      softUsedMax = getSoftMax(usedLibraryCards.soft[card.Id]);
      hardUsedTotal = getHardTotal(usedLibraryCards.hard[card.Id]);
    }

    return (
      <>
        <div
          className={`d-flex align-items-center justify-content-center ${
            inShared ? 'quantity-no-buttons me-2' : 'quantity px-1]'
          }`}
        >
          {inShared ? (
            <>{qty || null}</>
          ) : (
            <InventoryCardQuantity
              cardid={card.Id}
              q={qty}
              softUsedMax={softUsedMax}
              hardUsedTotal={hardUsedTotal}
              compact={compact}
              newFocus={newFocus}
            />
          )}
        </div>
        {!inShared && (
          <div className="d-flex align-items-center justify-content-center used">
            {isMobile ? (
              <div
                className={`d-flex justify-content-center w-100 ps-1 ${
                  qty == softUsedMax + hardUsedTotal
                    ? 'gray'
                    : qty >= softUsedMax + hardUsedTotal
                    ? 'green'
                    : 'red'
                }`}
              >
                {qty === softUsedMax + hardUsedTotal
                  ? '='
                  : qty > softUsedMax + hardUsedTotal
                  ? `+${qty - softUsedMax - hardUsedTotal}`
                  : qty - softUsedMax - hardUsedTotal}
              </div>
            ) : (
              <OverlayTrigger
                placement="bottom"
                overlay={<UsedPopover cardid={card.Id} />}
              >
                <div
                  className={`d-flex justify-content-center w-100 ps-1 ${
                    qty == softUsedMax + hardUsedTotal
                      ? 'gray'
                      : qty >= softUsedMax + hardUsedTotal
                      ? 'green'
                      : 'red'
                  }`}
                >
                  {qty === softUsedMax + hardUsedTotal
                    ? '='
                    : qty > softUsedMax + hardUsedTotal
                    ? `+${qty - softUsedMax - hardUsedTotal}`
                    : qty - softUsedMax - hardUsedTotal}
                </div>
              </OverlayTrigger>
            )}
          </div>
        )}
        <div
          className="d-flex align-items-center justify-content-center type"
          onClick={() => handleClick()}
        >
          <ResultLibraryTypeImage value={card.Type} />
        </div>

        <ConditionalOverlayTrigger
          placement={placement}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <div
            className="d-flex align-items-center justify-content-start name"
            onClick={() => handleClick()}
          >
            <ResultLibraryName card={card} />
          </div>
        </ConditionalOverlayTrigger>

        {isMobile ? (
          <div
            className="d-flex align-items-center justify-content-between disciplines"
            onClick={() => handleClick()}
          >
            <div
              className={`d-flex align-items-center justify-content-center ${
                card[BLOOD_COST] && 'blood'
              }`}
              onClick={() => handleClick()}
            >
              <ResultLibraryCost
                valueBlood={card[BLOOD_COST]}
                valuePool={card[POOL_COST]}
              />
            </div>
            <div
              className="d-flex align-items-center justify-content-center px-1"
              onClick={() => handleClick()}
            >
              {DisciplineOrClan}
            </div>
          </div>
        ) : (
          <>
            <div
              className={`d-flex align-items-center justify-content-center ${
                card[BLOOD_COST] && 'blood'
              } cost`}
              onClick={() => handleClick()}
            >
              <ResultLibraryCost
                valueBlood={card[BLOOD_COST]}
                valuePool={card[POOL_COST]}
              />
            </div>
            <div
              className="d-flex align-items-center justify-content-center disciplines"
              onClick={() => handleClick()}
            >
              {DisciplineOrClan}
            </div>
          </>
        )}
        {!isNarrow && (
          <div
            className="d-flex align-items-center justify-content-center burn"
            onClick={() => handleClick()}
          >
            <ResultLibraryBurn value={card[BURN_OPTION]} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id][CARD_TEXT]} />
          </div>
        )}
      </>
    );
  });

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`d-flex bordered ${index % 2 ? 'result-even' : 'result-odd'}`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <>
      {compact ? (
        <div className="d-flex inventory-library-table bordered result-odd compact">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={`inventory-container-library${
            withCompact ? '-with-compact' : ''
          }`}
        >
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                className="inventory-library-table"
                height={height}
                width={width}
                itemCount={cardRows.length}
                itemSize={45}
              >
                {Rows}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
          forceInventoryMode={true}
        />
      )}
    </>
  );
};

export default InventoryLibraryTable;
