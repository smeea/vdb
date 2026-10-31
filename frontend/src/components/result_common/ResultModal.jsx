import ArrowRepeat from "@icons/arrow-repeat.svg?react";
import ChevronCompactLeft from "@icons/chevron-compact-left.svg?react";
import ChevronCompactRight from "@icons/chevron-compact-right.svg?react";
import { useEffect, useState } from "react";
import { ButtonFloat, CardImage, Modal, ResultLayoutText } from "@/components";
import { useApp } from "@/context";
import { useSwipe } from "@/hooks";

const ResultModal = ({ card, handleModalCardChange, handleClose }) => {
  const { showImage, toggleShowImage, isMobile } = useApp();
  const [activeCard, setActiveCard] = useState(card);
  const [isHotkeysDisabled, setIsHotkeysDisabled] = useState(false);

  const handleModalCardPlus = () => handleModalCardChange(1);
  const handleModalCardMinus = () => handleModalCardChange(-1);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        handleModalCardMinus();
        break;
      case "ArrowRight":
        handleModalCardPlus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setActiveCard(card);

    if (!isMobile && !isHotkeysDisabled) {
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [card, isHotkeysDisabled]);

  const { swipeHandlers } = useSwipe(handleModalCardPlus, handleModalCardMinus);

  return (
    <Modal
      handleClose={handleClose}
      size="card"
      centered
      noBorder
      noPadding={!isMobile || showImage}
      withMobileMargin={!showImage}
      noClose
    >
      <div className="relative">
        <div className="max-h-0 max-w-0 opacity-0">
          <button type="button" />
        </div>
        <div className="sm:hidden" {...swipeHandlers}>
          {showImage ? (
            <CardImage card={activeCard} onClick={handleClose} />
          ) : (
            <div className="w-full">
              <ResultLayoutText
                card={activeCard}
                setCard={setActiveCard}
                handleClose={handleClose}
                setIsHotkeysDisabled={setIsHotkeysDisabled}
              />
            </div>
          )}
        </div>
        <div className="flex max-sm:hidden">
          <div className="border-bgSecondaryDark dark:border-bgSecondaryDark cursor-pointer border-y border-l bg-black">
            <CardImage card={activeCard} onClick={handleClose} />
          </div>
          <div className="border-bgSecondary dark:border-bgSecondaryDark w-full rounded-r border-y border-r p-5">
            <ResultLayoutText
              card={activeCard}
              setCard={setActiveCard}
              handleClose={handleClose}
              setIsHotkeysDisabled={setIsHotkeysDisabled}
            />
          </div>
        </div>
        <div
          onClick={handleModalCardMinus}
          className="text-darkGray/50 dark:text-midGray/50 sm:dark:text-whiteDark absolute top-1/2 left-[-15px] h-[50px] -translate-1/2 max-sm:fixed max-sm:left-[27px] sm:text-white"
        >
          <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
        </div>
        <div
          onClick={handleModalCardPlus}
          className="text-darkGray/50 dark:text-midGray/50 sm:dark:text-whiteDark absolute top-1/2 right-[-65px] h-[50px] -translate-1/2 max-sm:fixed max-sm:right-[-21px] sm:text-white"
        >
          <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
        </div>
        <ButtonFloat className="sm:hidden" onClick={toggleShowImage} position="middle">
          <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      </div>
    </Modal>
  );
};

export default ResultModal;
