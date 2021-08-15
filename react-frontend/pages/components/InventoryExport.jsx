import React, { useState, useRef, useContext } from 'react';
import FileSaver from 'file-saver';
import { Spinner, Dropdown } from 'react-bootstrap';
import Download from '../../assets/images/icons/download.svg';
import ErrorOverlay from './ErrorOverlay.jsx';
import AppContext from '../../context/AppContext';

function InventoryExport(props) {
  const { publicName, isMobile } = useContext(AppContext);

  const [spinnerState, setSpinnerState] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const ExportButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={() => saveDeck('text')}>
        Save as file - Text
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('lackey')}>
        Save as file - Lackey
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('csv')}>
        Save as file - CSV (MS Excel)
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="" onClick={() => copyDeck('text')}>
        Copy to Clipboard - Text
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => copyDeck('lackey')}>
        Copy to Clipboard - Lackey
      </Dropdown.Item>
    </>
  );

  const copyDeck = (format) => {
    setError(false);
    setSpinnerState(true);

    const url = `${process.env.API_URL}inventory/export`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        format: format,
      }),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        navigator.clipboard.writeText(data.deck);
        isMobile && props.setShowButtons(false);
        setSpinnerState(false);
      })
      .catch((error) => {
        setError(true);
        setSpinnerState(false);
      });
  };

  const saveDeck = (format) => {
    setError(false);
    setSpinnerState(true);

    const url = `${process.env.API_URL}inventory/export`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        format: format,
      }),
    };

    const fetchPromise = fetch(url, options);

    if (format === 'csv') {
      fetchPromise
        .then((response) => response.text())
        .then((data) => {
          const file = 'data:text/csv;base64,' + data;
          saveAs(file, `Inventory - ${publicName}.csv`);
          setSpinnerState(false);
          isMobile && props.setShowButtons(false);
        })
        .catch((error) => {
          setSpinnerState(false);
          setError(true);
        });
    } else {
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          const file = new File(
            [data.deck],
            data.name + '_' + data.format + '.txt',
            { type: 'text/plain;charset=utf-8' }
          );
          FileSaver.saveAs(file);
          setSpinnerState(false);
          isMobile && props.setShowButtons(false);
        })
        .catch((error) => {
          setError(true);
          setSpinnerState(false);
        });
    }
  };

  return (
    <>
      <Dropdown ref={ref}>
        <Dropdown.Toggle className="btn-block" variant="outline-secondary">
          <Download />
          <span className="pl-1">Save Inventory</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {spinnerState && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {ExportButtonOptions}
        </Dropdown.Menu>
      </Dropdown>
      <ErrorOverlay show={error} target={ref.current} placement="left">
        ERROR
      </ErrorOverlay>
    </>
  );
}

export default InventoryExport;
