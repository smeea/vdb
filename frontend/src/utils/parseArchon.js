import { DATE, DQ, EVENT, GW, LOCATION, NAME, PLAYERS, RANK, ROUNDS, SCORE, VP } from "@/constants";
import { sanitizeScoreSheet } from "@/utils";

const parseArchon = async (file, decks) => {
  const { read, utils } = await import("xlsx");
  const wb = read(file);

  const getFinalPlace = (playerNumber) => {
    const wsFinalTable = wb.Sheets["Final Round"];
    const dataFinalTable = utils.sheet_to_csv(wsFinalTable).split("\n");
    const finalPlace = dataFinalTable
      .filter((i) => {
        const array = i.split(",");
        return Number.parseInt(array[0]) === playerNumber && array[21];
      })[0]
      .split(",")[21];
    return Number.parseInt(finalPlace);
  };

  const wsInfo = wb.Sheets["Tournament Info"];
  const dataInfo = utils.sheet_to_csv(wsInfo).split("\n");
  let totalPlayers = 0;
  let totalRounds = 0;
  let totalMatches = 0;
  let totalGw = 0;
  let totalVp = 0;
  let medianVp = 0;
  let medianGw = 0;
  const reportedRanks = [];
  let event;
  let date;
  let location;

  dataInfo.forEach((n) => {
    const array = n.split(",");
    if (array[0] === "Number of Players:") totalPlayers = Number.parseInt(array[1]);
    if (array[0] === "Number of Rounds (including final):") totalRounds = array[1];
    if (array[0] === "Number of Event Matches:") totalMatches = array[1];
    if (array[0] === "Event Name:") event = array[1];
    if (array[0] === "Event Date (DD-MON-YY):") date = array[1];
    if (array[0] === "City:") location = array[1];
  });

  const wsScores = sanitizeScoreSheet(wb.Sheets.Methuselahs);
  const dataScores = utils.sheet_to_csv(wsScores).split("\n");

  const archonIds = [];
  const tdaDecks = {};

  dataScores.forEach((n, idx) => {
    if (idx < 6) return;
    const array = n.split(",");
    const playerId = array[4];
    const playerNumber = Number.parseInt(array[0]);
    if (!playerId) return;
    archonIds.push(playerId);

    const rank =
      array[20] === DQ
        ? DQ
        : Number.parseInt(array[20]) > 5
          ? Number.parseInt(array[20])
          : wb.Sheets["Final Round"]
            ? getFinalPlace(playerNumber)
            : Number.parseInt(array[17]);

    const name = `${array[1]} ${array[2]}`;

    const score = {
      [NAME]: name,
      [RANK]: rank,
      [GW]: Number(array[7]),
      [VP]: Number(array[8]),
      [PLAYERS]: totalPlayers,
    };

    if (decks[playerId]) {
      reportedRanks.push(score[RANK] === DQ ? totalPlayers : score[RANK]);
      tdaDecks[playerId] = {
        ...decks[playerId],
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

  const info = {
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
  };

  return { info, tdaDecks };
};

export default parseArchon;
