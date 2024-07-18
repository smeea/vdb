import React, { useEffect, useState } from 'react';
import ArrowRepeat from '@/assets/images/icons/arrow-repeat.svg?react';
import ChevronCompactLeft from '@/assets/images/icons/chevron-compact-left.svg?react';
import ChevronCompactRight from '@/assets/images/icons/chevron-compact-right.svg?react';
import { ButtonFloat, CardImage, ResultLayoutText, Modal } from '@/components';
import { useApp } from '@/context';
import { useSwipe } from '@/hooks';

const ResultModal = ({ card, handleModalCardChange, handleClose, forceInventoryMode }) => {
  const { showImage, toggleShowImage, isMobile } = useApp();

  const [imageSet, setImageSet] = useState(null);
  const [activeCard, setActiveCard] = useState(card);
  const [isHotkeysDisabled, setIsHotkeysDisabled] = useState(false);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setImageSet(null);
        handleModalCardChange(-1);
        break;
      case 'ArrowRight':
        setImageSet(null);
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
      size={showImage ? 'card' : 'cardText'}
      centered
      noBorder
      noPadding
    >
      <div className="relative">
        <div className="max-h-0 max-w-0 opacity-0">
          <button />
        </div>
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <CardImage
                className="h-auto w-full"
                card={activeCard}
                set={imageSet}
                onClick={handleClose}
              />
            ) : (
              <div className="w-full p-3">
                <ResultLayoutText
                  card={activeCard}
                  setCard={setActiveCard}
                  handleClose={handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={forceInventoryMode}
                  setIsHotkeysDisabled={setIsHotkeysDisabled}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <div className="border-y border-l border-bgSecondaryDark bg-black dark:border-bgSecondaryDark">
              <CardImage card={activeCard} set={imageSet} onClick={handleClose} />
            </div>
            <div className="w-full rounded-r border-y border-r border-bgSecondary p-5 dark:border-bgSecondaryDark">
              <ResultLayoutText
                card={activeCard}
                setCard={setActiveCard}
                handleClose={handleClose}
                setImageSet={setImageSet}
                forceInventoryMode={forceInventoryMode}
                setIsHotkeysDisabled={setIsHotkeysDisabled}
              />
            </div>
          </div>
        )}
        <div
          onClick={() => handleModalCardChange(-1)}
          className="absolute bottom-1/2 left-0 h-[50px] text-darkGray/50 dark:text-midGray/50 sm:left-[-40px] sm:text-white sm:dark:text-whiteDark"
        >
          <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
        </div>
        <div
          onClick={() => handleModalCardChange(1)}
          className="absolute bottom-1/2 right-0 h-[50px] text-darkGray/50 dark:text-midGray/50 sm:right-[-40px] sm:text-white sm:dark:text-whiteDark"
        >
          <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
        </div>
        {isMobile && (
          <ButtonFloat onClick={toggleShowImage} variant="primary" position="middle">
            <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
          </ButtonFloat>
        )}
      </div>
    </Modal>
  );
};

export default ResultModal;
