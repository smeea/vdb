import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import Upload from '@/assets/images/icons/upload.svg?react';
import { ButtonIconed, ButtonClose, ButtonFloatClose } from '@/components';
import {
  setAnalyzeDecks,
  setAnalyzeInfo,
  setAnalyzeResults,
  clearAnalyzeForm,
  analyzeStore,
  useApp,
} from '@/context';

const AnalyzeLoadButtons = ({
  tempDecks,
  setTempDecks,
  setTempArchon,
  isLoading,
  setError,
  getDeck,
}) => {
  const { isMobile, username } = useApp();
  const info = useSnapshot(analyzeStore).info;
  const navigate = useNavigate();
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
        d[parseInt(i.author)] = i;
      });

      setTempDecks(d);
    });
  };

  const handlePrepared = (id) => {
    clearAnalyzeForm();
    setTempArchon();
    setTempDecks();
    setAnalyzeInfo();
    setAnalyzeDecks();
    setAnalyzeResults();
    navigate(`/tournament_analyze/${id}`);
  };

  const handleClear = () => {
    clearAnalyzeForm();
    setError(false);
    setTempArchon();
    setTempDecks();
    setAnalyzeInfo();
    setAnalyzeDecks();
    setAnalyzeResults();
    navigate('/tournament_analyze');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {isLoading && 'Loading...'}
        {!(info || isLoading) && (
          <>
            {!tempDecks ? (
              <>
                <ButtonIconed
                  className="w-full"
                  variant="primary"
                  onClick={() => handlePrepared(11192)}
                  title="White Turtle (Vác, Pest, Hungary)"
                  text="White Turtle (Vác, Pest, Hungary) [2024-01-27]"
                />
                <ButtonIconed
                  className="w-full"
                  variant="primary"
                  onClick={() => handlePrepared(11023)}
                  title="Finnish Nationals 2023"
                  icon={<StarFill />}
                  text="Finnish Nationals 2023 [2023-11-04]"
                />
                <ButtonIconed
                  className="w-full"
                  variant="primary"
                  onClick={() => handlePrepared(10367)}
                  title="Finnish Nationals 2022"
                  icon={<StarFill />}
                  text="Finnish Nationals 2022 [2022-11-05]"
                />
                {/* TO TEST FILES BEFORE BUNDLING INTO ARCHIVE */}
                {username == '1' && (
                  <ButtonIconed
                    className="w-full"
                    variant="primary"
                    onClick={() => fileInputDecks.current.click()}
                    title="Import Decks"
                    icon={<Upload />}
                    text="Import Decks (.txt)"
                  />
                )}
              </>
            ) : (
              !info && (
                <ButtonIconed
                  className="w-full"
                  variant="primary"
                  onClick={() => fileInputArchon.current.click()}
                  title="Import Archon"
                  icon={<Upload />}
                  text="Import Archon (.xlsx)"
                />
              )
            )}
          </>
        )}
        {isMobile ? (
          <ButtonFloatClose handleClose={handleClear} />
        ) : (
          <ButtonClose
            handleClick={handleClear}
            title="Clear Data"
            text="Clear"
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
    </>
  );
};

export default AnalyzeLoadButtons;
