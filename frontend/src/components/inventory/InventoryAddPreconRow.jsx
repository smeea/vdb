import React from 'react';
import EyeFill from '@icons/eye-fill.svg?react';
import {
  DeckPreview,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultPreconClan,
  ConditionalTooltip,
  ResultPathImage,
} from '@/components';
import { useDeckInInventory } from '@/hooks';
import { useApp } from '@/context';
import { DECKID, CLAN, NAME, PRECONS, DATE } from '@/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import paths from '@/assets/data/paths.json';

const InventoryAddPreconRow = ({ deck }) => {
  const { isDesktop, isMobile } = useApp();
  const inInventory = useDeckInInventory(deck);
  const [set, precon] = deck[DECKID].split(':');
  const clans = setsAndPrecons[set][PRECONS][precon][CLAN].split('/');

  return (
    <tr className="row-bg border-bgSecondary dark:border-bgSecondaryDark border-y">
      <td className="min-w-[50px] sm:min-w-[70px]">
        <div className="flex justify-center">
          {clans.length > 0 && (
            <>
              {clans.map((clan) => {
                return paths.includes(clan) ? (
                  <ResultPathImage key={clan} value={clan} />
                ) : (
                  <ResultPreconClan key={clan} clan={clan} />
                );
              })}
            </>
          )}
        </div>
      </td>
      <td className="max-sm:w-full">
        <div
          className="text-overflow text-fgName dark:text-fgNameDark flex justify-between sm:whitespace-nowrap"
          title={deck[NAME]}
        >
          {deck[NAME]}
        </div>
      </td>
      {isDesktop && (
        <td className="min-w-[30px] sm:min-w-[45px]">
          <div className="flex justify-center">
            <ConditionalTooltip size="xl" overlay={<DeckPreview deck={deck} />}>
              <EyeFill />
            </ConditionalTooltip>
          </div>
        </td>
      )}
      <td className="text-fgThird dark:text-fgThirdDark w-full">
        {isMobile ? (
          <>
            <div>{setsAndPrecons[set][NAME]}</div>
            <div className="flex justify-end px-1 text-sm">
              {setsAndPrecons[set][DATE].slice(0, 4)}
            </div>
          </>
        ) : (
          <div className="whitespace-nowrap">
            {setsAndPrecons[set][DATE].slice(0, 4)} – {setsAndPrecons[set][NAME]}
          </div>
        )}
      </td>
      <td className="min-w-[110px]">
        <div className="flex justify-end gap-1">
          <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
          <InventoryDeckDeleteButton deck={deck} inInventory={inInventory} />
        </div>
      </td>
    </tr>
  );
};

export default InventoryAddPreconRow;
