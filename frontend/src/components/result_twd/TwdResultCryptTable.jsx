import { ResultModal, TwdResultCryptTableRow, Warning } from '@/components';
import { BANNED, CAPACITY, GROUPS, ID } from '@/constants';
import { useApp } from '@/context';
import { useDeckCrypt, useModalCardController } from '@/hooks';
import { countCards, countTotalCost } from '@/utils';

const TwdResultCryptTable = ({ crypt }) => {
  const { cryptDeckSort, setShowFloatingButtons, isDesktop } = useApp();
  const { cryptGroups, hasBanned, hasWrongGroups, cryptTotal, sortedCards } = useDeckCrypt(
    crypt,
    cryptDeckSort,
  );

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    !isDesktop && setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  };

  const cryptTotalQ = countCards(sortedCards);
  const cryptTotalCap = countTotalCost(sortedCards, CAPACITY);
  const cryptAvg = Math.round((cryptTotalCap / cryptTotalQ) * 10) / 10;

  return (
    <div>
      <div className="text-fgSecondary dark:text-fgPrimaryDark flex h-[30px] items-center justify-between gap-2 px-1 font-bold">
        <div className="flex">
          Crypt [{cryptTotal}] {cryptGroups && <>G{cryptGroups}</>}
        </div>
        <div className="flex gap-2">
          {hasWrongGroups && <Warning type={GROUPS} />}
          {hasBanned && <Warning type={BANNED} />}
        </div>
        <div title="Average capacity">~{cryptAvg}</div>
      </div>
      <table className="border-bgSecondary dark:border-bgSecondaryDark border-x">
        <tbody>
          {sortedCards.map((card) => {
            return (
              <TwdResultCryptTableRow
                key={card.c[ID]}
                handleClick={handleClick}
                card={card}
                shouldShowModal={shouldShowModal}
              />
            );
          })}
        </tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TwdResultCryptTable;
