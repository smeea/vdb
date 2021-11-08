import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ResultCryptTable from './ResultCryptTable.jsx';
import ResultCryptTotal from './ResultCryptTotal.jsx';
import resultCryptSort from './resultCryptSort.js';
import AppContext from '../../context/AppContext.js';

function ResultCrypt(props) {
  const {
    showCryptSearch,
    setShowCryptSearch,
    cryptResults,
    setCryptResults,
    addMode,
    toggleAddMode,
    isMobile,
    cryptSearchSort,
    changeCryptSearchSort,
  } = useContext(AppContext);

  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const className = 'search-crypt-table';
  const navigate = useNavigate();

  const handleChange = (method) => {
    changeCryptSearchSort(method);
    setSortedCards(() => resultCryptSort(cryptResults, method));
  };

  const handleClear = () => {
    navigate('/crypt');
    setCryptResults(undefined);
    setShowCryptSearch(!showCryptSearch);
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(cryptResults, cryptSearchSort));
  }, [cryptResults]);

  return (
    <>
      {!isMobile && cryptResults.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO CARDS FOUND</b>
        </div>
      )}
      {cryptResults.length > 0 && (
        <>
          <ResultCryptTotal
            value={cryptSearchSort}
            handleChange={handleChange}
          />
          <ResultCryptTable
            className={className}
            crypt={props.crypt}
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

export default ResultCrypt;
