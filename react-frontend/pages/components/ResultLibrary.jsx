import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
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
    isMobile,
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
          <div
            onClick={handleClear}
            className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
          {props.activeDeck.deckid && (
            <div
              onClick={() => toggleAddMode()}
              className={
                addMode
                  ? 'd-flex float-right-middle float-add-on align-items-center justify-content-center'
                  : 'd-flex float-right-middle float-add-off align-items-center justify-content-center'
              }
            >
              <Plus viewBox="0 0 16 16" />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ResultLibrary;
