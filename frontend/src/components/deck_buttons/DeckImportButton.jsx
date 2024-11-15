import React from 'react';
import { Menu } from '@headlessui/react';
import ClipboardPlus from '@/assets/images/icons/clipboard-plus.svg?react';
import { MenuItems, MenuItem, MenuItemDivider, MenuButton } from '@/components';
import { useApp } from '@/context';

const DeckImportButton = ({
  handleCreate,
  handleFileInputClick,
  handleOpenTextModal,
  handleOpenAmaranthModal,
  variant,
}) => {
  const { username, isDesktop } = useApp();

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="Create or Import Deck"
        icon={<ClipboardPlus size={24} />}
        variant={variant ? variant : isDesktop ? 'secondary' : 'primary'}
        text="New / Import"
      />
      <MenuItems>
        {username && (
          <>
            <MenuItem onClick={handleCreate}>Create New Deck</MenuItem>
            <MenuItemDivider />
            <MenuItem onClick={() => handleFileInputClick(false)}>Import from File</MenuItem>
            <MenuItem onClick={() => handleOpenTextModal(false)}>Import from Text</MenuItem>
            <MenuItem onClick={handleOpenAmaranthModal}>Import from Amaranth</MenuItem>
            <MenuItemDivider />
          </>
        )}
        <div className="flex px-3 py-1 text-sm text-midGray dark:text-midGrayDark">
          Anonymous (non-editable), useful only to share URL:
        </div>
        <MenuItem onClick={() => handleFileInputClick(true)}>Import w/o Acc. from File</MenuItem>
        <MenuItem onClick={() => handleOpenTextModal(true)}>Import w/o Acc. from Text</MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DeckImportButton;
