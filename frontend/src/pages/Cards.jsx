import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import ArrowRepeat from '@/assets/images/icons/arrow-repeat.svg?react';
import Dice3 from '@/assets/images/icons/dice-3-fill.svg?react';
import {
  CardSelect,
  ResultLayoutText,
  ButtonIconed,
  CardImage,
  ButtonFloat,
} from '@/components';
import { useApp, searchResults } from '@/context';

const Cards = () => {
  const params = useParams();
  const {
    cryptCardBase,
    libraryCardBase,
    showImage,
    toggleShowImage,
    isMobile,
    playtestMode,
  } = useApp();

  const card = useSnapshot(searchResults).quickCard;
  const [imageSet, setImageSet] = useState(null);
  const navigate = useNavigate();

  const handleSetCard = (card) => {
    navigate(`/cards/${card.Id}`);
  };

  const handleChange = (event) => {
    handleSetCard({ Id: event.value });
  };

  const randomCrypt = () => {
    const cardid =
      Math.floor(
        Math.random() *
          Math.floor(
            Object.keys(cryptCardBase).filter(
              (cardid) => playtestMode || cardid < 210000
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
              (cardid) => playtestMode || cardid < 110000
            ).length
          )
      ) + 100000;
    navigate(`/cards/${cardid}`);
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      searchResults.quickCard =
        params.cardid > 200000
          ? cryptCardBase[params.cardid]
          : libraryCardBase[params.cardid];
    }
  }, [params.cardid, cryptCardBase, libraryCardBase]);

  return (
    <div className="cards-container mx-auto">
      <>
        {isMobile ? (
          <>
            {card && (
              <div className="pb-[59px]">
                {showImage ? (
                  <CardImage className="w-full" card={card} set={imageSet} />
                ) : (
                  <div className="p-3 pb-0">
                    <ResultLayoutText
                      card={card}
                      setImageSet={setImageSet}
                      noClose
                    />
                  </div>
                )}
                <div className="fixed z-30">
                  <ButtonFloat onClick={toggleShowImage} variant="primary">
                    <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
                  </ButtonFloat>
                </div>
              </div>
            )}
            <div className="fixed bottom-[44px] z-20 flex w-full flex-row bg-bgPrimary p-2 dark:bg-bgPrimaryDark">
              <div className="w-full md:basis-8/12">
                <CardSelect
                  autoFocus={!isMobile || !card?.Id}
                  onChange={handleChange}
                  value={null}
                />
              </div>
            </div>
            <div className="fixed z-10">
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
            </div>
          </>
        ) : (
          <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
            <div className="block lg:min-w-[175px]" />
            <div className="flex basis-full flex-col sm:gap-4 lg:gap-6 xl:gap-8">
              {cryptCardBase && libraryCardBase && (
                <div>
                  <CardSelect
                    autoFocus={!isMobile || !card?.Id}
                    onChange={handleChange}
                    value={null}
                  />
                </div>
              )}
              {card && (
                <div className="flex border border-bgSecondary dark:border-bgSecondaryDark">
                  <div>
                    <CardImage card={card} set={imageSet} />
                  </div>
                  <div className="w-full p-5">
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
            <div className="min-w-[175px] max-sm:hidden">
              <div className="sticky z-30 flex w-full flex-col space-y-1 bg-bgPrimary dark:bg-bgPrimaryDark lg:top-[44px]">
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
