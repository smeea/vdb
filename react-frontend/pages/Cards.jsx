import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ArrowRepeat from '../assets/images/icons/arrow-repeat.svg';
import Dice3 from '../assets/images/icons/dice-3-fill.svg';
import QuickSelect from './components/QuickSelect.jsx';
import ResultCryptLayoutText from './components/ResultCryptLayoutText.jsx';
import ResultLibraryLayoutText from './components/ResultLibraryLayoutText.jsx';
import ButtonCardCopyUrl from './components/ButtonCardCopyUrl.jsx';
import ButtonAddCard from './components/ButtonAddCard.jsx';
import AppContext from '../context/AppContext.js';

function Cards(props) {
  const {
    decks,
    cryptCardBase,
    libraryCardBase,
    showImage,
    toggleShowImage,
    localizedCrypt,
    localizedLibrary,
    lang,
    isMobile,
    activeDeck,
  } = useContext(AppContext);

  const [card, setCard] = useState(undefined);
  const [imageSet, setImageSet] = useState(null);
  const history = useHistory();

  const CardImage = () => {
    if (card) {
      const imgSrc =
        card['Id'] > 200000
          ? `${process.env.ROOT_URL}images/cards/${
              imageSet
                ? 'set/' + imageSet + '/'
                : localizedCrypt &&
                  localizedCrypt[lang] &&
                  localizedCrypt[lang][card['Id']]
                ? lang + '/'
                : 'en-EN/'
            }${card['ASCII Name']
              .toLowerCase()
              .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${card['Adv'] && 'adv'}.jpg`
          : `${process.env.ROOT_URL}images/cards/${
              imageSet
                ? 'set/' + imageSet + '/'
                : localizedLibrary &&
                  localizedLibrary[lang] &&
                  localizedLibrary[lang][card['Id']]
                ? lang + '/'
                : 'en-EN/'
            }${card['ASCII Name']
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

  const randomCrypt = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(cryptCardBase).length)
      ) + 200000;
    setCard(cryptCardBase[id]);
    history.push(`/cards/${id}`);
  };

  const randomLibrary = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(libraryCardBase).length)
      ) + 100000;
    setCard(libraryCardBase[id]);
    history.push(`/cards/${id}`);
  };

  let inDeck = 0;
  if (
    card &&
    decks &&
    decks[activeDeck.deckid] &&
    (decks[activeDeck.deckid].crypt[card.Id] ||
      decks[activeDeck.deckid].library[card.Id])
  ) {
    inDeck =
      card.Id > 200000
        ? decks[activeDeck.deckid].crypt[card.Id].q
        : decks[activeDeck.deckid].library[card.Id].q;
  }

  useEffect(() => {
    if (props.id > 200000 && cryptCardBase) {
      setCard(cryptCardBase[props.id]);
    } else if (props.id < 200000 && libraryCardBase) {
      setCard(libraryCardBase[props.id]);
    }
  }, [props.id, cryptCardBase, libraryCardBase]);

  return (
    <Container className="p-0">
      <>
        {isMobile ? (
          <>
            {cryptCardBase && libraryCardBase && (
              <Row className="align-content-center justify-content-center mx-0 px-1 py-1">
                <Col md={8} className="px-0">
                  <QuickSelect setCard={setCard} />
                  <div
                    onClick={() => randomCrypt()}
                    className="d-flex justify-content-center align-items-center float-right-top random"
                  >
                    <div className="float-random">
                      <Dice3 viewBox="0 0 16 16" /> C
                    </div>
                  </div>
                  <div
                    onClick={() => randomLibrary()}
                    className="d-flex justify-content-center align-items-center float-right-middle random"
                  >
                    <div className="float-random">
                      <Dice3 viewBox="0 0 16 16" /> L
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {card && (
              <>
                <Row className="m-0 p-0">
                  <Col className="m-0 p-0">
                    {showImage ? (
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
                          <ButtonCardCopyUrl id={card.Id} />
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
                <div
                  onClick={() => toggleShowImage()}
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
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              {cryptCardBase && libraryCardBase && (
                <Row className="align-content-center justify-content-center py-3">
                  <Col>
                    <QuickSelect setCard={setCard} />
                  </Col>
                </Row>
              )}
              {card && (
                <Row className="align-content-center justify-content-center py-3">
                  <Col md={6}>
                    <CardImage />
                  </Col>
                  <Col md={6}>
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
                      <div className="d-inline pr-1">
                        <ButtonCardCopyUrl id={card.Id} />
                      </div>
                      <div className="d-inline pr-1">
                        <ButtonAddCard
                          cardid={card.Id}
                          deckid={activeDeck.deckid}
                          card={card}
                          inDeck={inDeck}
                          inZap={true}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
            {!isMobile && (
              <Col>
                <div className="py-3 px-4">
                  <Button
                    variant="outline-secondary"
                    onClick={() => randomCrypt()}
                    block
                  >
                    <Dice3 /> Crypt
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => randomLibrary()}
                    block
                  >
                    <Dice3 /> Library
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        )}
      </>
    </Container>
  );
}

export default Cards;
