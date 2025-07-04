import ky from "ky";
import {
  CARDS,
  ENABLED,
  GENERAL,
  ID,
  NAME,
  PLAYTEST,
  PRECONS,
  SCORE,
  TEXT,
  USERNAME,
  XLSX,
} from "@/constants";

export const submitReport = (id, value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/${isPrecon ? PRECONS : CARDS}/${id}`;
  return ky.put(url, { json: value }).json();
};

export const changePlaytester = (username, field, value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  return ky(url, {
    method: field === ENABLED ? (value ? "POST" : "DELETE") : "PUT",
    json: { [USERNAME]: username, [field]: value },
  }).json();
};

export const getReports = async (value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? PRECONS : CARDS
  }/${value[ID]}`;

  return ky.get(url).json();
};

export const updateProfile = (target, value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/profile`;
  return ky.put(url, { json: { [target]: value } }).json();
};

export const exportXlsx = async (reports, users, cryptCardBase, libraryCardBase, preconDecks) => {
  const xlsx = await import("xlsx");
  const workbook = xlsx.utils.book_new();

  const cardsData = Object.keys(reports)
    .filter((id) => Number.isInteger(id))
    .reduce((obj, key) => {
      obj[key] = reports[key];
      return obj;
    }, {});

  const preconsData = Object.keys(reports)
    .filter((id) => !Number.isInteger(id) && id !== GENERAL)
    .reduce((obj, key) => {
      obj[key] = reports[key];
      return obj;
    }, {});

  const generalData = reports[GENERAL];

  const getSheet = (data) => {
    const reports = Object.entries(data).map((value) => {
      const [username, report] = value;
      const user = users[username];

      return {
        User: username,
        "Is Played": report.isPlayed ? "Y" : "N",
        Score: report[SCORE],
        Report: report[TEXT],
        Games: user.games,
        Liaison: user.liaison,
      };
    });

    return xlsx.utils.json_to_sheet(reports);
  };

  const generalReports = Object.keys(generalData).map((username) => {
    const user = users[username];

    return {
      User: username,
      Report: generalData[username],
      Games: user.games,
      Liaison: user.liaison,
    };
  });
  const generalSheet = xlsx.utils.json_to_sheet(generalReports);
  generalSheet["!cols"] = [{ wch: 15 }, { wch: 60 }, { wch: 8 }, { wch: 15 }];
  xlsx.utils.book_append_sheet(workbook, generalSheet, "General");

  Object.entries(preconsData).forEach((i) => {
    const [id, reportsData] = i;
    if (!preconDecks[`${PLAYTEST}:${id}`]) return;
    const sheet = getSheet(reportsData);
    sheet["!cols"] = [{ wch: 15 }, { wch: 8 }, { wch: 8 }, { wch: 60 }, { wch: 8 }, { wch: 15 }];
    const sheetName = `P ${preconDecks[`${PLAYTEST}:${id}`][NAME].replace(/\W+/g, " ").substring(0, 20)}`;
    xlsx.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  Object.entries(cardsData).forEach((i) => {
    const [cardid, reportsData] = i;
    const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
    if (!cardBase[cardid]) return;
    const sheet = getSheet(reportsData);
    sheet["!cols"] = [{ wch: 15 }, { wch: 8 }, { wch: 8 }, { wch: 60 }, { wch: 8 }, { wch: 15 }];
    const sheetName = `${cardid > 200000 ? "C" : "L"} ${cardBase[cardid][NAME].replace(/\W+/g, " ").substring(0, 20)}`;
    xlsx.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  return xlsx.write(workbook, { type: "array", bookType: XLSX });
};
