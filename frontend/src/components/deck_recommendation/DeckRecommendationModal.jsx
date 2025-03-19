import {
  DeckRecommendationLibrary,
  FlexGapped,
  Header,
  Modal,
  ResultCryptTable,
  Spinner,
} from '@/components';
import { useApp } from '@/context';

const DeckRecommendationModal = ({ handleClose, crypt, library }) => {
  const { isMobile } = useApp();

  return (
    <Modal handleClose={handleClose} size="lg" title="Card Ideas" noPadding={isMobile}>
      <FlexGapped className="max-sm:flex-col">
        <div className="flex basis-full flex-col sm:basis-7/12">
          <Header>
            <div className="px-2 font-bold">Crypt</div>
          </Header>
          {crypt ? (
            <ResultCryptTable resultCards={crypt} inRecommendation />
          ) : (
            <div className="flex justify-center pt-5 max-sm:pt-2">
              <Spinner className="size-7" />
            </div>
          )}
        </div>
        <div className="flex basis-full flex-col gap-2 sm:basis-5/12">
          <Header>
            <div className="px-2 font-bold">Library</div>
          </Header>
          {library ? (
            <DeckRecommendationLibrary cards={library} />
          ) : (
            <div className="flex justify-center pt-3 max-sm:pb-2">
              <Spinner className="size-7" />
            </div>
          )}
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default DeckRecommendationModal;
