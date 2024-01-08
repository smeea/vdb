import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import {
  AnalyzeLoadButtons,
  AnalyzeTournamentInfo,
  AnalyzeTournamentCharts,
  AnalyzeTournamentResult,
  AnalyzeSearchForm,
  ErrorMessage,
  Header,
  FlexGapped,
} from '@/components';
import {
  analyzeStore,
  setAnalyzeDecks,
  setAnalyzeInfo,
  useApp,
} from '@/context';
import { useDeckImport, useTags } from '@/hooks';

const TournamentAnalyze = () => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const decks = useSnapshot(analyzeStore).all;
  const results = useSnapshot(analyzeStore).results;
  const info = useSnapshot(analyzeStore).info;
  const params = useParams();

  const [tempDecks, setTempDecks] = useState();
  const [tempArchon, setTempArchon] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);

  const getDeck = async (data) => {
    const deck = await useDeckImport(data, cryptCardBase, libraryCardBase);
    deck.tags = await useTags(deck.crypt, deck.library);
    return deck;
  };

  const loadPrepared = async (id) => {
    const { default: JSZip } = await import('jszip');
    setIsLoading(true);
    setError(false);

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
      })
      .catch(() => {
        setIsLoading(false);
        setError(id);
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
      if (array[0] === 'Number of Players:') totalPlayers = array[1];
      if (array[0] === 'Number of Rounds (including final):')
        totalRounds = array[1];
      if (array[0] === 'Number of Event Matches:') totalMatches = array[1];
      if (array[0] === 'Event Name:') event = array[1];
      if (array[0] === 'Event Date (DD-MON-YY):') date = array[1];
      if (array[0] === 'City:') location = array[1];
    });

    dataScores.forEach((n) => {
      const array = n.split(',');
      const veknId = parseInt(array[4]);
      if (!veknId) return;

      const rank =
        parseInt(array[20]) !== 2 ? parseInt(array[20]) : parseInt(array[17]);
      const name = `${array[1]} ${array[2]}`;

      const score = {
        name: name,
        rank: rank,
        gw: parseInt(array[7]),
        vp: parseInt(array[8]),
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
      event: event,
      date: date,
      location: location,
      players: totalPlayers,
      matches: totalMatches,
      rounds: totalRounds,
      totalGw: totalGw,
      totalVp: totalVp,
      avgMatchGw: Math.round((totalGw / totalMatches) * 10) / 10,
      avgMatchVp: Math.round((totalVp / totalMatches) * 10) / 10,
      medianPlayerGw: medianGw,
      medianPlayerVp: medianVp,
      medianRank: totalPlayers / 2,
      medianReportedRank: medianReportedRank,
    };

    setIsLoading(false);
    setAnalyzeInfo(info);
    setAnalyzeDecks(tempDecks);
  };

  useEffect(() => {
    if (tempDecks && tempArchon) {
      loadArchon(tempArchon);
    }
  }, [tempDecks, tempArchon]);

  useEffect(() => {
    if (
      params.tournamentid &&
      !(decks || info) &&
      cryptCardBase &&
      libraryCardBase
    ) {
      loadPrepared(params.tournamentid);
    }
  }, [params.tournamentid, cryptCardBase, libraryCardBase]);

  return (
    <div className="twd-container mx-auto space-y-2">
      <Header>
        <div className="basis-full p-2 text-lg">
          <div className="flex justify-center">
            Want more Tournaments here? Help your organizer to collect the data!
          </div>
          <div className="flex justify-center gap-1.5">
            More details:
            <a
              target="_blank"
              rel="noreferrer"
              className="underline"
              href="https://static.krcg.org/data/tournament/index.html"
            >
              EXTENDED TOURNAMENTS DECKS ARCHIVE
            </a>
          </div>
        </div>
      </Header>
      <FlexGapped className="flex-col">
        <FlexGapped>
          <div className="flex basis-9/12">
            <div className="basis-full">
              {error && (
                <ErrorMessage>
                  NO DATA AVAILABLE FOR EVENT #{error}
                </ErrorMessage>
              )}
            </div>
            {decks && info && (
              <AnalyzeTournamentCharts
                info={info}
                decks={decks}
                searchResults={results ?? {}}
              />
            )}
          </div>
          <FlexGapped className="basis-3/12 flex-col">
            <AnalyzeLoadButtons
              tempDecks={tempDecks}
              setTempDecks={setTempDecks}
              setTempArchon={setTempArchon}
              isLoading={isLoading}
              getDeck={getDeck}
              setError={setError}
            />
            {decks && info && (
              <AnalyzeTournamentInfo info={info} decks={decks} />
            )}
          </FlexGapped>
        </FlexGapped>
        {decks && info && (
          <FlexGapped>
            <div className="flex flex-col gap-4 sm:basis-7/12 sm:p-0 lg:basis-8/12 xl:basis-9/12">
              <AnalyzeTournamentResult
                decks={results ?? Object.values(decks)}
              />
            </div>
            <div className="basis-full p-2 sm:basis-5/12 sm:p-0 lg:basis-4/12 xl:basis-3/12">
              <AnalyzeSearchForm />
            </div>
          </FlexGapped>
        )}
      </FlexGapped>
    </div>
  );
};

export default TournamentAnalyze;
