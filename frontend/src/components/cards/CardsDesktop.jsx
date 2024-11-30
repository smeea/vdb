import React from 'react';
import Dice3 from '@icons/dice-3-fill.svg?react';
import {
  CardSelect,
  ResultLayoutText,
  ButtonIconed,
  CardImage,
  FlexGapped,
  ErrorMessage,
} from '@/components';
import { useApp } from '@/context';
import { getIsPlaytest } from '@/utils';
import { ID } from '@/constants';

const CardsDesktop = ({ card, openRandomCard, handleChange, handleSetCard }) => {
  const { cryptCardBase, libraryCardBase, isMobile, playtestMode } = useApp();

  return (
    <FlexGapped>
      <div className="block lg:min-w-[175px]" />
      <FlexGapped className="basis-full flex-col">
        {cryptCardBase && libraryCardBase && (
          <div>
            <CardSelect autoFocus={!isMobile || !card?.[ID]} onChange={handleChange} value={null} />
          </div>
        )}
        {card && (
          <>
            {playtestMode || !getIsPlaytest(card[ID]) ? (
              <div className="flex border-bgSecondary dark:border-bgSecondaryDark">
                <div>
                  <CardImage card={card} />
                </div>
                <div className="w-full pl-5 pt-1">
                  <ResultLayoutText card={card} setCard={handleSetCard} noClose />
                </div>
              </div>
            ) : (
              <div className="flex">
                <ErrorMessage>CONTAINS PLAYTEST CARDS</ErrorMessage>
              </div>
            )}
          </>
        )}
      </FlexGapped>
      <div className="min-w-[175px] max-sm:hidden">
        <div className="sticky z-30 flex w-full flex-col gap-1 bg-bgPrimary dark:bg-bgPrimaryDark lg:top-10">
          <ButtonIconed
            variant="secondary"
            onClick={() => openRandomCard(true)}
            title="Random Crypt Card"
            icon={<Dice3 />}
            text="Crypt"
          />
          <ButtonIconed
            variant="secondary"
            onClick={() => openRandomCard(false)}
            title="Random Library Card"
            icon={<Dice3 />}
            text="Library"
          />
        </div>
      </div>
    </FlexGapped>
  );
};

export default CardsDesktop;
