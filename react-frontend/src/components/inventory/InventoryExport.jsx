import React, { useState, useRef } from 'react';
import FileSaver from 'file-saver';
import { Spinner, Dropdown } from 'react-bootstrap';
import Download from 'assets/images/icons/download.svg';
import { BlockButton, ErrorOverlay } from 'components';
import { useApp } from 'context';

function InventoryExport(props) {
  const { isMobile } = useApp();

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
      <Dropdown.Item href="" onClick={() => saveDeck('xlsx')}>
        Save as file - Excel
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={() => saveDeck('csv')}>
        Save as file - CSV
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

    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() < 9 ? 0 : ''}${
      d.getMonth() + 1
    }-${d.getDate() < 10 ? 0 : ''}${d.getDate()}`;

    if (format === 'xlsx' || format === 'csv') {
      fetchPromise
        .then((response) => response.text())
        .then((data) => {
          let mime = 'data:text/csv';
          let extension = 'csv';
          if (format === 'xlsx') {
            mime =
              'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            extension = 'xlsx';
          }
          const file = `${mime};base64,${data}`;
          saveAs(file, `Inventory ${date}.${extension}`);
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
            `Inventory ${date} [${format}].txt`,
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
      <Dropdown>
        <Dropdown.Toggle as={BlockButton} variant="secondary">
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <Download />
            </div>
            Save Inventory
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {spinnerState && <Spinner animation="border" size="sm" />}
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
