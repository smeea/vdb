import React from 'react';
import { Menu } from '@headlessui/react';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import { MenuItems, MenuItem, MenuButton } from 'components';
import { useApp } from 'context';

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
            {/* <Dropdown.Divider /> */}
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
            {/* <Dropdown.Divider /> */}
          </>
        )}
        {/* <Dropdown.Header> */}
        {/*   <> */}
        {/*     Anonymous (non-editable) */}
        {/*     <br /> */}
        {/*     Useful only to copy URL */}
        {/*   </> */}
        {/* </Dropdown.Header> */}
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
