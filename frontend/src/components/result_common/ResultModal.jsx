import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import ArrowRepeat from '@/assets/images/icons/arrow-repeat.svg?react';
import ChevronCompactLeft from '@/assets/images/icons/chevron-compact-left.svg?react';
import ChevronCompactRight from '@/assets/images/icons/chevron-compact-right.svg?react';
import {
  ButtonFloat,
  ButtonFloatClose,
  CardImage,
  ResultLayoutText,
  Modal,
} from '@/components';
import { useApp } from '@/context';

const ResultModal = ({
  card,
  handleModalCardChange,
  handleClose,
  nested,
  forceInventoryMode,
}) => {
  const { showImage, toggleShowImage, isMobile, isNarrow } = useApp();

  const [imageSet, setImageSet] = useState(null);
  const [activeCard, setActiveCard] = useState(card);

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

    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [card]);

  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedRight: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD) {
        handleModalCardChange(-1);
      }
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD) {
        handleModalCardChange(1);
      }
    },
  });

  return (
    <Modal
      handleClose={handleClose}
      nested={nested}
      size="card"
      centered
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
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <div className="bg-black">
              <CardImage
                card={activeCard}
                set={imageSet}
                onClick={handleClose}
              />
            </div>
            <div className="w-full p-5">
              <ResultLayoutText
                card={activeCard}
                setCard={setActiveCard}
                handleClose={handleClose}
                setImageSet={setImageSet}
                forceInventoryMode={forceInventoryMode}
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
          <ButtonFloat
            onClick={toggleShowImage}
            variant="primary"
            position="middle"
          >
            <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
          </ButtonFloat>
        )}
        {isNarrow && <ButtonFloatClose handleClose={handleClose} />}
      </div>
    </Modal>
  );
};

export default ResultModal;
