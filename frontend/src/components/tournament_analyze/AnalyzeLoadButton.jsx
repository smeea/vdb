import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';
import Upload from '@/assets/images/icons/upload.svg';
import CheckCircleFill from '@/assets/images/icons/check-circle-fill.svg';
import X from '@/assets/images/icons/x.svg';
import { ButtonIconed } from '@/components';
import { setAnalyzeResults, useApp } from '@/context';
import { useDeckImport, useTags } from '@/hooks';

const Ok = () => {
  return (
    <div className="flex px-2 items-center text-bgGreen dark:text-bgGreenDark">
      <CheckCircleFill width="24" height="24" />
    </div>
  );
};

const AnalyzeLoadButton = ({ setDecks, setInfo, isDecks, isInfo }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const navigate = useNavigate();
  const fileInputDecks = useRef();
  const fileInputArchon = useRef();

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
        d[i.author] = i;
      });
      setDecks(d);
      setAnalyzeResults(decks);
      navigate('/tournament_analyze');
    });
  };

  const loadArchon = () => {
    const scores = {};

    const file = fileInputArchon.current.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const wb = read(reader.result);

      const wsInfo = wb.Sheets['Tournament Info'];
      const dataInfo = utils.sheet_to_csv(wsInfo).split('\n');
      const wsScores = wb.Sheets['Methuselahs'];
      const dataScores = utils.sheet_to_csv(wsScores).split('\n');

      let totalGw = 0;
      let totalVp = 0;
      let medianVp = 0;
      let medianGw = 0;
      const totalPlayers = parseInt(dataInfo[9].split(',')[1]);

      dataScores.forEach((n, idx) => {
        if (idx < 6 || n[0] === ',') return;
        const array = n.split(',');
        const veknId = parseInt(array[4]);
        const rank =
          parseInt(array[21]) !== 2 ? parseInt(array[21]) : parseInt(array[18]);

        const results = {
          gw: parseInt(array[7]),
          vp: parseInt(array[8]),
          rank: rank,
        };
        scores[veknId] = results;

        if (results.rank > Math.ceil(totalPlayers / 2)) {
          if (medianVp < results.vp) medianVp = results.vp;
          if (medianGw < results.gw) medianGw = results.gw;
        }
        totalGw += results.gw;
        totalVp += results.vp;
      });

      const info = {
        name: dataInfo[2].split(',')[1],
        date: dataInfo[3].split(',')[1],
        location: dataInfo[6].split(',')[1],
        players: totalPlayers,
        totalGw: totalGw,
        totalVp: totalVp,
        medianGw: medianGw,
        medianVp: medianVp,
        scores: scores,
      };
      setInfo(info);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    setDecks();
    setInfo();
    navigate('/tournament_analyze');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex w-full">
          <ButtonIconed
            className="w-full"
            variant="primary"
            onClick={() => fileInputDecks.current.click()}
            title="Import Decks"
            icon={<Upload />}
            text="Import Decks (.txt)"
          />
          {isDecks && <Ok />}
        </div>
        <div className="flex w-full">
          <ButtonIconed
            className="w-full"
            variant="primary"
            onClick={() => fileInputArchon.current.click()}
            title="Import Archon"
            icon={<Upload />}
            text="Import Archon (.xlsx)"
          />
          {isInfo && <Ok />}
        </div>
        <ButtonIconed
          variant="primary"
          onClick={handleClear}
          title="Clear Data"
          icon={<X />}
          text="Clear"
        />
      </div>
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
        onChange={() => loadArchon()}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default AnalyzeLoadButton;
