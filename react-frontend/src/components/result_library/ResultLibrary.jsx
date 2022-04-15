import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import { ResultLibraryTable, ResultLibraryTotal } from 'components';
import { resultLibrarySort } from 'utils';
import { useApp } from 'context';

const ResultLibrary = ({ cards, setCards, library, activeDeck, inCompare }) => {
  const {
    showLibrarySearch,
    setShowLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    librarySearchSort,
    changeLibrarySearchSort,
  } = useApp();

  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const navigate = useNavigate();

  const handleChange = (method) => {
    changeLibrarySearchSort(method);
    setSortedCards(() => resultLibrarySort(cards, method));
  };

  const handleClear = () => {
    navigate('/library');
    setCards(undefined);
    setShowLibrarySearch(!showLibrarySearch);
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(cards, librarySearchSort));
  }, [cards]);

  return (
    <>
      {!isMobile && cards.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO CARDS FOUND</b>
        </div>
      )}
      {cards.length > 0 && (
        <>
          <ResultLibraryTotal
            inCompare={inCompare}
            cards={cards}
            handleChange={handleChange}
          />
          <ResultLibraryTable
            library={library}
            activeDeck={activeDeck}
            resultCards={sortedCards}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </>
      )}
      {isMobile && showFloatingButtons && (
        <div
          onClick={handleClear}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
      {isMobile && showFloatingButtons && activeDeck.src === 'my' && (
        <div
          onClick={() => toggleAddMode()}
          className={`d-flex float-right-middle float-add-${
            addMode ? 'on' : 'off'
          } align-items-center justify-content-center`}
        >
          <Plus viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default ResultLibrary;
