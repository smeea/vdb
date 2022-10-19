import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import { useApp } from 'context';

const DeckImportButton = ({
  handleCreateButton,
  handleFileInputClick,
  handleOpenTextModal,
  handleOpenAmaranthModal,
  handleOpenAnonymousTextModal,
}) => {
  const { username } = useApp();

  const ButtonOptions = (
    <>
      {username && (
        <>
          <Dropdown.Item onClick={handleCreateButton}>
            Create New Deck
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => handleFileInputClick('txt')}>
            Import from File - Amaranth, Lackey.TXT, TWD
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFileInputClick('dek')}>
            Import from File - Lackey.DEK
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenTextModal}>
            Import from Text - Amaranth, Lackey.TXT, TWD
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenAmaranthModal}>
            Import from Amaranth Deck URL
          </Dropdown.Item>
          <Dropdown.Divider />
        </>
      )}
      <Dropdown.Header>
        Without Account (you will not be able to edit it, can only copy URL)
      </Dropdown.Header>
      <Dropdown.Item onClick={() => handleFileInputClick('txt', true)}>
        Import w/o Account from File - Amaranth, Lackey.TXT, TWD
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleFileInputClick('dek', true)}>
        Import w/o Account from File - Lackey.DEK
      </Dropdown.Item>
      <Dropdown.Item onClick={handleOpenAnonymousTextModal}>
        Import w/o Account from Text - Amaranth, Lackey.TXT, TWD
      </Dropdown.Item>
    </>
  );

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="secondary"
      title={
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex pe-2">
            <ClipboardPlus size={24} />
          </div>
          New / Import
        </div>
      }
    >
      {ButtonOptions}
    </DropdownButton>
  );
};

export default DeckImportButton;
