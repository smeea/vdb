import { useDeckExport } from '@/hooks';
import { defer } from 'react-router-dom';

export const update = (deckid, field, value) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [field]: value }),
  };

  return fetch(url, options);
};

export const cardChange = (deckid, cardid, q) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}`;
  const options = {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardChange: { [cardid]: q } }),
  };

  return fetch(url, options);
};

export const deckImport = (deck) => {
  const cards = {};
  Object.values({ ...deck.crypt, ...deck.library }).map((card) => {
    cards[card.c.Id] = card.q;
  });

  const url = `${import.meta.env.VITE_API_URL}/deck`;
  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: deck.name,
      description: deck.description,
      author: deck.author,
      cards: cards,
      anonymous: deck.anonymous,
    }),
  };

  return fetch(url, options);
};

export const branchesImport = async (masterId, branches) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${masterId}/branch`;
  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      branches: branches,
    }),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      data.map((branch, idx) => {
        branches[idx].deckid = branch.deckid;
        branches[idx].branchName = branch.branchName;
      });

      return branches;
    });
};

export const getDeckFromAmaranth = async (deckUrl) => {
  const url = `${import.meta.env.AMARANTH_VITE_API_URL}/deck`;
  const id = deckUrl.replace(/.*#deck\//i, '');
  const options = {
    method: 'POST',
    body: `id=${id}`,
  };

  const response = await fetch(url, options);
  const deck = await response.json();

  return deck.result;
};

export const exportDecks = async (decks, format) => {
  const Jszip = await import('jszip');
  const zip = new Jszip();
  const date = new Date().toISOString().substring(0, 10);

  if (format === 'xlsx') {
    const fetchPromises = Object.values(decks).map((deck) => {
      let deckName = deck.name;
      if (deck.branchName && (deck.master || deck.branches.length > 0)) {
        deckName += ` [${deck['branchName']}]`;
      }

      return { deckName: deckName, file: exportXlsx(deck) };
    });

    const folder = zip.folder(`Decks ${date} [${format}]`);
    Promise.all(fetchPromises).then((deckExports) => {
      deckExports.map((d) => {
        folder.file(`${d.deckName}.xlsx`, d.file, {
          base64: true,
        });
      });

      zip
        .generateAsync({ type: 'blob' })
        .then((blob) => saveFile(blob, `Decks ${date} [${format}].zip`));
    });
  } else {
    Object.values(decks).map((deck) => {
      let deckName = deck.name;
      if (deck.branchName && (deck.master || deck.branches.length > 0)) {
        deckName += ` [${deck['branchName']}]`;
      }

      zip
        .folder(`Decks ${date} [${format}]`)
        .file(`${deckName}.txt`, useDeckExport(deck, format));
    });

    zip
      .generateAsync({ type: 'blob' })
      .then((blob) => saveFile(blob, `Decks ${date} [${format}].zip`));
  }
};

export const exportXlsx = async (deck) => {
  let XLSX = await import('xlsx');
  const crypt = Object.values(deck.crypt).map((card) => {
    let name = card.c.Name;
    if (card.c.Adv && card.c.Adv[0]) name += ' (ADV)';
    if (card.c.New) name += ` (G${card.c.Group})`;

    return { Quantity: card.q, Card: name };
  });

  const library = Object.values(deck.library).map((card) => {
    return { Quantity: card.q, Card: card.c.Name };
  });

  const cryptSheet = XLSX.utils.json_to_sheet(crypt);
  const librarySheet = XLSX.utils.json_to_sheet(library);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, cryptSheet, 'Crypt');
  XLSX.utils.book_append_sheet(workbook, librarySheet, 'Library');
  return XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
};

const saveFile = async (file, name) => {
  let { saveAs } = await import('file-saver');
  saveAs(file, name);
};

export const deckLoader = async ({ params }) => {
  if (params.deckid === 'deck' || params.deckid.includes(':')) return null;

  const url = `${import.meta.env.VITE_API_URL}/deck/${params.deckid}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = await fetch(url, options);
  if (!response.ok) return { error: response.status };
  const deckData = await response.json();

  return defer({ deckData });
};
