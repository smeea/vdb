import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from 'assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from 'assets/images/icons/chevron-compact-right.svg';
import {
  ResultLibraryLayoutText,
  ButtonCardCopyUrl,
  ButtonToggleShowImage,
  CardImage,
} from 'components';
import { useApp } from 'context';

function ResultLibraryModal(props) {
  const { showImage, toggleShowImage, isMobile } = useApp();

  const [imageSet, setImageSet] = useState(null);

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

  useEffect(() => {
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
                  card={props.card}
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
                <ResultLibraryLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={props.forceInventoryMode}
                />
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
                card={props.card}
                set={imageSet}
                onClick={props.handleClose}
              />
            </Col>
            <Col className="p-4">
              <div className="pb-1">
                <ResultLibraryLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                  forceInventoryMode={props.forceInventoryMode}
                />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div className="d-flex">
                  <div className="d-flex pe-1">
                    <ButtonCardCopyUrl id={props.card.Id} />
                  </div>
                  <div className="d-flex pe-1">
                    <ButtonToggleShowImage />
                  </div>
                </div>
                <Button variant="primary" onClick={props.handleClose}>
                  <div>
                    <X width="24" height="24" viewBox="0 0 16 16" /> Close
                  </div>
                </Button>
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
}

export default ResultLibraryModal;
