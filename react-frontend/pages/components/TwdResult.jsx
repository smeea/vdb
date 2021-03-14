import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import TwdResultTotal from './TwdResultTotal.jsx';
import TwdResultDescription from './TwdResultDescription.jsx';
import TwdResultCrypt from './TwdResultCrypt.jsx';
import TwdResultLibraryByType from './TwdResultLibraryByType.jsx';
import TwdResultLibraryKeyCards from './TwdResultLibraryKeyCards.jsx';

function TwdResult(props) {
  const showCounterStep = 25;

  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  const [twdRows, setTwdRows] = useState([]);
  const [showCounter, setShowCounter] = useState(0);
  const [deckCounter, setDeckCounter] = useState(0);

  const handleClear = () => {
    props.setResults(undefined);
    props.setShowSearch(!props.showSearch);
  };

  useEffect(() => {
    setDeckCounter(Object.keys(props.results).length);
    setShowCounter(showCounterStep);
  }, props.results);

  useEffect(() => {
    let newCounter = showCounter;
    setTwdRows(
      props.results.map((deck) => {
        while (newCounter > 0) {
          newCounter -= 1;
          Object.keys(deck['crypt']).map((i) => {
            deck['crypt'][i].c = props.cryptCardBase[i];
          });
          Object.keys(deck['library']).map((i) => {
            deck['library'][i].c = props.libraryCardBase[i];
          });
          return (
            <React.Fragment key={deck['deckid']}>
              <Row className="pt-3 px-0 mx-0">
                <Col
                  md={12}
                  xl={3}
                  className={props.isMobile ? 'px-0' : 'pl-0 pr-2'}
                >
                  <TwdResultDescription
                    deck={deck}
                    getDecks={props.getDecks}
                    setActiveDeck={props.setActiveDeck}
                    isMobile={props.isMobile}
                    username={props.username}
                  />
                </Col>
                {!props.isMobile ? (
                  <>
                    <Col md={12} xl={3} className="px-2">
                      <TwdResultCrypt
                        crypt={deck['crypt']}
                        isMobile={props.isMobile}
                        showImage={props.showImage}
                        setShowImage={props.setShowImage}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                    <Col md={12} xl={3} className="px-2">
                      <TwdResultLibraryByType
                        library={deck['library']}
                        isMobile={props.isMobile}
                        showImage={props.showImage}
                        setShowImage={props.setShowImage}
                      />
                    </Col>
                    <Col md={12} xl={3} className="pr-0 pl-2">
                      <TwdResultLibraryKeyCards
                        library={deck['library']}
                        isMobile={props.isMobile}
                        showImage={props.showImage}
                        setShowImage={props.setShowImage}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={6} className="pl-0 pr-1">
                      <TwdResultCrypt
                        crypt={deck['crypt']}
                        isMobile={props.isMobile}
                        showImage={props.showImage}
                        setShowImage={props.setShowImage}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                    <Col xs={6} className="pl-1 pr-0">
                      <TwdResultLibraryKeyCards
                        library={deck['library']}
                        isMobile={props.isMobile}
                        showImage={props.showImage}
                        setShowImage={props.setShowImage}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                  </>
                )}
                <hr />
              </Row>
              <hr className="mx-0 thick" />
            </React.Fragment>
          );
        }
      })
    );
  }, [props.results, showCounter, props.showImage]);

  return (
    <>
      {!props.isMobile && props.results.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO DECKS FOUND</b>
        </div>
      )}
      {props.results.length > 0 && (
        <>
          <TwdResultTotal decks={props.results} />
          {twdRows}
          {deckCounter > showCounter && (
            <div className="d-flex justify-content-center pb-4 pt-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowCounter(showCounter + showCounterStep)}
                block
              >
                Show More ({deckCounter - showCounter} left)
              </Button>
            </div>
          )}
        </>
      )}
      {props.isMobile && props.showFloatingButtons && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TwdResult;
