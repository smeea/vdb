import React from 'react';
import { Menu } from '@headlessui/react';
import ClipboardPlus from '@/assets/images/icons/clipboard-plus.svg';
import { MenuItems, MenuItem, MenuItemDivider, MenuButton } from '@/components';
import { useApp } from '@/context';

const DeckImportButton = ({
  handleCreate,
  handleFileInputClick,
  handleOpenTextModal,
  handleOpenAmaranthModal,
}) => {
  const { username } = useApp();

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="Create or Import Deck"
        icon={<ClipboardPlus size={24} />}
        variant="secondary"
        text="New / Import"
      />
      <MenuItems>
        {username && (
          <>
            <MenuItem>
              <div onClick={handleCreate}>Create New Deck</div>
            </MenuItem>
            <MenuItemDivider />
            <MenuItem>
              <div onClick={() => handleFileInputClick(false)}>
                Import from File
              </div>
            </MenuItem>
            <MenuItem>
              <div onClick={() => handleOpenTextModal(false)}>
                Import from Text
              </div>
            </MenuItem>
            <MenuItem>
              <div onClick={handleOpenAmaranthModal}>Import from Amaranth</div>
            </MenuItem>
            <MenuItemDivider />
          </>
        )}
        <div className="flex px-3 py-1 text-sm text-midGray dark:text-midGrayDark">
          Anonymous (non-editable), useful only to share URL:
        </div>
        <MenuItem>
          <div onClick={() => handleFileInputClick(true)}>
            Import w/o Acc. from File
          </div>
        </MenuItem>
        <MenuItem>
          <div onClick={() => handleOpenTextModal(true)}>
            Import w/o Acc. from Text
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DeckImportButton;
