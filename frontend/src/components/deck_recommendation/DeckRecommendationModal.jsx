import React from 'react';
import {
  Spinner,
  ResultCryptTable,
  DeckRecommendationLibrary,
  Modal,
  Header,
} from '@/components';

const DeckRecommendationModal = ({ handleClose, crypt, library }) => {
  return (
    <Modal handleClose={handleClose} size="lg" title="Card Ideas">
      <div className="flex gap-3 max-sm:flex-col sm:gap-5">
        <div className="basis-full sm:basis-7/12">
          <Header>
            <div className="px-2 font-bold">Crypt</div>
          </Header>
          {crypt ? (
            <ResultCryptTable resultCards={crypt} inRecommendation />
          ) : (
            <div className="flex justify-center pt-5">
              <Spinner className="size-7" />
            </div>
          )}
        </div>
        <div className="basis-full sm:basis-5/12 space-y-2">
          <Header>
            <div className="px-2 font-bold">Library</div>
          </Header>
          {library ? (
            <DeckRecommendationLibrary cards={library} />
          ) : (
            <div className="flex justify-center pt-5">
              <Spinner className="size-7" />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeckRecommendationModal;
