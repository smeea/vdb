import React from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import X from 'assets/images/icons/x.svg';
import { ResultCryptTable, DeckRecommendationLibrary, Modal } from 'components';
import { useApp } from 'context';

const DeckRecommendationModal = ({ handleClose, crypt, library }) => {
  const { isNarrow, isMobile } = useApp();

  return (
    <>
      <Modal
        handleClose={handleClose}
        dialogClassName={isMobile ? '' : 'modal-wide'}
        title="Card Ideas"
      >
        <div>
          <div className="flex flex-row">
            <div className="basis-full md:basis-7/12">
              <div className="info-message flex h-10 items-center justify-between">
                <b>CRYPT</b>
              </div>
              {crypt ? (
                <ResultCryptTable
                  resultCards={crypt}
                  className="search-crypt-table"
                  inRecommendation
                />
              ) : (
                <div className="flex justify-center">
                  {' '}
                  <Spinner animation="border" />
                </div>
              )}
            </div>
            <div className="basis-full md:basis-5/12">
              <div className="info-message flex h-10 items-center justify-between">
                <b>LIBRARY</b>
              </div>
              {library ? (
                <DeckRecommendationLibrary cards={library} />
              ) : (
                <div className="flex justify-center">
                  {' '}
                  <Spinner animation="border" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="float-right-bottom float-clear flex items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DeckRecommendationModal;
