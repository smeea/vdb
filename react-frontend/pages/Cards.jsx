import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import ArrowRepeat from '../assets/images/icons/arrow-repeat.svg';
import Dice3 from '../assets/images/icons/dice-3-fill.svg';
import QuickSelect from './components/QuickSelect.jsx';
import ResultCryptLayoutText from './components/ResultCryptLayoutText.jsx';
import ResultLibraryLayoutText from './components/ResultLibraryLayoutText.jsx';
import ButtonCardCopyUrl from './components/ButtonCardCopyUrl.jsx';
import ButtonAddCard from './components/ButtonAddCard.jsx';
import AppContext from '../context/AppContext.js';

function Cards(props) {
  const params = useParams();
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
  const navigate = useNavigate();

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
              .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${
              card['Adv'][0] ? 'adv' : ''
            }.jpg`
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
    navigate(`/cards/${id}`);
  };

  const randomLibrary = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(libraryCardBase).length)
      ) + 100000;
    setCard(libraryCardBase[id]);
    navigate(`/cards/${id}`);
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
    if (params.id > 200000 && cryptCardBase) {
      setCard(cryptCardBase[params.id]);
    } else if (params.id < 200000 && libraryCardBase) {
      setCard(libraryCardBase[params.id]);
    }
  }, [params.id, cryptCardBase, libraryCardBase]);

  return (
    <Container className="cards-container p-0">
      <>
        {isMobile ? (
          <>
            {cryptCardBase && libraryCardBase && (
              <Row className="align-content-center justify-content-center mx-0 px-1 py-1">
                <Col md={8} className="px-0">
                  <QuickSelect setCard={setCard} />
                  <div
                    onClick={() => randomCrypt()}
                    className="d-flex float-right-top float-random align-items-center justify-content-center"
                  >
                    <Dice3 viewBox="0 0 16 16" className="pe-1" /> C
                  </div>
                  <div
                    onClick={() => randomLibrary()}
                    className="d-flex float-right-middle float-random align-items-center justify-content-center"
                  >
                    <Dice3 viewBox="0 0 16 16" className="pe-1" /> L
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
                              setCard={setCard}
                              setImageSet={setImageSet}
                            />
                          )}
                          {card && card.Id < 200000 && (
                            <ResultLibraryLayoutText
                              card={card}
                              setCard={setCard}
                              setImageSet={setImageSet}
                            />
                          )}
                        </div>
                        <div className="px-3 pt-3">
                          <div className="d-inline pe-2">
                            <ButtonCardCopyUrl id={card.Id} />
                          </div>
                          <div className="d-inline pe-2">
                            <ButtonAddCard
                              cardid={card.Id}
                              deckid={activeDeck.deckid}
                              card={card}
                              inDeck={inDeck}
                              inZap={true}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
                <div
                  onClick={() => toggleShowImage()}
                  className="d-flex float-right-bottom float-turn align-items-center justify-content-center"
                >
                  <ArrowRepeat viewBox="0 0 16 16" />
                </div>
              </>
            )}
          </>
        ) : (
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              {cryptCardBase && libraryCardBase && (
                <Row className="align-content-center justify-content-center py-3">
                  <Col className="px-0">
                    <QuickSelect setCard={setCard} />
                  </Col>
                </Row>
              )}
              {card && (
                <Row className="align-content-center justify-content-center mt-3 bordered">
                  <Col md={6} className="ps-0">
                    <CardImage />
                  </Col>
                  <Col md={6} className="pt-3">
                    {card && card.Id > 200000 && (
                      <ResultCryptLayoutText
                        card={card}
                        setCard={setCard}
                        setImageSet={setImageSet}
                      />
                    )}
                    {card && card.Id < 200000 && (
                      <ResultLibraryLayoutText
                        card={card}
                        setCard={setCard}
                        setImageSet={setImageSet}
                      />
                    )}
                    <div className="py-3">
                      <div className="d-inline pe-1">
                        <ButtonCardCopyUrl id={card.Id} />
                      </div>
                      <div className="d-inline pe-1">
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
                <Stack gap={1} className="py-3 px-2">
                  <Button
                    title="Random Crypt Card"
                    variant="secondary"
                    onClick={() => randomCrypt()}
                  >
                    <Dice3 /> Crypt
                  </Button>
                  <Button
                    title="Random Library Card"
                    variant="secondary"
                    onClick={() => randomLibrary()}
                  >
                    <Dice3 /> Library
                  </Button>
                </Stack>
              </Col>
            )}
          </Row>
        )}
      </>
    </Container>
  );
}

export default Cards;
