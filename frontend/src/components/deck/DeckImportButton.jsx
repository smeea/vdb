import React from 'react';
import { Menu } from '@headlessui/react';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
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
      <Menu.Button>
        {/* /\* variant="secondary" *\/ */}
        <div className="flex items-center justify-center">
          <div className="pe-2 flex">
            <ClipboardPlus size={24} />
          </div>
          New / Import
        </div>
      </Menu.Button>
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
        {/* <Dropdown.Header className="pb-1"> */}
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
