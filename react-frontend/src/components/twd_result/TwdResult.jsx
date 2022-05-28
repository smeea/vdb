import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  TwdResultTotal,
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';
import { resultDecksSort } from 'utils';
import { useApp, useSearchResults } from 'context';

const TwdResult = ({ showSearch }) => {
  const {
    setShowTwdSearch,
    cryptCardBase,
    libraryCardBase,
    isMobile,
    showFloatingButtons,
    twdSearchSort,
    changeTwdSearchSort,
  } = useApp();

  const { twdResults, setTwdResults } = useSearchResults();

  const navigate = useNavigate();
  const showCounterStep = 20;
  const [sortedDecks, setSortedDecks] = useState([]);
  const [results, setResults] = useState([]);
  const [showCounter, setShowCounter] = useState(0);
  const [deckCounter, setDeckCounter] = useState(0);

  const sortMethods = {
    'Date - New to Old': 'D↓',
    'Date - Old to New': 'D↑',
    Players: 'P',
  };

  const setSortMethod = (method) => {
    changeTwdSearchSort(method);
    setSortedDecks(() => resultDecksSort(twdResults, method));
  };

  const handleClear = () => {
    navigate('/twd');
    setTwdResults(undefined);
    setShowTwdSearch(!showSearch);
  };

  useEffect(() => {
    if (twdResults) {
      setDeckCounter(Object.keys(twdResults).length);
      setShowCounter(showCounterStep);
      setSortedDecks(() => resultDecksSort(twdResults, twdSearchSort));
    }
  }, [twdResults]);

  useEffect(() => {
    if (sortedDecks) {
      let newCounter = showCounter;

      setResults(
        sortedDecks.map((deck, index) => {
          while (newCounter > 0) {
            newCounter -= 1;

            deck['crypt'] = {};
            deck['library'] = {};
            Object.keys(deck['cards']).map((i) => {
              if (i > 200000) {
                deck['crypt'][i] = {
                  q: deck['cards'][i],
                  c: cryptCardBase[i],
                };
              } else {
                deck['library'][i] = {
                  q: deck['cards'][i],
                  c: libraryCardBase[i],
                };
              }
            });

            return (
              <React.Fragment key={deck['deckid']}>
                <Row className="py-2 px-0 mx-0">
                  <Col
                    xs={12}
                    md={12}
                    xl={3}
                    className={isMobile ? 'px-0' : 'ps-0 pe-2'}
                  >
                    <TwdResultDescription deck={deck} />
                  </Col>
                  {isMobile ? (
                    <>
                      <Col xs={6} className="ps-0 pe-1">
                        <TwdResultCrypt crypt={deck['crypt']} />
                      </Col>
                      <Col xs={6} className="ps-1 pe-0">
                        <TwdResultLibraryKeyCards library={deck['library']} />
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col xs={12} md={4} xl={3} className="px-2">
                        <TwdResultCrypt crypt={deck['crypt']} />
                      </Col>
                      <Col xs={12} md={4} xl={3} className="px-2">
                        <TwdResultLibraryByType library={deck['library']} />
                      </Col>
                      <Col xs={12} md={4} xl={3} className="pe-0 ps-2">
                        <TwdResultLibraryKeyCards library={deck['library']} />
                      </Col>
                    </>
                  )}
                </Row>
                {index + 1 < showCounter && <hr className="mx-0 thick" />}
              </React.Fragment>
            );
          }
        })
      );
    }
  }, [sortedDecks, showCounter, twdSearchSort]);

  return (
    <>
      {!isMobile && (twdResults === null || twdResults.length === 0) && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>{twdResults === null ? 'CONNECTION PROBLEM' : 'NO DECKS FOUND'}</b>
        </div>
      )}
      {twdResults && twdResults.length > 0 && (
        <>
          <TwdResultTotal
            decks={twdResults}
            sortMethods={sortMethods}
            sortMethod={twdSearchSort}
            setSortMethod={setSortMethod}
          />
          {results}
          {deckCounter > showCounter && (
            <div className="d-flex justify-content-center pb-4 pt-2">
              <Button
                variant="primary"
                onClick={() => setShowCounter(showCounter + showCounterStep)}
              >
                Show More ({deckCounter - showCounter} left)
              </Button>
            </div>
          )}
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
        </>
      )}
    </>
  );
};

export default TwdResult;
