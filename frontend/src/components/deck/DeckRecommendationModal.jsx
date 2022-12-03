import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { Button, ResultCryptTable, DeckRecommendationLibrary } from 'components';
import { useApp } from 'context';

const DeckRecommendationModal = ({ show, handleClose, crypt, library }) => {
  const { isNarrow, isMobile } = useApp();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
      >
        <Modal.Header className="no-border pt-2 pt-md-3 pb-0 pb-md-1 ps-2 pe-3 px-md-4">
          <div className="text-lg text-blue font-bold">Card Ideas</div>
          {!isNarrow && (
            <Button variant="outline-secondary" onClick={handleClose}>
              <X width="32" height="32" viewBox="0 0 16 16" />
            </Button>
          )}
        </Modal.Header>
        <Modal.Body className="p-0">
          <div>
            <div className="flex flex-row px-0 pb-md-4">
              <div className="basis-full md:basis-7/12 px-0 ps-lg-4 pe-lg-3">
                <div className="flex justify-between items-center info-message h-10 px-2">
                  <b>CRYPT</b>
                </div>
                {crypt ? (
                  <ResultCryptTable
                    resultCards={crypt}
                    className="search-crypt-table"
                    inRecommendation
                  />
                ) : (
                  <div className="flex justify-center py-4 pb-md-0">
                    {' '}
                    <Spinner animation="border" />
                  </div>
                )}
              </div>
              <div className="basis-full md:basis-5/12 px-0 ps-lg-3 pe-lg-4 pt-4 pt-md-0">
                <div className="flex justify-between items-center info-message h-10 px-2">
                  <b>LIBRARY</b>
                </div>
                {library ? (
                  <DeckRecommendationLibrary cards={library} />
                ) : (
                  <div className="flex justify-center py-4 pb-md-0">
                    {' '}
                    <Spinner animation="border" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DeckRecommendationModal;
