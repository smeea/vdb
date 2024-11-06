import React, { useState, useRef } from 'react';
import X from '@/assets/images/icons/x.svg?react';
import Download from '@/assets/images/icons/download.svg?react';
import Upload from '@/assets/images/icons/upload.svg?react';
import { Textarea, ButtonIconed, ErrorOverlay } from '@/components';
import { useApp } from '@/context';
import { useDeckImport } from '@/hooks';

const TwdCheckInput = ({ deckData, setDeckData }) => {
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
    const url = text.match(/.*vekn.net\/event-calendar\/event\/\d+/g);
    const id = url ? url[0].replace(/.*vekn.net\/event-calendar\/event\/(\d+)/g, '$1') : null;

    const d = await useDeckImport(text, cryptCardBase, libraryCardBase);
    setDeckData({
      id: id,
      event: lines[0],
      location: lines[1],
      date: lines[2],
      format: lines[3],
      players: lines[4],
      url: url ? url[0] : null,
      deck: {
        crypt: d[CRYPT],
        library: d[LIBRARY],
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

  const lengthMarker = `${' '.repeat(79)}90 letters | `;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="pt-[5px] xl:basis-2/12">
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
            className="font-mono text-sm"
            rows={(window.innerHeight - 215) / 20}
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
      <div className="flex justify-end">
        <div className="flex gap-2">
          <ButtonIconed
            onClick={() => saveDeck(deckText, deckData.id)}
            title="Save to File"
            icon={<Download />}
            text="Save to File"
          />
          <ButtonIconed
            onClick={handleLoad}
            title="Load from File"
            icon={<Upload />}
            text="Load from File"
          />
          <ButtonIconed
            onClick={handleClear}
            title="Clear Deck Form"
            icon={<X width="20" height="20" viewBox="0 0 16 16" />}
            text="Clear"
          />
        </div>
      </div>
      {emptyError && <ErrorOverlay placement="bottom">NO DECK</ErrorOverlay>}
      {importError && <ErrorOverlay placement="bottom">ERROR DURING IMPORT</ErrorOverlay>}
      <input
        ref={fileInput}
        accept=".txt, .dek"
        type="file"
        onChange={() => loadDeck(fileInput)}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default TwdCheckInput;
