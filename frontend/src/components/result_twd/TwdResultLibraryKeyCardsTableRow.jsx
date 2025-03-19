import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  ConditionalTooltip,
  ResultLibraryTableRowReqClanDis,
  ResultLibraryTypeImage,
  ResultName,
  Tr,
  UsedPopover,
} from '@/components';
import { HARD, ID, LIBRARY, TYPE } from '@/constants';
import { inventoryStore, limitedStore, useApp, usedStore } from '@/context';
import { getHardTotal } from '@/utils';

const TwdResultLibraryKeyCardsTableRow = ({ card, handleClick, shouldShowModal }) => {
  const { limitedMode, inventoryMode, isMobile } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inLimited = limitedLibrary[card.c[ID]];
  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);

  return (
    <Tr key={card.c[ID]}>
      <td className="border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark min-w-[28px] border-r sm:min-w-[35px]">
        {inventoryMode ? (
          <ConditionalTooltip overlay={<UsedPopover cardid={card.c[ID]} />} disabled={isMobile}>
            <div
              className={twMerge(
                'flex justify-center text-lg',
                inInventory < card.q
                  ? 'bg-bgError dark:bg-bgErrorDark dark:text-whiteDark text-white'
                  : inInventory - hardUsedTotal < card.q && 'bg-bgWarning dark:bg-bgWarningDark',
              )}
            >
              {card.q}
            </div>
          </ConditionalTooltip>
        ) : (
          <div className="flex justify-center text-lg">{card.q}</div>
        )}
      </td>
      <td className="min-w-[55px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultLibraryTypeImage value={card.c[TYPE]} />
        </div>
      </td>
      <td className="w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile || shouldShowModal}
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} isBanned={limitedMode && !inLimited} />
          </div>
        </ConditionalTooltip>
      </td>
      {!isMobile && (
        <ResultLibraryTableRowReqClanDis card={card.c} handleClick={() => handleClick(card.c)} />
      )}
    </Tr>
  );
};

export default TwdResultLibraryKeyCardsTableRow;
