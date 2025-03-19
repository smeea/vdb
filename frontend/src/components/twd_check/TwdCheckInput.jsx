import { useRef, useState } from 'react';
import Download from '@icons/download.svg?react';
import Upload from '@icons/upload.svg?react';
import X from '@icons/x.svg?react';
import { ButtonIconed, ErrorOverlay, Textarea } from '@/components';
import { CRYPT, DATE, DECK, EVENT, FORMAT, ID, LIBRARY, LOCATION, PLAYERS } from '@/constants';
import { useApp } from '@/context';
import { importDeck } from '@/utils';

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

    const d = await importDeck(text, cryptCardBase, libraryCardBase);
    setDeckData({
      [ID]: id,
      [EVENT]: lines[0],
      [LOCATION]: lines[1],
      [DATE]: lines[2],
      [FORMAT]: lines[3],
      [PLAYERS]: lines[4],
      [URL]: url ? url[0] : null,
      [DECK]: {
        [CRYPT]: d[CRYPT],
        [LIBRARY]: d[LIBRARY],
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
        <div className="basis-2/12 pt-[5px]">
          <div className="flex justify-end">
            <pre className="font-mono text-sm">{fieldNames}</pre>
          </div>
          <div className="flex justify-end">
            <pre className="text-midGray dark:text-midGrayDark font-mono text-sm">
              {descriptionInfo}
            </pre>
          </div>
        </div>
        <div className="basis-full">
          <Textarea
            className="font-mono text-sm"
            rows={(window.innerHeight - 215) / 20}
            value={deckText}
            placeholder={placeholder}
            onChange={handleChange}
            autoFocus
          />
          <pre className="text-midGray dark:text-midGrayDark mb-0 ml-1 font-mono text-sm">
            {lengthMarker}
          </pre>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <ButtonIconed
            onClick={() => saveDeck(deckText, deckData[ID])}
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
