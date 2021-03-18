import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowRepeat from '../assets/images/icons/arrow-repeat.svg';
import QuickSelect from './components/QuickSelect.jsx';
import ResultCryptLayoutText from './components/ResultCryptLayoutText.jsx';
import ResultLibraryLayoutText from './components/ResultLibraryLayoutText.jsx';
import ButtonCardCopyUrl from './components/ButtonCardCopyUrl.jsx';

function Cards(props) {
  const history = useHistory();
  const [card, setCard] = useState(undefined);
  const [imageSet, setImageSet] = useState(null);

  const CardImage = () => {
    if (card) {
      const imgSrc =
        card['Id'] > 200000
            ? `${process.env.ROOT_URL}images/cards/${imageSet ? 'set/' + imageSet + '/' : "" }${card['ASCII Name']
              .toLowerCase()
              .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${card['Adv'] && 'adv'}.jpg`
            : `${process.env.ROOT_URL}images/cards/${imageSet ? 'set/' + imageSet + '/' : "" }${card['ASCII Name']
              .toLowerCase()
              .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;

      return (
        <img
          className="card-popover full-width"
          src={imgSrc}
          alt={card['Name']}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (props.id > 200000 && props.cryptCardBase) {
      setCard(props.cryptCardBase[props.id]);
    } else if (props.id < 200000 && props.libraryCardBase) {
      setCard(props.libraryCardBase[props.id]);
    }
  }, [props.id, props.cryptCardBase, props.libraryCardBase]);

  return (
    <Container className="p-0">
      <>
        {props.isMobile ? (
          <>
            {props.cryptCardBase && props.libraryCardBase && (
              <Row className="align-content-center justify-content-center mx-0 px-1 py-1">
                <Col lg={8} className="px-0">
                  <QuickSelect
                    cryptCardBase={props.cryptCardBase}
                    libraryCardBase={props.libraryCardBase}
                    setCard={setCard}
                    history={history}
                    isMobile={props.isMobile}
                  />
                </Col>
              </Row>
            )}
            {card && (
              <>
                <Row className="m-0 p-0">
                  <Col className="m-0 p-0">
                    {props.showImage ? (
                      <CardImage />
                    ) : (
                      <>
                        <div className="p-3">
                          {card && card.Id > 200000 && (
                            <ResultCryptLayoutText
                              card={card}
                              setImageSet={setImageSet}
                            />
                          )}
                          {card && card.Id < 200000 && (
                            <ResultLibraryLayoutText
                              card={card}
                              setImageSet={setImageSet}
                            />
                          )}
                        </div>
                        <div className="px-3 pb-3">
                          <ButtonCardCopyUrl isMobile={props.isMobile} id={card.Id} />
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
                <div
                  onClick={() => props.setShowImage(!props.showImage)}
                  className="float-right-bottom add-on"
                >
                  <div className="pt-1 float-add">
                    <ArrowRepeat viewBox="0 0 16 16" />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {props.cryptCardBase && props.libraryCardBase && (
              <Row className="align-content-center justify-content-center py-3">
                <Col lg={8}>
                  <QuickSelect
                    cryptCardBase={props.cryptCardBase}
                    libraryCardBase={props.libraryCardBase}
                    setCard={setCard}
                    history={history}
                    isMobile={props.isMobile}
                  />
                </Col>
              </Row>
            )}
            {card && (
              <Row className="align-content-center justify-content-center py-3">
                <Col lg={4}>
                  <CardImage />
                </Col>
                <Col lg={4}>
                  {card && card.Id > 200000 && (
                    <ResultCryptLayoutText
                      card={card}
                      setImageSet={setImageSet}
                    />
                  )}
                  {card && card.Id < 200000 && (
                    <ResultLibraryLayoutText
                      card={card}
                      setImageSet={setImageSet}
                    />
                  )}
                  <div className="pt-3">
                    <ButtonCardCopyUrl isMobile={props.isMobile} id={card.Id} />
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </>
    </Container>
  );
}

export default Cards;
