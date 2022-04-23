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
  ButtonSearchTwd,
  ButtonSearchPda,
  ButtonIconed,
  CardImage,
} from 'components';
import { useApp, useSearchResults } from 'context';

const ResultModal = (props) => {
  const { showImage, toggleShowImage, isMobile } = useApp();
  const { compare, setCompare } = useSearchResults();

  const [imageSet, setImageSet] = useState(null);
  const [card, setCard] = useState(props.card);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setImageSet(null);
        props.handleModalCardChange(-1);
        break;
      case 'ArrowRight':
        setImageSet(null);
        props.handleModalCardChange(1);
        break;
      default:
        break;
    }
  };

  const handleCompare = () => {
    setCompare(() => {
      if (!compare) {
        return [props.card];
      } else if (!compare.includes(props.card)) {
        return [...compare, props.card];
      } else {
        return compare.filter((c) => c !== props.card);
      }
    });

    props.handleClose();
  };

  const cardInCompare = compare && compare.includes(props.card);

  useEffect(() => {
    setCard(props.card);

    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [props.card]);

  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => props.handleModalCardChange(-1),
    onSwipedLeft: (eventData) => props.handleModalCardChange(1),
  });

  return (
    <Modal
      size="lg"
      show={true}
      onHide={props.handleClose}
      animation={false}
      centered={true}
      dialogClassName={props.nested ? 'nested-modal' : 'no-border'}
    >
      <Modal.Body className="p-0">
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <>
                <CardImage
                  className="card-popover full-width"
                  card={card}
                  set={imageSet}
                  onClick={props.handleClose}
                />
                <div
                  onClick={() => props.handleModalCardChange(-1)}
                  className="prev-card-mobile"
                >
                  <ChevronCompactLeft
                    width="48"
                    height="64"
                    viewBox="4 0 12 16"
                  />
                </div>
                <div
                  onClick={() => props.handleModalCardChange(1)}
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
                {card.Id > 200000 ? (
                  <ResultCryptLayoutText
                    card={card}
                    setCard={setCard}
                    handleClose={props.handleClose}
                    setImageSet={setImageSet}
                    forceInventoryMode={props.forceInventoryMode}
                  />
                ) : (
                  <ResultLibraryLayoutText
                    card={props.card} // props.card?
                    handleClose={props.handleClose}
                    setImageSet={setImageSet}
                    forceInventoryMode={props.forceInventoryMode}
                  />
                )}
                <Stack direction="horizontal" gap={1} className="pt-3">
                  <ButtonCardCopyUrl id={card.Id} />
                  <ButtonSearchTwd id={card.Id} />
                  <ButtonSearchPda id={card.Id} />
                  <ButtonIconed
                    variant={cardInCompare ? 'third' : 'primary'}
                    onClick={handleCompare}
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
              onClick={props.handleClose}
              className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
            >
              <X viewBox="0 0 16 16" />
            </div>
          </div>
        ) : (
          <Row className="mx-0">
            <Col md={5} className="bg-black px-0">
              <CardImage
                className="card-popover full-width"
                card={card}
                set={imageSet}
                onClick={props.handleClose}
              />
            </Col>
            <Col className="p-4">
              {card.Id > 200000 ? (
                <ResultCryptLayoutText
                  card={card}
                  setCard={setCard}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={props.forceInventoryMode}
                />
              ) : (
                <ResultLibraryLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={props.forceInventoryMode}
                />
              )}
              <div className="d-flex justify-content-between pt-3">
                <Stack direction="horizontal" gap={1}>
                  <ButtonCardCopyUrl id={card.Id} />
                  <ButtonSearchTwd id={card.Id} />
                  <ButtonSearchPda id={card.Id} />
                  <ButtonToggleShowImage />
                  <ButtonIconed
                    variant={cardInCompare ? 'third' : 'primary'}
                    onClick={handleCompare}
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
                  onClick={props.handleClose}
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
              onClick={() => props.handleModalCardChange(-1)}
              className="prev-card"
            >
              <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
            </div>
            <div
              onClick={() => props.handleModalCardChange(1)}
              className="next-card"
            >
              <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
