import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Stack } from 'react-bootstrap';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import {
  QuickSelect,
  ResultLayoutText,
  ButtonIconed,
  CardImage,
} from 'components';
import { useApp, setQuickCard } from 'context';

const Cards = () => {
  const params = useParams();
  const {
    cryptCardBase,
    libraryCardBase,
    showImage,
    toggleShowImage,
    isMobile,
    playtest,
  } = useApp();

  const [card, setCard] = useState();
  const [imageSet, setImageSet] = useState(null);
  const navigate = useNavigate();

  const handleSetCard = (card) => {
    navigate(`/cards/${card.Id}`);
  };

  const randomCrypt = () => {
    const cardid =
      Math.floor(
        Math.random() *
          Math.floor(
            Object.keys(cryptCardBase).filter(
              (cardid) => playtest || cardid < 210000
            ).length
          )
      ) + 200000;
    navigate(`/cards/${cardid}`);
  };

  const randomLibrary = () => {
    const cardid =
      Math.floor(
        Math.random() *
          Math.floor(
            Object.keys(libraryCardBase).filter(
              (cardid) => playtest || cardid < 110000
            ).length
          )
      ) + 100000;
    navigate(`/cards/${cardid}`);
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      setQuickCard(params.cardid);
      setCard(
        params.cardid > 200000
          ? cryptCardBase[params.cardid]
          : libraryCardBase[params.cardid]
      );
    }
  }, [params.cardid, cryptCardBase, libraryCardBase]);

  return (
    <div className="cards-container mx-auto px-0 p-md-0">
      <>
        {isMobile ? (
          <>
            {card && (
              <>
                <div className="flex flex-row m-0 mb-3 mb-md-0 p-0">
                  <Col className="m-0 p-0">
                    {showImage ? (
                      <CardImage
                        className="w-full h-auto"
                        card={card}
                        set={imageSet}
                      />
                    ) : (
                      <>
                        <div className="px-3 pt-3">
                          <ResultLayoutText
                            card={card}
                            setImageSet={setImageSet}
                            noClose={true}
                          />
                        </div>
                      </>
                    )}
                  </Col>
                </div>
                <div
                  onClick={() => toggleShowImage()}
                  className="flex float-right-bottom float-turn items-center justify-center"
                >
                  <ArrowRepeat viewBox="0 0 16 16" />
                </div>
              </>
            )}
            <div className="flex flex-row fixed w-full bottom-[40px] mx-0 px-1 py-1">
              <Col md={8} className="px-0">
                <QuickSelect
                  selectedCardid={card && card.Id}
                  setCard={handleSetCard}
                />
              </Col>
            </div>
            <div
              onClick={() => randomCrypt()}
              className="flex float-right-top float-random items-center justify-center"
            >
              <Dice3 viewBox="0 0 16 16" className="pe-1" /> C
            </div>
            <div
              onClick={() => randomLibrary()}
              className="flex float-right-middle float-random items-center justify-center"
            >
              <Dice3 viewBox="0 0 16 16" className="pe-1" /> L
            </div>
          </>
        ) : (
          <div className="flex flex-row">
            <Col md={{ span: 8, offset: 2 }} className="quick-cards">
              {cryptCardBase && libraryCardBase && (
                <div className="flex flex-row align-justify-center justify-center py-3">
                  <Col className="px-0">
                    <QuickSelect
                      selectedCardid={card && card.Id}
                      setCard={handleSetCard}
                    />
                  </Col>
                </div>
              )}
              {card && (
                <div className="flex flex-row align-justify-center justify-center my-2 bordered">
                  <Col md={6} className="ps-0">
                    <CardImage
                      className="w-full h-auto"
                      card={card}
                      set={imageSet}
                    />
                  </Col>
                  <Col md={6} className="py-3">
                    <ResultLayoutText
                      card={card}
                      setImageSet={setImageSet}
                      setCard={handleSetCard}
                      noClose
                    />
                  </Col>
                </div>
              )}
            </Col>
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
          </div>
        )}
      </>
    </div>
  );
};

export default Cards;
