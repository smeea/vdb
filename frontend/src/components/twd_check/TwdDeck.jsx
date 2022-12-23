import React, { useState, useRef } from 'react';
import X from 'assets/images/icons/x.svg';
import Download from 'assets/images/icons/download.svg';
import Upload from 'assets/images/icons/upload.svg';
import { Button, ButtonIconed, ErrorOverlay } from 'components';

const TwdDeck = ({ eventId, setEventId }) => {
  const [deckText, setDeckText] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileInput = useRef();
  const refText = useRef();

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
      <div className="flex justify-center">
        <div className="text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
          TWD
        </div>
      </div>
      <div className="flex flex-row">
        <div className="xl:basis-1/6">
          <div className="flex justify-end">
            <pre className="font-mono text-sm">{fieldNames}</pre>
          </div>
          <div className="flex justify-end">
            <pre className="gray font-mono text-sm">{descriptionInfo}</pre>
          </div>
        </div>
        <div className="xl:basis-10/12">
          <textarea
            className="focus:text-red-500 font-mono text-sm"
            rows={window.innerHeight / 21 - 14}
            value={deckText}
            placeholder={placeholder}
            onChange={handleChange}
            ref={refText}
            autoFocus
          />
          <pre className="text-neutral-500 mb-0 ml-[13px] font-mono text-sm">
            {lengthMarker}
          </pre>
        </div>
      </div>
      <div className="flex justify-end ">
        <div className="flex flex-row space-x-2">
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
        </div>
      </div>
      {emptyError && <ErrorOverlay placement="bottom">NO DECK</ErrorOverlay>}
      {importError && (
        <ErrorOverlay placement="bottom">ERROR DURING IMPORT</ErrorOverlay>
      )}
      <input
        ref={fileInput}
        accept=".txt, .dek"
        type="file"
        onChange={() => loadDeck(fileInput)}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default TwdDeck;
