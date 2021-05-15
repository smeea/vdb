import React, { useState, useEffect, useContext } from 'react';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ResultLibraryTable from './ResultLibraryTable.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';
import AppContext from '../../context/AppContext.js';

function ResultLibrary(props) {
  const {
    inventoryLibrary,
    showLibrarySearch,
    setShowLibrarySearch,
    libraryResults,
    setLibraryResults,
    addMode,
    setAddMode,
    inventoryMode,
    setInventoryMode,
    isMobile,
    isInventory,
  } = useContext(AppContext);
  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultLibrarySort(libraryResults, method));
  };

  const handleClear = () => {
    setLibraryResults(undefined);
    setShowLibrarySearch(!showLibrarySearch);
  };

  useEffect(() => {
    if (!props.hideMissing) {
      setSortedCards(() => resultLibrarySort(libraryResults, props.sortMethod));
    } else {
      setSortedCards(() =>
        resultLibrarySort(
          libraryResults.filter((card) => inventoryLibrary[card.Id]),
          props.sortMethod
        )
      );
    }
  }, [libraryResults, props.sortMethod, props.hideMissing]);

  return (
    <>
      {!isMobile && libraryResults.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO CARDS FOUND</b>
        </div>
      )}
      {libraryResults.length > 0 && (
        <>
          <ResultLibraryTotal
            value={props.sortMethod}
            handleChange={handleChange}
          />
          <ResultLibraryTable
            library={props.library}
            activeDeck={props.activeDeck}
            cardChange={props.cardChange}
            resultCards={sortedCards}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </>
      )}
      {isMobile && showFloatingButtons && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
          {isInventory && (
            <>
              {inventoryMode ? (
                <div
                  onClick={() => setInventoryMode(!inventoryMode)}
                  className="float-right-top inventory-on"
                >
                  <div className="pt-2 float-inventory">
                    <ArchiveFill viewBox="0 0 16 16" />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setInventoryMode(!inventoryMode)}
                  className="float-right-top inventory-off"
                >
                  <div className="pt-2 float-inventory">
                    <ArchiveFill viewBox="0 0 16 16" />
                  </div>
                </div>
              )}
            </>
          )}
          {addMode ? (
            <div
              onClick={() => setAddMode(!addMode)}
              className="float-right-middle add-on"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setAddMode(!addMode)}
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
