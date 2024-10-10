import ky from 'ky';
import { GENERAL, NAME } from '@/utils/constants';

export const submitReport = (id, value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/${isPrecon ? 'precons' : 'cards'}/${id}`;
  return ky.put(url, { json: value }).json();
};

export const changePlaytester = (user, isAdd = true) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  return ky(url, {
    method: isAdd ? 'PUT' : 'DELETE',
    json: { username: user },
  }).json();
};

export const getReports = async (value, isPrecon) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${value.Id}`;

  return ky.get(url).json();
};

export const updateProfile = (target, value) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/profile`;
  return ky.put(url, { json: { [target]: value } }).json();
};

export const exportXlsx = async (value, cryptCardBase, libraryCardBase, preconDecks) => {
  const XLSX = await import('xlsx');
  const workbook = XLSX.utils.book_new();

  const cardsData = Object.keys(value)
    .filter((id) => !isNaN(id))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: value[key],
      };
    }, {});

  const preconsData = Object.keys(value)
    .filter((id) => isNaN(id) && id !== GENERAL)
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: value[key],
      };
    }, {});

  const generalData = value[GENERAL];

  const getSheet = (data) => {
    const reports = Object.entries(data).map((j) => {
      const [username, report] = j;
      return {
        User: username,
        'Is Played': report.isPlayed ? 'Y' : 'N',
        Score: report.score,
        Report: report.text,
      };
    });

    return XLSX.utils.json_to_sheet(reports);
  };

  const generalReports = Object.keys(generalData).map((user) => {
    return {
      User: user,
      Report: generalData[user],
    };
  });
  const generalSheet = XLSX.utils.json_to_sheet(generalReports);
  XLSX.utils.book_append_sheet(workbook, generalSheet, 'General');

  Object.entries(preconsData).forEach((i) => {
    const [id, reportsData] = i;
    if (!preconDecks[`PLAYTEST:${id}`]) return;
    const sheet = getSheet(reportsData);
    const sheetName = `P ${preconDecks[`PLAYTEST:${id}`].name.replace(/\W+/g, ' ').substring(0, 20)}`;
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  Object.entries(cardsData).forEach((i) => {
    const [cardid, reportsData] = i;
    const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
    if (!cardBase[cardid]) return;
    const sheet = getSheet(reportsData);
    const sheetName = `${cardid > 200000 ? 'C' : 'L'} ${cardBase[cardid][NAME].replace(/\W+/g, ' ').substring(0, 20)}`;
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  });

  return XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
};
