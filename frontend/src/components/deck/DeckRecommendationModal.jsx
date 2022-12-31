import React from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import X from 'assets/images/icons/x.svg';
import {
  ButtonFloat,
  ResultCryptTable,
  DeckRecommendationLibrary,
  Modal,
} from 'components';
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
              <div className="flex h-10 items-center justify-between bg-bgSecondary font-bold dark:bg-bgSecondaryDark">
                CRYPT
              </div>
              {crypt ? (
                <ResultCryptTable
                  resultCards={crypt}
                  className="search-crypt-table"
                  inRecommendation
                />
              ) : (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              )}
            </div>
            <div className="basis-full md:basis-5/12">
              <div className="flex h-10 items-center justify-between bg-bgSecondary font-bold dark:bg-bgSecondaryDark">
                LIBRARY
              </div>
              {library ? (
                <DeckRecommendationLibrary cards={library} />
              ) : (
                <div className="flex justify-center">
                  <Spinner width="35" height="35" viewBox="0 0 16 16" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="bg-[#a06060] opacity-80">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default DeckRecommendationModal;
