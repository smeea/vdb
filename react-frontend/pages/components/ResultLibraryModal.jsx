import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ImageAlt from '../../assets/images/icons/image-alt.svg';
import FileTextFill from '../../assets/images/icons/chat-quote-fill.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg';
import ResultLibraryLayoutText from './ResultLibraryLayoutText.jsx';
import CardCopyUrlButton from './CardCopyUrlButton.jsx';

function ResultLibraryModal(props) {
  const CardImage = () => {
    const imgSrc = `${process.env.ROOT_URL}images/cards/${props.card[
      'ASCII Name'
    ]
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;

    return (
      <img
        className="card-popover full-width"
        src={imgSrc}
        alt={props.card['Name']}
        onClick={props.handleClose}
      />
    );
  };

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      centered={true}
    >
      <Modal.Body className="p-0">
        {props.isMobile ? (
          <>
            {props.showImage ? (
              <CardImage />
            ) : (
              <>
                <button
                  type="button"
                  className="close m-2 mt-3"
                  onClick={props.handleClose}
                >
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </button>
                <div className="px-3 pt-3">
                  <ResultLibraryLayoutText
                    card={props.card}
                    handleClose={props.handleClose}
                  />
                </div>
                {props.inventoryMode && (
                  <>
                    <div className="px-3 pt-2">
                      <hr className="mx-0" />
                      <div className="pt-1">
                        <b>Inventory:</b>
                        <div className="d-flex align-items-center">
                          <div className="opacity-035">
                            <CalculatorFill />
                          </div>
                          <div className="px-1">
                            <b>
                              {props.inventoryState.softUsedMax +
                                props.inventoryState.hardUsedTotal}
                            </b>
                          </div>
                          - Total Used
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="opacity-035">
                            <ArchiveFill />
                          </div>
                          <div className="px-1">
                            <b>{props.inventoryState.inInventory}</b>
                          </div>
                          - In Inventory
                        </div>
                        <div className="py-1" />
                        {props.inventoryState.usedDescription.soft && (
                          <>{props.inventoryState.usedDescription.soft}</>
                        )}
                        {props.inventoryState.usedDescription.hard && (
                          <>{props.inventoryState.usedDescription.hard}</>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="p-3">
                  <CardCopyUrlButton id={props.card['Id']} />
                </div>
              </>
            )}
            <div
              onClick={() => props.setShowImage(!props.showImage)}
              className="float-right-bottom add-on"
            >
              <div className="pt-1 float-add">
                <ArrowRepeat viewBox="0 0 16 16" />
              </div>
            </div>
          </>
        ) : (
          <Row>
            <Col lg={5} className="bg-black px-0">
              <CardImage />
            </Col>
            <Col className="py-4 px-4 mr-3">
              <div className="pb-1">
                <ResultLibraryLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                />
              </div>
              {props.inventoryMode && (
                <>
                  <hr className="mx-0" />
                  <div className="pt-1">
                    <b>Inventory:</b>
                    <Row>
                      <Col lg={5}>
                        <div className="d-flex align-items-center">
                          <div className="opacity-035">
                            <CalculatorFill />
                          </div>
                          <div className="px-1">
                            <b>
                              {props.inventoryState.softUsedMax +
                                props.inventoryState.hardUsedTotal}
                            </b>
                          </div>
                          - Total Used
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="opacity-035">
                            <ArchiveFill />
                          </div>
                          <div className="px-1">
                            <b>{props.inventoryState.inInventory}</b>
                          </div>
                          - In Inventory
                        </div>
                      </Col>
                      <Col>
                        {props.inventoryState.usedDescription.soft && (
                          <>{props.inventoryState.usedDescription.soft}</>
                        )}
                        {props.inventoryState.usedDescription.hard && (
                          <>{props.inventoryState.usedDescription.hard}</>
                        )}
                      </Col>
                    </Row>
                  </div>
                </>
              )}
              <div className="bp-125 pt-4">
                <CardCopyUrlButton id={props.card['Id']} />
              </div>
              <Button
                variant="outline-secondary"
                onClick={() => props.setShowImage(!props.showImage)}
                block
              >
                <div className="d-flex align-items-center justify-content-center">
                  {props.showImage ? (
                    <>
                      <div className="pl-2 pr-1">
                        <ImageAlt />
                      </div>
                      Image on hover
                    </>
                  ) : (
                    <>
                      <div className="pr-1">
                        <FileTextFill />
                      </div>
                      Text on hover
                    </>
                  )}
                </div>
              </Button>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ResultLibraryModal;
