import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import InventoryCardQuantity from './InventoryCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryLibraryTable(props) {
  const { usedLibraryCards, nativeLibrary, isMobile, isWide } =
    useContext(AppContext);
  const [modalCardIdx, setModalCardIdx] = useState(undefined);

  const handleModalCardChange = (d) => {
    const maxIdx = props.cards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      setModalCardIdx(index);
      isMobile && props.setShowFloatingButtons(false);
    };

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (usedLibraryCards && usedLibraryCards.soft[card.c['Id']]) {
      Object.keys(usedLibraryCards.soft[card.c['Id']]).map((id) => {
        if (softUsedMax < usedLibraryCards.soft[card.c['Id']][id]) {
          softUsedMax = usedLibraryCards.soft[card.c['Id']][id];
        }
      });
    }

    if (usedLibraryCards && usedLibraryCards.hard[card.c['Id']]) {
      Object.keys(usedLibraryCards.hard[card.c['Id']]).map((id) => {
        hardUsedTotal += usedLibraryCards.hard[card.c['Id']][id];
      });
    }

    return (
      <>
        <div className="d-flex align-items-center justify-content-center quantity px-1">
          {isMobile ? (
            <InventoryCardQuantity
              cardid={card.c['Id']}
              q={card.q}
              softUsedMax={softUsedMax}
              hardUsedTotal={hardUsedTotal}
            />
          ) : (
            <OverlayTrigger
              placement="right"
              overlay={<UsedPopover cardid={card.c.Id} />}
            >
              <>
                <InventoryCardQuantity
                  cardid={card.c['Id']}
                  q={card.q}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                />
              </>
            </OverlayTrigger>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center used">
          {isMobile ? (
            <>
              {softUsedMax > 0 && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-inline opacity-035 pe-1">
                    <Shuffle width="14" height="14" viewBox="0 0 16 16" />
                  </div>
                  {softUsedMax}
                </div>
              )}
              {hardUsedTotal > 0 && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-inline opacity-035 pe-1">
                    <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
                  </div>
                  {hardUsedTotal}
                </div>
              )}
            </>
          ) : (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<UsedPopover cardid={card.c.Id} />}
            >
              <>
                {softUsedMax > 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pe-1">
                      <Shuffle width="14" height="14" viewBox="0 0 16 16" />
                    </div>
                    {softUsedMax}
                  </div>
                )}
                {hardUsedTotal > 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="d-inline opacity-035 pe-1">
                      <PinAngleFill
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                      />
                    </div>
                    {hardUsedTotal}
                  </div>
                )}
              </>
            </OverlayTrigger>
          )}
        </div>
        <div
          className="d-flex align-items-center justify-content-center type"
          onClick={() => handleClick()}
        >
          <ResultLibraryType cardtype={card.c['Type']} />
        </div>
        {!isMobile ? (
          <OverlayTrigger
            placement={props.placement ? props.placement : 'right'}
            overlay={<CardPopover card={card.c} />}
          >
            <div
              className="d-flex align-items-center justify-content-start name"
              onClick={() => handleClick()}
            >
              <ResultLibraryName card={card.c} />
            </div>
          </OverlayTrigger>
        ) : (
          <div
            className="d-flex align-items-center justify-content-start name"
            onClick={() => handleClick()}
          >
            <ResultLibraryName card={card.c} />
          </div>
        )}
        {isMobile || !isWide ? (
          <div
            className="d-flex align-items-center justify-content-between cost-disciplines"
            onClick={() => handleClick()}
          >
            <div
              className={`d-flex align-items-center justify-content-center ${
                card.c['Blood Cost'] && 'blood'
              }`}
              onClick={() => handleClick()}
            >
              <ResultLibraryCost
                valueBlood={card.c['Blood Cost']}
                valuePool={card.c['Pool Cost']}
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
                card.c['Blood Cost'] && 'blood'
              } cost`}
              onClick={() => handleClick()}
            >
              <ResultLibraryCost
                valueBlood={card.c['Blood Cost']}
                valuePool={card.c['Pool Cost']}
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
        {isWide && !isMobile && (
          <div
            className="d-flex align-items-center justify-content-center burn"
            onClick={() => handleClick()}
          >
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle
              value={nativeLibrary[card.c.Id]['Card Text']}
            />
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
      {props.compact ? (
        <div className="d-flex inventory-library-table bordered result-odd compact">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={`inventory-container${
            props.withCompact ? '-with-compact' : ''
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
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={props.cards[modalCardIdx].c}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
          forceInventoryMode={true}
        />
      )}
    </>
  );
}

export default InventoryLibraryTable;
