import React, { useState, useRef } from 'react';
import { Row, Col, FormControl, Stack, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import Download from 'assets/images/icons/download.svg';
import Upload from 'assets/images/icons/upload.svg';
import { ButtonIconed, ErrorOverlay } from 'components';

const TwdDeck = ({ deck, eventId, setEventId }) => {
  const [deckText, setDeckText] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileInput = React.createRef();
  const refText = useRef(null);

  const handleLoad = () => {
    fileInput.current.click();
  };

  const handleChange = (event) => {
    setEmptyError(false);
    setDeckText(event.target.value);
    refreshEventId(event.target.value);
  };

  const handleClear = () => {
    setEmptyError(false);
    setDeckText('');
  };

  const refreshEventId = (text) => {
    const url = text.match(
      /https:\/\/www.vekn.net\/event-calendar\/event\/\d+/g
    );
    if (url) {
      setEventId(
        url[0].replace('https://www.vekn.net/event-calendar/event/', '')
      );
    }
  };

  const checkDeck = () => {
    setImportError(false);

    if (deckText) {
      setEmptyError(false);
    } else {
      setEmptyError(true);
    }
  };

  const saveDeck = async (text, name) => {
    setImportError(false);

    if (text) {
      setEmptyError(false);
      const file = new File([text], `${name}.txt`, {
        type: 'text/plain;charset=utf-8',
      });

      let { saveAs } = await import('file-saver');
      saveAs(file);
    } else {
      setEmptyError(true);
    }
  };

  const loadDeck = (file) => {
    const reader = new FileReader();
    reader.readAsText(file.current.files[0]);
    reader.onload = () => {
      setEmptyError(false);
      const result = reader.result;
      setDeckText(result);
    };
  };

  const placeholder = 'Paste deck here';
  const fieldNames = `         Event:
      Location:
          Date:
        Format:
       Players:
        Winner:
          Link:

        Scores:

     Deck Name:

   Description:
`;

  const descriptionInfo = `   can multiline,
  trim length ≤90
    letters or no
      trim at all
  (one long line)
`;

  const lengthMarker = `${' '.repeat(79)}90 letters |`;

  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>TWD</h5>
      </div>
      <Row>
        <Col xl={2} className="mt-6px px-2">
          <div className="d-flex justify-content-end">
            <pre className="mb-0">{fieldNames}</pre>
          </div>
          <div className="d-flex justify-content-end">
            <pre className="gray">{descriptionInfo}</pre>
          </div>
        </Col>
        <Col xl={10} className="px-0">
          <FormControl
            className="deck-import"
            as="textarea"
            rows={window.innerHeight / 21 - 14}
            value={deckText}
            placeholder={placeholder}
            onChange={handleChange}
            ref={refText}
            autoFocus
          />
          <pre className="pt-1 gray twd-length-marker">{lengthMarker}</pre>
        </Col>
      </Row>
      <div className="d-flex justify-content-end pt-2">
        <Stack direction="horizontal" gap={2}>
          <ButtonIconed
            variant="primary"
            onClick={() => saveDeck(deckText, eventId)}
            title="Save to File"
            icon={<Download />}
            text="Save to File"
          />
          <ButtonIconed
            variant="primary"
            onClick={handleLoad}
            title="Load from File"
            icon={<Upload />}
            text="Load from File"
          />
          <Button variant="primary" onClick={checkDeck}>
            Check Deck
          </Button>
          <ButtonIconed
            variant="primary"
            onClick={handleClear}
            title="Clear Deck Form"
            icon={<X width="20" height="20" viewBox="0 0 16 16" />}
            text="Clear"
          />
        </Stack>
      </div>
      <ErrorOverlay
        show={emptyError}
        target={refText.current}
        placement="bottom"
      >
        NO DECK
      </ErrorOverlay>
      <ErrorOverlay
        show={importError}
        target={refText.current}
        placement="bottom"
      >
        ERROR DURING IMPORT
      </ErrorOverlay>
      <input
        ref={fileInput}
        accept="text/*"
        type="file"
        onChange={() => loadDeck(fileInput)}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default TwdDeck;
