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
        dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
        title="Card Ideas"
      >
        <div>
          <div className="pb-md-4 flex flex-row px-0">
            <div className="pl-lg-4 pr-lg-3 basis-full px-0 md:basis-7/12">
              <div className="info-message flex h-10 items-center justify-between px-2">
                <b>CRYPT</b>
              </div>
              {crypt ? (
                <ResultCryptTable
                  resultCards={crypt}
                  className="search-crypt-table"
                  inRecommendation
                />
              ) : (
                <div className="pb-md-0 flex justify-center py-4">
                  {' '}
                  <Spinner animation="border" />
                </div>
              )}
            </div>
            <div className="pl-lg-3 pr-lg-4 pt-md-0 basis-full px-0 pt-4 md:basis-5/12">
              <div className="info-message flex h-10 items-center justify-between px-2">
                <b>LIBRARY</b>
              </div>
              {library ? (
                <DeckRecommendationLibrary cards={library} />
              ) : (
                <div className="pb-md-0 flex justify-center py-4">
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
