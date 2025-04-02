import { DeckRecommendationLibraryTable, ResultLibraryType, ResultModal } from "@/components";
import { GROUPED_TYPE, TYPE } from "@/constants";
import { useModalCardController } from "@/hooks";
import { librarySort } from "@/utils";

const DeckRecommendationLibrary = ({ cards }) => {
  const sortedLibrary = librarySort(cards, GROUPED_TYPE);
  const libraryByType = Object.groupBy(sortedLibrary, (card) => card[TYPE]);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedLibrary);

  return (
    <>
      {Object.keys(libraryByType).map((cardtype) => (
        <div key={cardtype}>
          <div className="flex justify-between">
            <ResultLibraryType cardtype={cardtype} total={0} />
          </div>
          <DeckRecommendationLibraryTable
            handleClick={handleModalCardOpen}
            cards={libraryByType[cardtype]}
          />
        </div>
      ))}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default DeckRecommendationLibrary;
