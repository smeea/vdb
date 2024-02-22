import React from 'react';
import {
  FlexGapped,
  Spinner,
  ResultCryptTable,
  DeckRecommendationLibrary,
  Modal,
  Header,
} from '@/components';

const DeckRecommendationModal = ({ handleClose, crypt, library }) => {
  return (
    <Modal handleClose={handleClose} size="lg" title="Card Ideas">
      <FlexGapped className="sm:flex-col">
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
      </FlexGapped>
    </Modal>
  );
};

export default DeckRecommendationModal;
