import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg';
import ResultCryptLayoutText from './ResultCryptLayoutText.jsx';
import ButtonCardCopyUrl from './ButtonCardCopyUrl.jsx';
import ButtonToggleShowImage from './ButtonToggleShowImage.jsx';

function ResultCryptModal(props) {
  const [imageSet, setImageSet] = useState(null);

  const CardImage = () => {
    const imgSrc = `${process.env.ROOT_URL}images/cards/${
      imageSet ? 'set/' + imageSet + '/' : ''
    }${props.card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${props.card['Adv'] && 'adv'}.jpg`;

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
      dialogClassName="no-border"
    >
      <Modal.Body className="p-0">
        {props.isMobile ? (
          <>
            {props.showImage ? (
              <CardImage />
            ) : (
              <div className="p-3">
                <ResultCryptLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                />
                {props.inventoryMode && (
                  <>
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
                      {props.inventoryState.usedDescription.soft && (
                        <>{props.inventoryState.usedDescription.soft}</>
                      )}
                      {props.inventoryState.usedDescription.hard && (
                        <>{props.inventoryState.usedDescription.hard}</>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            <div
              onClick={props.handleClose}
              className="float-right-bottom clear"
            >
              <div className="pt-1 float-clear">
                <X viewBox="0 0 16 16" />
              </div>
            </div>
            <div
              onClick={() => props.setShowImage(!props.showImage)}
              className="float-right-middle add-on"
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
                <ResultCryptLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
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
              <div className="d-flex justify-content-between bp-125 pt-4">
                <div className="d-flex">
                  <div className="d-flex pr-1">
                    <ButtonCardCopyUrl
                      isMobile={props.isMobile}
                      id={props.card.Id}
                    />
                  </div>
                  <div className="d-flex pr-1">
                    <ButtonToggleShowImage
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                    />
                  </div>
                </div>
                <Button variant="outline-secondary" onClick={props.handleClose}>
                  <div>
                    <X width="24" height="24" viewBox="0 0 16 16" /> Close
                  </div>
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ResultCryptModal;
