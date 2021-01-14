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
              <Row className="pt-3">
                <Col md={12} xl={3}>
                  <TwdResultDescription
                    deck={deck}
                    getDecks={props.getDecks}
                    setActiveDeck={props.setActiveDeck}
                  />
                </Col>
                <Col md={12} xl={3}>
                  <TwdResultCrypt
                    crypt={deck['crypt']}
                    isMobile={props.isMobile}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                  />
                </Col>
                <Col md={12} xl={3}>
                  <TwdResultLibraryByType
                    library={deck['library']}
                    isMobile={props.isMobile}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                  />
                </Col>
                <Col md={12} xl={3}>
                  <TwdResultLibraryKeyCards
                    library={deck['library']}
                    isMobile={props.isMobile}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                  />
                </Col>
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
      {props.isMobile &&
       <a onClick={handleClear} className="float-1 clear">
         <div className="pt-1 float-clear">
           <X viewBox="0 0 16 16"/>
         </div>
       </a>
      }
    </>
  );
}

export default TwdResult;
