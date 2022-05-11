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
import { useApp } from 'context';

const Cards = ({ lastDeckId }) => {
  const params = useParams();
  const {
    cryptCardBase,
    libraryCardBase,
    showImage,
    toggleShowImage,
    isMobile,
  } = useApp();

  const [cardid, setCardid] = useState(undefined);
  const [card, setCard] = useState(undefined);
  const [imageSet, setImageSet] = useState(null);
  const navigate = useNavigate();

  const randomCrypt = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(cryptCardBase).length)
      ) + 200000;
    setCardid(id);
  };

  const randomLibrary = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(libraryCardBase).length)
      ) + 100000;
    setCardid(id);
  };

  useEffect(() => {
    if (!cardid) setCardid(params.id);
  }, [params.id]);

  useEffect(() => {
    if (cardid) {
      if (params.id !== cardid) navigate(`/cards/${cardid}`);
      cardid > 200000
        ? setCard(cryptCardBase[cardid])
        : setCard(libraryCardBase[cardid]);
    }
  }, [cardid]);

  return (
    <Container className="cards-container px-0 p-md-0">
      <>
        {isMobile ? (
          <>
            <Row className="align-content-center justify-content-center mx-0 px-1 py-1">
              <Col md={8} className="px-0">
                <QuickSelect setCardid={setCardid} />
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
            {card && (
              <>
                <Row className="m-0 p-0">
                  <Col className="m-0 p-0">
                    {showImage ? (
                      <CardImage
                        className="full-width"
                        card={card}
                        set={imageSet}
                      />
                    ) : (
                      <>
                        <div className="p-3">
                          <ResultLayoutText
                            card={card}
                            setCard={setCard}
                            setImageSet={setImageSet}
                            inCards={true}
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
          </>
        ) : (
          <Row>
            <Col md={{ span: 8, offset: 2 }} className="quick-cards">
              {cryptCardBase && libraryCardBase && (
                <Row className="align-content-center justify-content-center py-3">
                  <Col className="px-0">
                    <QuickSelect setCardid={setCardid} />
                  </Col>
                </Row>
              )}
              {card && (
                <Row className="align-content-center justify-content-center my-3 bordered">
                  <Col md={6} className="ps-0">
                    <CardImage
                      className="full-width"
                      card={card}
                      set={imageSet}
                    />
                  </Col>
                  <Col md={6} className="py-3">
                    <ResultLayoutText
                      card={card}
                      setCard={setCard}
                      setImageSet={setImageSet}
                      inCards={true}
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
