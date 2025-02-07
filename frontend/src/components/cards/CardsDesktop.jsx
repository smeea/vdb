import Dice3 from '@icons/dice-3-fill.svg?react';
import {
  ButtonIconed,
  CardImage,
  CardSelect,
  ErrorMessage,
  FlexGapped,
  ResultLayoutText,
} from '@/components';
import { ID } from '@/constants';
import { useApp } from '@/context';
import { getIsPlaytest } from '@/utils';

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
              <div className="border-bgSecondary dark:border-bgSecondaryDark flex">
                <div>
                  <CardImage card={card} />
                </div>
                <div className="w-full pt-1 pl-5">
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
        <div className="bg-bgPrimary dark:bg-bgPrimaryDark sticky z-30 flex w-full flex-col gap-1 lg:top-10">
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
