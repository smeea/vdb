import React, { useState, useRef } from 'react';
import X from '@/assets/images/icons/x.svg';
import Download from '@/assets/images/icons/download.svg';
import Upload from '@/assets/images/icons/upload.svg';
import { Textarea, ButtonIconed, ErrorOverlay } from '@/components';
import { useApp } from '@/context';
import { useDeckImport } from '@/hooks';

const TwdDeck = ({ deckData, setDeckData }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const [deckText, setDeckText] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileInput = useRef();

  const handleLoad = () => {
    fileInput.current.click();
  };

  const handleChange = (event) => {
    setEmptyError(false);
    setDeckText(event.target.value);
    refreshDeckData(event.target.value);
  };

  const handleClear = () => {
    setEmptyError(false);
    setDeckText('');
    setDeckData();
  };

  const refreshDeckData = async (text) => {
    const lines = text.split('\n');
    const d = await useDeckImport(text, cryptCardBase, libraryCardBase);

    const id = lines[6].replace(
      /.*vekn.net\/event-calendar\/event\/(\d+).*/,
      '$1'
    );

    setDeckData({
      id: id,
      event: lines[0].trim(),
      location: lines[1].trim(),
      date: lines[2].trim(),
      format: lines[3].trim(),
      players: lines[4].trim(),
      url: lines[6].trim(),
      deck: {
        crypt: d.crypt,
        library: d.library,
      },
    });
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

  const descriptionInfo = `       (optional)
   can multiline,
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
        <div className="p-1 xl:basis-1/6">
          <div className="flex justify-end">
            <pre className="font-mono text-sm">{fieldNames}</pre>
          </div>
          <div className="flex justify-end">
            <pre className="font-mono text-sm text-midGray dark:text-midGrayDark">
              {descriptionInfo}
            </pre>
          </div>
        </div>
        <div className="xl:basis-10/12">
          <Textarea
            className="text-sm"
            isMono
            rows={window.innerHeight / 21 - 14}
            value={deckText}
            placeholder={placeholder}
            onChange={handleChange}
            autoFocus
          />
          <pre className="mb-0 ml-1 font-mono text-sm text-midGray dark:text-midGrayDark">
            {lengthMarker}
          </pre>
        </div>
      </div>
      <div className="flex justify-end ">
        <div className="flex flex-row space-x-2">
          <ButtonIconed
            variant="primary"
            onClick={() => saveDeck(deckText, deckData.id)}
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
