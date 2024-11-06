import React, { useRef } from 'react';
import Upload from '@/assets/images/icons/upload.svg?react';
import { ButtonIconed } from '@/components';

const AnalyzeLoadCustomButtons = ({
  tempDecks,
  setTempDecks,
  setTempArchon,
  getDeck,
  setError,
}) => {
  const fileInputDecks = useRef();
  const fileInputArchon = useRef();

  const handleLoadArchon = () => {
    const file = fileInputArchon.current.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setTempArchon(reader.result);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleLoadDecks = async () => {
    setError(false);
    const files = fileInputDecks.current.files;

    const decks = Object.keys(files).map(async (i) => {
      const result = await new Promise((resolve) => {
        const file = files[i];
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(getDeck(fileReader.result));
        fileReader.readAsText(file);
      });

      return result;
    });

    Promise.all(decks).then((v) => {
      const d = {};
      v.forEach((i) => {
        d[parseInt(i[AUTHOR])] = i;
      });

      setTempDecks(d);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {tempDecks ? (
        <ButtonIconed
          className="w-full"
          onClick={() => fileInputArchon.current.click()}
          title="Import Archon"
          icon={<Upload />}
          text="Import Archon (.xlsx)"
        />
      ) : (
        <ButtonIconed
          className="w-full"
          onClick={() => fileInputDecks.current.click()}
          title="Import Decks"
          icon={<Upload />}
          text="Import Decks (.txt)"
        />
      )}
      <input
        multiple
        ref={fileInputDecks}
        accept=".txt"
        type="file"
        onChange={() => handleLoadDecks()}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputArchon}
        accept=".xlsx"
        type="file"
        onChange={() => handleLoadArchon()}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AnalyzeLoadCustomButtons;
