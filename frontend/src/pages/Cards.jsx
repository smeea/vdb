import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import {
  QuickSelect,
  ResultLayoutText,
  ButtonIconed,
  CardImage,
  ButtonFloat,
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

  const X_SPACING = 'space-x-8';
  const Y_SPACING = 'space-y-8';
  const TOP_SPACING = 'pt-8';

  return (
    <div className="cards-container mx-auto">
      <>
        {isMobile ? (
          <>
            {card && (
              <>
                <div className="flex flex-row">
                  <div className="m-0">
                    {showImage ? (
                      <CardImage
                        className="h-auto w-full"
                        card={card}
                        set={imageSet}
                      />
                    ) : (
                      <>
                        <div className=" ">
                          <ResultLayoutText
                            card={card}
                            setImageSet={setImageSet}
                            noClose={true}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <ButtonFloat onClick={toggleShowImage} variant="primary">
                  <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
                </ButtonFloat>
              </>
            )}
            <div className="fixed bottom-[40px]  flex w-full flex-row  ">
              <div className=" md:basis-8/12">
                <QuickSelect
                  selectedCardid={card && card.Id}
                  setCard={handleSetCard}
                />
              </div>
            </div>
            <ButtonFloat
              onClick={randomCrypt}
              position="top"
              variant="secondary"
            >
              <Dice3
                width="22"
                height="22"
                className="pr-1"
                viewBox="0 0 16 16"
              />
              <b>C</b>
            </ButtonFloat>
            <ButtonFloat
              onClick={randomLibrary}
              position="middle"
              variant="secondary"
            >
              <Dice3
                width="22"
                height="22"
                className="pr-1"
                viewBox="0 0 16 16"
              />
              <b>L</b>
            </ButtonFloat>
          </>
        ) : (
          <div className={`flex flex-row ${X_SPACING} ${TOP_SPACING}`}>
            <div className="md:basis-1/12" />
            <div className={`quick-cards md:basis-9/12 ${Y_SPACING}`}>
              {cryptCardBase && libraryCardBase && (
                <div>
                  <QuickSelect
                    selectedCardid={card && card.Id}
                    setCard={handleSetCard}
                  />
                </div>
              )}
              {card && (
                <div className="flex flex-row border border-bgSecondary dark:border-bgSecondaryDark">
                  <div className="w-1/2">
                    <CardImage
                      className="h-auto w-full"
                      card={card}
                      set={imageSet}
                    />
                  </div>
                  <div className="w-1/2 p-5">
                    <ResultLayoutText
                      card={card}
                      setImageSet={setImageSet}
                      setCard={handleSetCard}
                      noClose
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="md:basis-2/12">
              <div className="top-[77px] z-20 flex flex-col space-y-1 bg-bgPrimary dark:bg-bgPrimaryDark">
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
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cards;
