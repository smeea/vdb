import ArrowRepeat from "@icons/arrow-repeat.svg?react";
import Dice3 from "@icons/dice-3-fill.svg?react";
import { ButtonFloat, CardImage, CardSelect, ErrorMessage, ResultLayoutText } from "@/components";
import { ID } from "@/constants";
import { useApp } from "@/context";
import { getIsPlaytest } from "@/utils";

const CardsMobile = ({ card, openRandomCard, handleChange, handleSetCard }) => {
  const { showFloatingButtons, showImage, toggleShowImage, isMobile, playtestMode } = useApp();

  return (
    <>
      {card &&
        (playtestMode || !getIsPlaytest(card[ID]) ? (
          <div className="pb-[59px]">
            {showImage ? (
              <CardImage card={card} />
            ) : (
              <div className="p-3 pb-0">
                <ResultLayoutText card={card} setCard={handleSetCard} noClose />
              </div>
            )}
            {showFloatingButtons && (
              <div className="fixed z-30">
                <ButtonFloat onClick={toggleShowImage}>
                  <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
                </ButtonFloat>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <ErrorMessage>CONTAINS PLAYTEST CARDS</ErrorMessage>
          </div>
        ))}
      <div className="fixed bottom-10 z-20 flex w-full bg-bgPrimary p-2 dark:bg-bgPrimaryDark">
        <div className="w-full md:basis-8/12">
          <CardSelect
            menuPlacement={isMobile ? "top" : "auto"}
            autoFocus={!isMobile || !card?.[ID]}
            onChange={handleChange}
            value={null}
          />
        </div>
      </div>
      <div className="fixed z-10">
        <ButtonFloat onClick={() => openRandomCard(true)} position="top" variant="secondary">
          <Dice3 width="22" height="22" className="pr-1" viewBox="0 0 16 16" />
          <b>C</b>
        </ButtonFloat>
        <ButtonFloat onClick={() => openRandomCard(false)} position="middle" variant="secondary">
          <Dice3 width="22" height="22" className="pr-1" viewBox="0 0 16 16" />
          <b>L</b>
        </ButtonFloat>
      </div>
    </>
  );
};

export default CardsMobile;
