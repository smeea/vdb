import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import Upload from '@/assets/images/icons/upload.svg?react';
import X from '@/assets/images/icons/x.svg?react';
import { ButtonIconed } from '@/components';
import {
  setAnalyzeDecks,
  setAnalyzeInfo,
  setAnalyzeResults,
  clearAnalyzeForm,
  analyzeStore,
  useApp,
} from '@/context';
import { useDeckImport, useTags } from '@/hooks';

const AnalyzeLoadButton = () => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const info = useSnapshot(analyzeStore).info;
  const [tempDecks, setTempDecks] = useState();
  const [tempArchon, setTempArchon] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const fileInputDecks = useRef();
  const fileInputArchon = useRef();

  const loadPrepared = async (id) => {
    const { default: JSZip } = await import('jszip');
    setIsLoading(true);

    const url = `${import.meta.env.VITE_BASE_URL}/tournaments/${id}.zip`;

    fetch(url)
      .then(function (response) {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(JSZip.loadAsync)
      .then((zip) => {
        Object.values(zip.files).forEach(async (f) => {
          if (f.name.includes('.xlsx')) {
            const archon = await f.async('base64');
            setTempArchon(archon);
          }
        });

        const decks = Object.values(zip.files)
          .filter((f) => !f.name.includes('.xlsx'))
          .map(async (f) => {
            const d = await f.async('string');
            return getDeck(d);
          });

        Promise.all(decks).then((v) => {
          const d = {};
          v.forEach((i) => {
            d[parseInt(i.author)] = i;
          });

          setTempDecks(d);
        });
      });
  };

  const getDeck = async (data) => {
    const deck = await useDeckImport(data, cryptCardBase, libraryCardBase);
    deck.tags = await useTags(deck.crypt, deck.library);
    return deck;
  };

  const loadDecks = async () => {
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

  const loadArchon = async (file) => {
    const { read, utils } = await import('xlsx');
    const wb = read(file);

    const wsInfo = wb.Sheets['Tournament Info'];
    const dataInfo = utils.sheet_to_csv(wsInfo).split('\n');
    const wsScores = wb.Sheets['Methuselahs'];
    const dataScores = utils.sheet_to_csv(wsScores).split('\n');

    let totalPlayers = 0;
    let totalGw = 0;
    let totalVp = 0;
    let medianVp = 0;
    let medianGw = 0;
    let reportedRanks = [];

    dataInfo.forEach((n) => {
      const array = n.split(',');
      if (array[0] === 'Number of Players:') totalPlayers = array[1];
    });

    dataScores.forEach((n) => {
      if (!(n[0] > 0)) return;
      const array = n.split(',');
      const veknId = parseInt(array[4]);
      const rank =
        parseInt(array[20]) !== 2 ? parseInt(array[20]) : parseInt(array[17]);

      const score = {
        gw: parseInt(array[7]),
        vp: parseInt(array[8]),
        rank: rank,
        players: totalPlayers,
      };

      if (tempDecks[veknId]) {
        reportedRanks.push(score.rank);
        tempDecks[veknId].score = score;
      }

      if (score.rank > Math.ceil(totalPlayers / 2)) {
        if (medianVp < score.vp) medianVp = score.vp;
        if (medianGw < score.gw) medianGw = score.gw;
      }
      totalGw += score.gw;
      totalVp += score.vp;
    });

    let medianReportedRank;
    reportedRanks.sort((a, b) => a > b);
    if (reportedRanks.length % 2) {
      medianReportedRank = reportedRanks[(reportedRanks.length - 1) / 2];
    } else {
      const min = reportedRanks[reportedRanks.length / 2 + 1];
      const max = reportedRanks[reportedRanks.length / 2 - 1];
      medianReportedRank = (min + max) / 2;
    }

    const info = {
      name: dataInfo[2].split(',')[1],
      date: dataInfo[3].split(',')[1],
      location: dataInfo[6].split(',')[1],
      players: totalPlayers,
      totalGw: totalGw,
      totalVp: totalVp,
      medianGw: medianGw,
      medianVp: medianVp,
      medianRank: totalPlayers / 2,
      medianReportedRank: medianReportedRank,
    };

    setIsLoading(false);
    setAnalyzeInfo(info);
    setAnalyzeDecks(tempDecks);
  };

  const handleLoadArchon = () => {
    const file = fileInputArchon.current.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setTempArchon(reader.result);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    clearAnalyzeForm();
    setTempArchon();
    setTempDecks();
    setAnalyzeInfo();
    setAnalyzeDecks();
    setAnalyzeResults();
    navigate('/tournament_analyze');
  };

  useEffect(() => {
    if (tempDecks && tempArchon) {
      loadArchon(tempArchon);
    }
  }, [tempDecks, tempArchon]);

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
                  onClick={() => loadPrepared(11023)}
                  title="Finnish Nationals 2023"
                  icon={<StarFill />}
                  text="Finnish Nationals 2023 [2023-11-04]"
                />
                <ButtonIconed
                  className="w-full"
                  variant="primary"
                  onClick={() => loadPrepared(10367)}
                  title="Finnish Nationals 2022"
                  icon={<StarFill />}
                  text="Finnish Nationals 2022 [2022-11-05]"
                />
                <ButtonIconed
                  className="w-full"
                  variant="primary"
                  onClick={() => fileInputDecks.current.click()}
                  title="Import Decks"
                  icon={<Upload />}
                  text="Import Decks (.txt)"
                />
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
        <ButtonIconed
          variant="primary"
          onClick={handleClear}
          title="Clear Data"
          icon={<X />}
          text="Clear"
        />
        <input
          multiple
          ref={fileInputDecks}
          accept=".txt"
          type="file"
          onChange={() => loadDecks()}
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

export default AnalyzeLoadButton;
