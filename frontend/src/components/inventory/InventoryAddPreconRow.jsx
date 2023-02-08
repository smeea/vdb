import React, { useState } from 'react';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import {
  DeckPreview,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultPreconClan,
  Tooltip,
} from '@/components';
import { useDeckInInventory } from '@/hooks';
import { useApp } from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const InventoryAddPreconRow = ({ deck, idx }) => {
  const { isDesktop, isMobile } = useApp();
  const [showDeck, setShowDeck] = useState();
  const inInventory = useDeckInInventory(deck);
  const [set, precon] = deck.deckid.split(':');
  const clans = setsAndPrecons[set].precons[precon].clan.split('/');

  return (
    <tr
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {!isMobile && (
        <td className="min-w-[50px] sm:min-w-[70px]">
          <div className="flex justify-center">
            {clans.length > 0 && (
              <>
                {clans.map((clan) => (
                  <ResultPreconClan key={clan} clan={clan} />
                ))}
              </>
            )}
          </div>
        </td>
      )}
      <td className="w-[135px] sm:w-[250px]">
        <div
          className="text-overflow flex justify-between text-fgName dark:text-fgNameDark"
          title={deck.name}
        >
          {deck.name}
        </div>
      </td>
      {isDesktop && (
        <td className="min-w-[40px]">
          <div
            className="flex justify-center"
            onMouseEnter={() => setShowDeck(deck.deckid)}
            onMouseLeave={() => setShowDeck(false)}
          >
            <Tooltip
              show={showDeck === deck.deckid}
              overlay={<DeckPreview deck={deck} setShow={setShowDeck} />}
            >
              <EyeFill />
            </Tooltip>
          </div>
        </td>
      )}
      <td className="w-full text-fgThird dark:text-fgThirdDark">
        {isMobile ? (
          <>
            <div>{setsAndPrecons[set].name}</div>
            <div className="flex justify-end text-sm">
              {setsAndPrecons[set].date.slice(0, 4)}
            </div>
          </>
        ) : (
          <>
            {setsAndPrecons[set].date.slice(0, 4)} – {setsAndPrecons[set].name}
          </>
        )}
      </td>
      <td className="min-w-[110px]">
        <div className="flex justify-end space-x-1">
          <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
          <InventoryDeckDeleteButton deck={deck} inInventory={inInventory} />
        </div>
      </td>
    </tr>
  );
};

export default InventoryAddPreconRow;
