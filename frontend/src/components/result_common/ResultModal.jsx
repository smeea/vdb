import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ArrowRepeat from '@icons/arrow-repeat.svg?react';
import ChevronCompactLeft from '@icons/chevron-compact-left.svg?react';
import ChevronCompactRight from '@icons/chevron-compact-right.svg?react';
import { ButtonFloat, CardImage, Modal, ResultLayoutText } from '@/components';
import { useApp } from '@/context';
import { useSwipe } from '@/hooks';

const ResultModal = ({ card, handleModalCardChange, handleClose, forceInventoryMode }) => {
  const { showImage, toggleShowImage, isMobile } = useApp();

  const [activeCard, setActiveCard] = useState(card);
  const [isHotkeysDisabled, setIsHotkeysDisabled] = useState(false);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        handleModalCardChange(-1);
        break;
      case 'ArrowRight':
        handleModalCardChange(1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setActiveCard(card);

    if (!isMobile && !isHotkeysDisabled) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [card, isHotkeysDisabled]);

  const { swipeHandlers } = useSwipe(
    () => handleModalCardChange(1),
    () => handleModalCardChange(-1),
  );

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
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <CardImage card={activeCard} onClick={handleClose} />
            ) : (
              <div className="w-full">
                <ResultLayoutText
                  card={activeCard}
                  setCard={setActiveCard}
                  handleClose={handleClose}
                  forceInventoryMode={forceInventoryMode}
                  setIsHotkeysDisabled={setIsHotkeysDisabled}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <div className="border-bgSecondaryDark dark:border-bgSecondaryDark border-y border-l bg-black hover:cursor-pointer">
              <CardImage card={activeCard} onClick={handleClose} />
            </div>
            <div className="border-bgSecondary dark:border-bgSecondaryDark w-full rounded-r border-y border-r p-5">
              <ResultLayoutText
                card={activeCard}
                setCard={setActiveCard}
                handleClose={handleClose}
                forceInventoryMode={forceInventoryMode}
                setIsHotkeysDisabled={setIsHotkeysDisabled}
              />
            </div>
          </div>
        )}
        <div
          onClick={() => handleModalCardChange(-1)}
          className={twMerge(
            'text-darkGray/50 dark:text-midGray/50 sm:dark:text-whiteDark absolute bottom-1/2 left-[-40px] sm:text-white',
            showImage ? 'h-[50px] max-sm:left-[0px]' : 'h-[48px] max-sm:left-[-20px]',
          )}
        >
          <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
        </div>
        <div
          onClick={() => handleModalCardChange(1)}
          className={twMerge(
            'text-darkGray/50 dark:text-midGray/50 sm:dark:text-whiteDark absolute right-[-40px] bottom-1/2 sm:text-white',
            showImage ? 'h-[50px] max-sm:right-[0px]' : 'h-[48px] max-sm:right-[-20px]',
          )}
        >
          <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
        </div>
        {isMobile && (
          <ButtonFloat onClick={toggleShowImage} position="middle">
            <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
          </ButtonFloat>
        )}
      </div>
    </Modal>
  );
};

export default ResultModal;
