import React, { useState, useEffect } from 'react';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ResultLibraryTable from './ResultLibraryTable.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';

function ResultLibrary(props) {
  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultLibrarySort(props.cards, method));
  };

  const handleClear = () => {
    props.setResults(undefined);
    props.setShowSearch(!props.showSearch);
  };

  useEffect(() => {
    if (!props.hideMissing) {
      setSortedCards(() => resultLibrarySort(props.cards, props.sortMethod));
    } else {
      setSortedCards(() =>
        resultLibrarySort(
          props.cards.filter((card) => props.inventoryLibrary[card.Id]),
          props.sortMethod
        )
      );
    }
  }, [props.cards, props.sortMethod, props.hideMissing]);

  return (
    <>
      {!props.isMobile && props.cards.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO CARDS FOUND</b>
        </div>
      )}
      {props.cards.length > 0 && (
        <>
          <ResultLibraryTotal
            cards={props.cards}
            value={props.sortMethod}
            handleChange={handleChange}
          />
          <ResultLibraryTable
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            library={props.library}
            activeDeck={props.activeDeck}
            cardAdd={props.cardAdd}
            cardChange={props.cardChange}
            resultCards={sortedCards}
            isMobile={props.isMobile}
            isWide={true}
            addMode={props.addMode}
            inventoryMode={props.inventoryMode}
            inventoryLibrary={props.inventoryLibrary}
            usedCards={props.usedCards}
            decks={props.decks}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </>
      )}
      {props.isMobile && showFloatingButtons && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
          {props.isInventory && (
            <>
              {props.inventoryMode ? (
                <div
                  onClick={() => props.setInventoryMode(!props.inventoryMode)}
                  className="float-right-top inventory-on"
                >
                  <div className="pt-2 float-inventory">
                    <ArchiveFill viewBox="0 0 16 16" />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => props.setInventoryMode(!props.inventoryMode)}
                  className="float-right-top inventory-off"
                >
                  <div className="pt-2 float-inventory">
                    <ArchiveFill viewBox="0 0 16 16" />
                  </div>
                </div>
              )}
            </>
          )}
          {props.addMode ? (
            <div
              onClick={() => props.setAddMode(!props.addMode)}
              className="float-right-middle add-on"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => props.setAddMode(!props.addMode)}
              className="float-right-middle add-off"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ResultLibrary;
