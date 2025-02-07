import ky from 'ky';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  ButtonClose,
  ErrorMessage,
  FlexGapped,
  Header,
  TdaCharts,
  TdaInfo,
  TdaLoadCustomButtons,
  TdaLoadPreparedButtons,
  TdaResult,
  TdaSearchForm,
} from '@/components';
import {
  AUTHOR,
  CRYPT,
  DATE,
  DECKS,
  EVENT,
  GW,
  INFO,
  LIBRARY,
  LOCATION,
  NAME,
  PLAYERS,
  RANK,
  RESULTS,
  ROUNDS,
  SCORE,
  TAGS,
  VP,
} from '@/constants';
import { clearTdaForm, setTdaDecks, setTdaInfo, setTdaResults, tdaStore, useApp } from '@/context';
import { getTags, importDeck, sanitizeScoreSheet } from '@/utils';

const TESTERS = ['1', 'crauseon'];

const Tda = () => {
  const { username, cryptCardBase, libraryCardBase, isMobile } = useApp();
  const { [DECKS]: decks, [RESULTS]: results, [INFO]: info } = useSnapshot(tdaStore);
  const params = useParams();
  const navigate = useNavigate();

  const [tempDecks, setTempDecks] = useState();
  const [tempArchon, setTempArchon] = useState();
  const [error, setError] = useState(false);

  const getDeck = async (data) => {
    const deck = await importDeck(data, cryptCardBase, libraryCardBase);
    deck[TAGS] = await getTags(deck[CRYPT], deck[LIBRARY]);
    return deck;
  };

  const loadPrepared = async (id) => {
    const { default: JSZip } = await import('jszip');
    setError(false);

    const url = `${import.meta.env.VITE_BASE_URL}/tournaments/${id}.zip`;

    ky.get(url)
      .then((response) => {
        if (response.status === 200 || response.status === 0) {
          return Promise.resolve(response.blob());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(JSZip.loadAsync)
      .then((zip) => {
        Object.values(zip.files).forEach(async (f) => {
          if (f[NAME].includes('.xlsx')) {
            const archon = await f.async('base64');
            setTempArchon(archon);
          }
        });

        const fetchedDecks = Object.values(zip.files)
          .filter((f) => !f[NAME].includes('.xlsx'))
          .map(async (f) => {
            const d = await f.async('string');
            return getDeck(d);
          });

        Promise.all(fetchedDecks).then((v) => {
          const d = {};
          v.forEach((i) => {
            d[i[AUTHOR]] = i;
          });

          setTempDecks(d);
        });
      })
      .catch(() => setError(id));
  };

  const loadArchon = async (file) => {
    const { read, utils } = await import('xlsx');
    const wb = read(file);

    const getFinalPlace = (playerNumber) => {
      const wsFinalTable = wb.Sheets['Final Round'];
      const dataFinalTable = utils.sheet_to_csv(wsFinalTable).split('\n');
      const finalPlace = dataFinalTable
        .filter((i) => {
          const array = i.split(',');
          return parseInt(array[0]) == playerNumber && array[21];
        })[0]
        .split(',')[21];
      return parseInt(finalPlace);
    };

    const wsInfo = wb.Sheets['Tournament Info'];
    const dataInfo = utils.sheet_to_csv(wsInfo).split('\n');
    let totalPlayers = 0;
    let totalRounds = 0;
    let totalMatches = 0;
    let totalGw = 0;
    let totalVp = 0;
    let medianVp = 0;
    let medianGw = 0;
    let reportedRanks = [];
    let event;
    let date;
    let location;

    dataInfo.forEach((n) => {
      const array = n.split(',');
      if (array[0] === 'Number of Players:') totalPlayers = parseInt(array[1]);
      if (array[0] === 'Number of Rounds (including final):') totalRounds = array[1];
      if (array[0] === 'Number of Event Matches:') totalMatches = array[1];
      if (array[0] === 'Event Name:') event = array[1];
      if (array[0] === 'Event Date (DD-MON-YY):') date = array[1];
      if (array[0] === 'City:') location = array[1];
    });

    const wsScores = sanitizeScoreSheet(wb.Sheets['Methuselahs']);
    const dataScores = utils.sheet_to_csv(wsScores).split('\n');

    const archonIds = [];
    const tdaDecks = {};

    dataScores.forEach((n, idx) => {
      if (idx < 6) return;
      const array = n.split(',');
      const playerId = array[4];
      const playerNumber = parseInt(array[0]);
      if (!playerId) return;
      archonIds.push(playerId);

      const rank =
        array[20] == 'DQ'
          ? 'DQ'
          : parseInt(array[20]) > 5
            ? parseInt(array[20])
            : wb.Sheets['Final Round']
              ? getFinalPlace(playerNumber)
              : parseInt(array[17]);

      const name = `${array[1]} ${array[2]}`;

      const score = {
        [NAME]: name,
        [RANK]: rank,
        [GW]: Number(array[7]),
        [VP]: Number(array[8]),
        [PLAYERS]: totalPlayers,
      };

      if (tempDecks[playerId]) {
        reportedRanks.push(score[RANK] == 'DQ' ? totalPlayers : score[RANK]);
        tdaDecks[playerId] = {
          ...tempDecks[playerId],
          [SCORE]: score,
        };
      }

      if (score[RANK] > Math.ceil(totalPlayers / 2)) {
        if (medianVp < score[VP]) medianVp = score[VP];
        if (medianGw < score[GW]) medianGw = score[GW];
      }
      totalGw += score[GW];
      totalVp += score[VP];
    });

    Object.keys(tdaDecks).forEach((deckid) => {
      if (!archonIds.includes(deckid)) console.log(`Deck ${deckid} is not in Archon`);
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

    setTdaInfo({
      [EVENT]: event,
      [DATE]: date,
      [LOCATION]: location,
      [PLAYERS]: totalPlayers,
      [ROUNDS]: totalRounds,
      matches: totalMatches,
      totalGw: totalGw,
      totalVp: totalVp,
      avgMatchGw: Math.round((totalGw / totalMatches) * 10) / 10,
      avgMatchVp: Math.round((totalVp / totalMatches) * 10) / 10,
      medianPlayerGw: medianGw,
      medianPlayerVp: medianVp,
      medianRank: totalPlayers / 2,
      medianReportedRank: medianReportedRank,
    });
    setTdaDecks(tdaDecks);
  };

  const handleClear = () => {
    clearTdaForm();
    setError(false);
    setTempArchon();
    setTempDecks();
    setTdaInfo();
    setTdaDecks();
    setTdaResults();
    navigate('/tda');
  };

  useEffect(() => {
    if (tempDecks && tempArchon) {
      loadArchon(tempArchon);
    }
  }, [tempDecks, tempArchon]);

  useEffect(() => {
    if (params[EVENT] && !(tdaStore[DECKS] || tdaStore[INFO]) && cryptCardBase && libraryCardBase) {
      loadPrepared(params[EVENT]);
    }
  }, [params[EVENT], cryptCardBase, libraryCardBase]);

  return (
    <div className="twd-container mx-auto flex flex-col gap-2">
      <Header>
        <div className="flex w-full flex-col p-2 text-lg max-sm:gap-2">
          <div className="flex sm:justify-center">
            Want more Tournaments here? Help your organizer to collect the data!
          </div>
          <div className="flex gap-1.5 sm:justify-center">
            More details:
            <a
              target="_blank"
              rel="noreferrer"
              className="underline"
              href="https://garourimgazette.wordpress.com/vtes-discussions/vtes-tournament-archive/"
            >
              TOURNAMENTS DECKS ARCHIVE
            </a>
          </div>
        </div>
      </Header>
      {error && <ErrorMessage>NO DATA AVAILABLE FOR EVENT #{error}</ErrorMessage>}
      <FlexGapped className="flex-col">
        {!(info && decks) && (
          <div className="flex min-h-[70vh] flex-col place-items-center justify-center max-sm:px-2">
            <div className="flex flex-col gap-2">
              <TdaLoadPreparedButtons
                setTempDecks={setTempDecks}
                setTempArchon={setTempArchon}
                setError={setError}
              />
              {TESTERS.includes(username) && (
                <TdaLoadCustomButtons
                  tempDecks={tempDecks}
                  setTempDecks={setTempDecks}
                  setTempArchon={setTempArchon}
                  getDeck={getDeck}
                  setError={setError}
                />
              )}
            </div>
          </div>
        )}
        <FlexGapped className="max-sm:flex-col">
          <div className="flex basis-9/12 justify-center max-sm:order-last">
            {decks && info && <TdaCharts info={info} decks={decks} searchResults={results ?? {}} />}
          </div>
          {info && decks && (
            <FlexGapped className="basis-3/12 flex-col max-sm:px-2">
              <ButtonClose handleClick={handleClear} text="Close Event" />
              <TdaInfo info={info} decks={decks} />
            </FlexGapped>
          )}
        </FlexGapped>
        {decks && info && (
          <FlexGapped>
            <div className="flex flex-col gap-4 sm:basis-7/12 lg:basis-8/12 xl:basis-9/12">
              <TdaResult decks={results ?? Object.values(decks)} />
            </div>
            {!(isMobile && decks && info) && (
              <div className="basis-full max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
                <TdaSearchForm />
              </div>
            )}
          </FlexGapped>
        )}
      </FlexGapped>
    </div>
  );
};

export default Tda;
