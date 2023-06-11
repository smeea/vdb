import React, { useRef } from 'react';
import { read, utils } from 'xlsx';
import Upload from '@/assets/images/icons/upload.svg';
import CheckCircleFill from '@/assets/images/icons/check-circle-fill.svg';
import X from '@/assets/images/icons/x.svg';
import { ButtonIconed } from '@/components';
import { useApp } from '@/context';
import { useTags } from '@/hooks';
import { useDeckImport } from '@/hooks';

const Ok = () => {
  return (
    <div className="flex px-2 items-center text-bgGreen dark:text-bgGreenDark">
      <CheckCircleFill width="24" height="24" />
    </div>
  );
};

const AnalyzeLoadButton = ({
  setDecks,
  setInfo,
  isDecks,
  isInfo,
  // setScores,
}) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const fileInputDecks = useRef();
  const fileInputArchon = useRef();

  const loadDecks = () => {
    let decks = {};

    const files = fileInputDecks.current.files;
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        const data = reader.result;
        const d = await useDeckImport(data, cryptCardBase, libraryCardBase);
        d.tags = await useTags(d.crypt, d.library);
        decks[d.author] = d;
      };
    });

    setDecks(decks);
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
    // setScores();
    setInfo();
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
