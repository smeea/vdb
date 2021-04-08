import React, { useState, useRef } from 'react';
import { Button, Overlay } from 'react-bootstrap';
import Upload from '../../assets/images/icons/upload.svg';
import ClipboardPlus from '../../assets/images/icons/clipboard-plus.svg';

function InventoryImport(props) {
  const [importError, setImportError] = useState(false);
  const ref = useRef(null);

  const fileInput = React.createRef();

  const handleFileChange = () => importDeckFromFile();
  const handleFileInputClick = () => fileInput.current.click();

  const importDeckFromFile = () => {
    setImportError(false);

    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = () => {
      const url = `${process.env.API_URL}inventory/import`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reader.result)
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((cards) => props.inventoryAddToState(cards))
        .catch((error) => setImportError(true));
    };
  };

  return (
    <>
      <input
        ref={fileInput}
        accept="text/*"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        ref={ref}
        onClick={handleFileInputClick}
        variant="outline-secondary"
        block
      >
        <Upload />
        <span className="pl-1">Import from File</span>
      </Button>
      <Overlay
        show={importError}
        target={ref.current}
        placement="left"
        transition={false}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div className="modal-tooltip error-tooltip small" {...props}>
            {importError && <b>CANNOT IMPORT THIS INVENTORY</b>}
          </div>
        )}
      </Overlay>
    </>
  );
}

export default InventoryImport;
