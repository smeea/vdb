import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ResultCryptTable from './ResultCryptTable.jsx';
import ResultCryptTotal from './ResultCryptTotal.jsx';
import resultCryptSort from './resultCryptSort.js';
import AppContext from '../../context/AppContext.js';

function ResultCrypt(props) {
  const {
    inventoryCrypt,
    showCryptSearch,
    setShowCryptSearch,
    cryptResults,
    setCryptResults,
    addMode,
    setAddMode,
    inventoryMode,
    setInventoryMode,
    isMobile,
    isInventory,
  } = useContext(AppContext);

  const [sortedCards, setSortedCards] = useState([]);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const className = 'search-crypt-table';
  const history = useHistory();

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultCryptSort(cryptResults, method));
  };

  const handleClear = () => {
    history.push('/crypt');
    setCryptResults(undefined);
    setShowCryptSearch(!showCryptSearch);
  };

  useEffect(() => {
    if (!props.hideMissing) {
      setSortedCards(() => resultCryptSort(cryptResults, props.sortMethod));
    } else {
      setSortedCards(() =>
        resultCryptSort(
          cryptResults.filter((card) => inventoryCrypt[card.Id]),
          props.sortMethod
        )
      );
    }
  }, [cryptResults, props.sortMethod, props.hideMissing]);

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
            value={props.sortMethod}
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

export default ResultCrypt;
