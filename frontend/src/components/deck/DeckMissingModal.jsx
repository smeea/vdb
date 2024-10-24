import React, { useState } from 'react';
import Gem from '@/assets/images/icons/gem.svg?react';
import {
  FlexGapped,
  DeckCrypt,
  DeckLibrary,
  DeckExportButton,
  ButtonIconed,
  Modal,
} from '@/components';
import { useApp } from '@/context';

const DeckMissingModal = ({ deck, missAllVtes, handleClose, inInventory }) => {
  const { isMobile } = useApp();
  const [showMissAll, setShowMissAll] = useState();

  return (
    <Modal handleClose={handleClose} size="lg" title={deck.name} noPadding={isMobile}>
      <FlexGapped className="flex-col">
        <FlexGapped className="max-sm:flex-col">
          <div className="basis-full md:basis-5/9">
            <div
              className={
                isMobile || inInventory
                  ? null
                  : 'top-[22px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
              }
            >
              <DeckCrypt
                deck={{
                  crypt: showMissAll ? missAllVtes.crypt : deck.crypt,
                }}
                inMissing
              />
            </div>
          </div>
          <div className="basis-full md:basis-4/9">
            <DeckLibrary
              deck={{
                library: showMissAll ? missAllVtes.library : deck.library,
              }}
              inMissing
            />
          </div>
        </FlexGapped>
        <div className="flex justify-end gap-2 max-sm:flex-col max-sm:p-2 max-sm:pt-0">
          {inInventory && (
            <ButtonIconed
              variant="primary"
              onClick={() => setShowMissAll(!showMissAll)}
              text={
                showMissAll
                  ? 'Show Missing In Inventory'
                  : 'Show Missing for Complete Collection (SLOW!)'
              }
              icon={<Gem />}
            />
          )}
          <DeckExportButton
            deck={{
              name: deck.name,
              crypt: showMissAll ? missAllVtes.crypt : deck.crypt,
              library: showMissAll ? missAllVtes.library : deck.library,
            }}
            inMissing
          />
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default DeckMissingModal;
