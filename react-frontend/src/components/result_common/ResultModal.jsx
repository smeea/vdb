import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Modal, Row, Col, Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from 'assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from 'assets/images/icons/chevron-compact-right.svg';
import SearchHeartFill from 'assets/images/icons/search-heart-fill.svg';
import {
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
  ButtonCardCopyUrl,
  ButtonToggleShowImage,
  ButtonSearchCardInDecks,
  ButtonIconed,
  CardImage,
} from 'components';
import { useApp, useSearchResults } from 'context';

const ResultModal = ({
  card,
  handleModalCardChange,
  handleClose,
  nested,
  forceInventoryMode,
}) => {
  const { showImage, toggleShowImage, isMobile } = useApp();
  const { cryptCompare, setCryptCompare, libraryCompare, setLibraryCompare } =
    useSearchResults();

  const [imageSet, setImageSet] = useState(null);
  const [activeCard, setActiveCard] = useState(card);

  let compare;
  let setCompare;
  if (activeCard.Id > 200000) {
    compare = cryptCompare;
    setCompare = setCryptCompare;
  } else {
    compare = libraryCompare;
    setCompare = setLibraryCompare;
  }

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

  const handleCompare = () => {
    setCompare(() => {
      if (!compare) {
        return [activeCard];
      } else if (!compare.includes(activeCard)) {
        return [...compare, activeCard];
      } else {
        return compare.filter((c) => c !== activeCard);
      }
    });

    handleClose();
  };

  const cardInCompare = compare && compare.includes(activeCard);

  useEffect(() => {
    setActiveCard(card);

    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [card]);

  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => handleModalCardChange(-1),
    onSwipedLeft: (eventData) => handleModalCardChange(1),
  });

  return (
    <Modal
      size="lg"
      show={true}
      onHide={handleClose}
      animation={false}
      centered={true}
      dialogClassName={nested ? 'nested-modal' : 'no-border'}
    >
      <Modal.Body className="p-0">
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <>
                <CardImage
                  className="full-width"
                  card={activeCard}
                  set={imageSet}
                  onClick={handleClose}
                />
                <div
                  onClick={() => handleModalCardChange(-1)}
                  className="prev-card-mobile"
                >
                  <ChevronCompactLeft
                    width="48"
                    height="64"
                    viewBox="4 0 12 16"
                  />
                </div>
                <div
                  onClick={() => handleModalCardChange(1)}
                  className="next-card-mobile"
                >
                  <ChevronCompactRight
                    width="48"
                    height="64"
                    viewBox="0 0 12 16"
                  />
                </div>
              </>
            ) : (
              <div className="p-3">
                {activeCard.Id > 200000 ? (
                  <ResultCryptLayoutText
                    card={activeCard}
                    setCard={setActiveCard}
                    handleClose={handleClose}
                    setImageSet={setImageSet}
                    forceInventoryMode={forceInventoryMode}
                  />
                ) : (
                  <ResultLibraryLayoutText
                    card={activeCard}
                    handleClose={handleClose}
                    setImageSet={setImageSet}
                    forceInventoryMode={forceInventoryMode}
                  />
                )}
                <Stack direction="horizontal" gap={1} className="pt-3">
                  <ButtonCardCopyUrl cardid={activeCard.Id} />
                  <ButtonSearchCardInDecks
                    cardid={activeCard.Id}
                    target="twd"
                  />
                  <ButtonSearchCardInDecks
                    cardid={activeCard.Id}
                    target="pda"
                  />
                  <ButtonIconed
                    variant={cardInCompare ? 'third' : 'primary'}
                    onClick={() => handleCompare()}
                    title="Compare Card"
                    icon={
                      <SearchHeartFill
                        width="16"
                        height="24"
                        viewBox="0 0 16 16"
                      />
                    }
                  />
                </Stack>
              </div>
            )}
            <div
              onClick={() => toggleShowImage()}
              className="d-flex float-right-middle float-turn align-items-center justify-content-center"
            >
              <ArrowRepeat viewBox="0 0 16 16" />
            </div>
            <div
              onClick={handleClose}
              className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
            >
              <X viewBox="0 0 16 16" />
            </div>
          </div>
        ) : (
          <Row className="mx-0">
            <Col md={5} className="bg-black px-0">
              <CardImage
                className="full-width"
                card={activeCard}
                set={imageSet}
                onClick={handleClose}
              />
            </Col>
            <Col className="p-4">
              {activeCard.Id > 200000 ? (
                <ResultCryptLayoutText
                  card={activeCard}
                  setCard={setActiveCard}
                  handleClose={handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={forceInventoryMode}
                />
              ) : (
                <ResultLibraryLayoutText
                  card={activeCard}
                  handleClose={handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={forceInventoryMode}
                />
              )}
              <div className="d-flex justify-content-between pt-3">
                <Stack direction="horizontal" gap={1}>
                  <ButtonCardCopyUrl cardid={activeCard.Id} />
                  <ButtonSearchCardInDecks
                    cardid={activeCard.Id}
                    target="twd"
                  />
                  <ButtonSearchCardInDecks
                    cardid={activeCard.Id}
                    target="pda"
                  />
                  <ButtonToggleShowImage />
                  <ButtonIconed
                    variant={cardInCompare ? 'third' : 'primary'}
                    onClick={() => handleCompare()}
                    title="Compare Card"
                    icon={
                      <SearchHeartFill
                        width="16"
                        height="24"
                        viewBox="0 0 16 16"
                      />
                    }
                  />
                </Stack>
                <ButtonIconed
                  variant="primary"
                  onClick={handleClose}
                  title="Close"
                  icon={<X width="24" height="24" viewBox="0 0 16 16" />}
                  text="Close"
                />
              </div>
            </Col>
          </Row>
        )}
        {!isMobile && (
          <>
            <div
              onClick={() => handleModalCardChange(-1)}
              className="prev-card"
            >
              <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
            </div>
            <div onClick={() => handleModalCardChange(1)} className="next-card">
              <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
