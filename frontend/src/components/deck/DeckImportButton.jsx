import React from 'react';
import { Menu } from '@headlessui/react';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import { MenuButton } from 'components';
import { useApp } from 'context';

const DeckImportButton = ({
  handleCreateButton,
  handleFileInputClick,
  handleOpenTextModal,
  handleOpenAmaranthModal,
}) => {
  const { username } = useApp();

  return (
    <Menu>
      <MenuButton
        title="Create or Import Deck"
        icon={<ClipboardPlus size={24} />}
        variant="secondary"
        text="New / Import"
      />
      <Menu.Items>
        {username && (
          <>
            <Menu.Item>
              <div onClick={handleCreateButton}>Create New Deck</div>
            </Menu.Item>
            {/* <Dropdown.Divider /> */}
            <Menu.Item>
              <div onClick={() => handleFileInputClick(false)}>
                Import from File
              </div>
            </Menu.Item>
            <Menu.Item>
              <div onClick={() => handleOpenTextModal(false)}>
                Import from Text
              </div>
            </Menu.Item>
            <Menu.Item>
              <div onClick={handleOpenAmaranthModal}>Import from Amaranth</div>
            </Menu.Item>
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
        <Menu.Item>
          <div onClick={() => handleFileInputClick(true)}>
            Import w/o Acc. from File
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => handleOpenTextModal(true)}>
            Import w/o Acc. from Text
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default DeckImportButton;
