import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import { useApp } from 'context';

const DeckImportButton = ({
  handleCreateButton,
  handleFileInputClick,
  handleOpenTextModal,
  handleOpenAmaranthModal,
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
          <Dropdown.Item onClick={() => handleFileInputClick(false)}>
            Import from File
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleOpenTextModal(false)}>
            Import from Text
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenAmaranthModal}>
            Import from Amaranth URL
          </Dropdown.Item>
          <Dropdown.Divider />
        </>
      )}
      <Dropdown.Header>Without Account (non-editable, for URL)</Dropdown.Header>
      <Dropdown.Item onClick={() => handleFileInputClick(true)}>
        Import w/o Account from File
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleOpenTextModal(true)}>
        Import w/o Account from Text
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
