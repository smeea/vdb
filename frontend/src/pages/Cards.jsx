import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import {
  QuickSelect,
  ResultLayoutText,
  ButtonIconed,
  CardImage,
} from 'components';
import { useApp, useSearchForms } from 'context';

const Cards = ({ lastDeckId }) => {
  const params = useParams();
  const {
    cryptCardBase,
    libraryCardBase,
    showImage,
    toggleShowImage,
    isMobile,
    playtest
  } = useApp();

  const { quickCard, setQuickCard } = useSearchForms();

  const [imageSet, setImageSet] = useState(null);
  const navigate = useNavigate();

  const randomCrypt = () => {
    const cardid =
      Math.floor(
        Math.random() * Math.floor(Object.keys(cryptCardBase).filter(cardid => playtest || cardid < 210000).length)
      ) + 200000;
    setQuickCard(cryptCardBase[cardid]);
  };

  const randomLibrary = () => {
    const cardid =
      Math.floor(
        Math.random() * Math.floor(Object.keys(libraryCardBase).filter(cardid => playtest || cardid < 110000).length)
      ) + 100000;
    setQuickCard(libraryCardBase[cardid]);
  };

  useEffect(() => {
    if (quickCard) {
      if (params.id != quickCard.Id) navigate(`/cards/${quickCard.Id}`);
    } else if (cryptCardBase && libraryCardBase) {
      if (params.id > 200000) {
        setQuickCard(cryptCardBase[params.id]);
      } else if (params.id > 100000) {
        setQuickCard(libraryCardBase[params.id]);
      }
    }
  }, [quickCard, cryptCardBase, libraryCardBase]);

  return (
    <Container className="cards-container px-0 p-md-0">
      <>
        {isMobile ? (
          <>
            {quickCard && (
              <>
                <Row className="m-0 mb-3 mb-md-0 p-0">
                  <Col className="m-0 p-0">
                    {showImage ? (
                      <CardImage
                        className="full-width"
                        card={quickCard}
                        set={imageSet}
                      />
                    ) : (
                      <>
                        <div className="px-3 pt-3">
                          <ResultLayoutText
                            card={quickCard}
                            setCard={setQuickCard}
                            setImageSet={setImageSet}
                            noClose={true}
                          />
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
            <Row className="above-nav-bottom mx-0 px-1 py-1">
              <Col md={8} className="px-0">
                <QuickSelect
                  selectedCardid={quickCard && quickCard.Id}
                  setCard={setQuickCard}
                />
              </Col>
            </Row>
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
          </>
        ) : (
          <Row>
            <Col md={{ span: 8, offset: 2 }} className="quick-cards">
              {cryptCardBase && libraryCardBase && (
                <Row className="align-content-center justify-content-center py-3">
                  <Col className="px-0">
                    <QuickSelect
                      selectedCardid={quickCard && quickCard.Id}
                      setCard={setQuickCard}
                    />
                  </Col>
                </Row>
              )}
              {quickCard && (
                <Row className="align-content-center justify-content-center my-2 bordered">
                  <Col md={6} className="ps-0">
                    <CardImage
                      className="full-width"
                      card={quickCard}
                      set={imageSet}
                    />
                  </Col>
                  <Col md={6} className="py-3">
                    <ResultLayoutText
                      card={quickCard}
                      setCard={setQuickCard}
                      setImageSet={setImageSet}
                      noClose={true}
                    />
                  </Col>
                </Row>
              )}
            </Col>
            {!isMobile && (
              <Col>
                <Stack gap={1} className="py-3 px-2">
                  <ButtonIconed
                    variant="secondary"
                    onClick={() => randomCrypt()}
                    title="Random Crypt Card"
                    icon={<Dice3 />}
                    text="Crypt"
                  />
                  <ButtonIconed
                    variant="secondary"
                    onClick={() => randomLibrary()}
                    title="Random Library Card"
                    icon={<Dice3 />}
                    text="Library"
                  />
                </Stack>
              </Col>
            )}
          </Row>
        )}
      </>
    </Container>
  );
};

export default Cards;
