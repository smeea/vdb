import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ResultLibraryTable from './ResultLibraryTable.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';
import AppContext from '../../context/AppContext.js';

function ResultLibrary(props) {
  const {
    showLibrarySearch,
    setShowLibrarySearch,
    libraryResults,
    setLibraryResults,
    addMode,
    toggleAddMode,
    inventoryMode,
    toggleInventoryMode,
    isMobile,
    isInventory,
    librarySearchSort,
    changeLibrarySearchSort,
  } = useContext(AppContext);

  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const history = useHistory();

  const handleChange = (method) => {
    changeLibrarySearchSort(method);
    setSortedCards(() => resultLibrarySort(libraryResults, method));
  };

  const handleClear = () => {
    history.push('/library');
    setLibraryResults(undefined);
    setShowLibrarySearch(!showLibrarySearch);
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(libraryResults, librarySearchSort));
  }, [libraryResults]);

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
            value={librarySearchSort}
            handleChange={handleChange}
          />
          <ResultLibraryTable
            library={props.library}
            activeDeck={props.activeDeck}
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
                  onClick={() => toggleInventoryMode()}
                  className="float-right-top inventory-on"
                >
                  <div className="pt-2 float-inventory">
                    <ArchiveFill viewBox="0 0 16 16" />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => toggleInventoryMode()}
                  className="float-right-top inventory-off"
                >
                  <div className="pt-2 float-inventory">
                    <ArchiveFill viewBox="0 0 16 16" />
                  </div>
                </div>
              )}
            </>
          )}
          {props.activeDeck.deckid &&
            (addMode ? (
              <div
                onClick={() => toggleAddMode()}
                className="float-right-middle add-on"
              >
                <div className="pt-1 float-add">
                  <Plus viewBox="0 0 16 16" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => toggleAddMode()}
                className="float-right-middle add-off"
              >
                <div className="pt-1 float-add">
                  <Plus viewBox="0 0 16 16" />
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default ResultLibrary;
