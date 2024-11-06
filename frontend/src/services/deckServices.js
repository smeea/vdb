import ky from 'ky';
import { redirect, defer } from 'react-router-dom';
import { useDeckExport } from '@/hooks';
import { getTextDisciplines } from '@/utils';
import { DECK, DECKS, POOL, BLOOD, TEXT } from '@/constants';
import { deckStore } from '@/context';

export const update = (deckid, field, value) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}`;
  return ky.put(url, { json: { [field]: value } }).json();
};

export const cardChange = (deckid, cardid, q) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}`;
  return ky.put(url, { json: { cardChange: { [cardid]: q } } }).json();
};

export const deckImport = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/deck`;
  const cards = {};
  Object.values({ ...deck[CRYPT], ...deck[LIBRARY] }).forEach((card) => {
    cards[card.c[ID]] = card.q;
  });

  return ky
    .post(url, {
      json: {
        name: deck[NAME],
        description: deck[DESCRIPTION],
        author: deck[AUTHOR],
        cards: cards,
        anonymous: deck.anonymous,
      },
    })
    .json();
};

export const deckDelete = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deck.deckid}`;
  return ky.delete(url).then(() => delete deckStore[DECKS][deck.master ?? deck.deckid]);
};

export const deckClone = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/deck`;
  const name = `${deck[NAME]} [by ${deck[AUTHOR]}]`;
  const cards = {};
  Object.keys(deck[CRYPT]).forEach((cardid) => (cards[cardid] = deck[CRYPT][cardid].q));
  Object.keys(deck[LIBRARY]).forEach((cardid) => (cards[cardid] = deck[LIBRARY][cardid].q));

  return ky
    .post(url, {
      json: {
        name: name,
        description: deck[DESCRIPTION],
        author: deck[AUTHOR],
        cards: cards,
        tags: deck[TAGS],
      },
    })
    .json()
    .then((data) => {
      if (data.error === undefined) {
        const now = new Date();

        deckStore[DECKS][data.deckid] = {
          branchName: null,
          branches: [],
          crypt: { ...deck[CRYPT] },
          library: { ...deck[LIBRARY] },
          deckid: data.deckid,
          master: null,
          name: name,
          timestamp: now.toUTCString(),
          tags: deck[TAGS],
          author: deck[AUTHOR],
          description: deck[DESCRIPTION],
          isAuthor: true,
          isBranches: false,
        };

        return data.deckid;
      }
    });
};

export const deckSnapshot = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/deck`;
  const cards = {};
  Object.keys(deck[CRYPT]).forEach((cardid) => (cards[cardid] = deck[CRYPT][cardid].q));
  Object.keys(deck[LIBRARY]).forEach((cardid) => (cards[cardid] = deck[LIBRARY][cardid].q));

  return ky
    .post(url, {
      json: {
        name: deck[NAME],
        description: deck[DESCRIPTION],
        author: deck[AUTHOR],
        cards: cards,
        tags: deck[TAGS],
        anonymous: true,
      },
    })
    .json()
    .then((data) => data.deckid);
};

export const branchesImport = (masterId, branches) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${masterId}/branch`;

  return ky
    .post(url, {
      json: { branches: branches },
    })
    .json()
    .then((data) => {
      data.forEach((branch, idx) => {
        branches[idx].deckid = branch.deckid;
        branches[idx].branchName = branch.branchName;
      });

      return branches;
    });
};

export const branchDelete = (deckid, decks) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}/branch`;

  return ky.delete(url).then(() => {
    let masterId = decks[deckid].master || null;
    const branches = masterId ? [...decks[masterId].branches] : [...decks[deckid].branches];

    if (masterId) {
      branches.splice(branches.indexOf(deckid), 1);
      deckStore[DECKS][masterId].branches = branches;
      deckStore[DECKS][masterId].isBranches = branches.length > 0;
    } else {
      masterId = branches.pop();
      deckStore[DECKS][masterId].branches = branches;
      deckStore[DECKS][masterId].isBranches = branches.length > 0;
      deckStore[DECKS][masterId].master = null;
      branches.map((b) => {
        deckStore[DECKS][b].master = masterId;
      });
    }

    delete deckStore[DECKS][deckid];
    return masterId;
  });
};

export const branchCreate = (deck, branch) => {
  const master = deck.master ?? deck.deckid;
  const url = `${import.meta.env.VITE_API_URL}/deck/${master}/branch`;

  return ky
    .post(url, { json: { deckid: branch.deckid } })
    .json()
    .then((data) => {
      const now = new Date();
      deckStore[DECKS][master].master = null;
      deckStore[DECKS][master].isBranches = true;
      deckStore[DECKS][master].branches = deckStore[DECKS][master].branches
        ? [...deckStore[DECKS][master].branches, data[0].deckid]
        : [data[0].deckid];

      deckStore[DECKS][data[0].deckid] = {
        ...deck,
        deckid: data[0].deckid,
        description: `[${now.toISOString().split('T')[0]}]\n${branch[DESCRIPTION]}`,
        tags: branch[TAGS],
        crypt: { ...branch[CRYPT] },
        library: { ...branch[LIBRARY] },
        inventoryType: '',
        master: master,
        branchName: data[0].branchName,
        isPublic: false,
        isBranches: true,
        timestamp: now.toUTCString(),
      };
      return data[0].deckid;
    });
};

export const publicSync = (deck, decks) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/${deck.deckid}`;
  return ky
    .put(url)
    .json()
    .then(() => {
      deckStore[DECK][CRYPT] = { ...decks[deck.publicParent][CRYPT] };
      deckStore[DECK][LIBRARY] = { ...decks[deck.publicParent][LIBRARY] };
    });
};

export const publicCreateOrDelete = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/pda/${deck.deckid}`;

  const isPublished = !!(deck.publicParent || deck.publicChild);
  const parentId = deck.publicParent ?? deck.deckid;

  return ky(url, {
    method: isPublished ? 'DELETE' : 'POST',
  })
    .json()
    .then((data) => {
      deckStore[DECKS][parentId].publicChild = isPublished ? null : data.deckid;
      return data.deckid;
    });
};

export const getDeckFromAmaranth = async (deckUrl) => {
  const url = `${import.meta.env.VITE_AMARANTH_API_URL}/deck`;
  const id = deckUrl.replace(/.*#deck\//i, '');

  const deck = await ky
    .post(url, {
      body: `id=${id}`,
    })
    .json();

  return deck.result;
};

export const exportDecks = async (decks, format) => {
  const { default: JSzip } = await import('jszip');
  const zip = JSzip();
  const date = new Date().toISOString().split('T')[0];

  if (format === 'xlsx') {
    const fetchPromises = Object.values(decks).map((deck) => {
      let deckName = deck[NAME];
      if (deck.branchName && (deck.master || deck.branches.length > 0)) {
        deckName += ` [${deck['branchName']}]`;
      }

      return { deckName: deckName, file: exportXlsx(deck) };
    });

    const folder = zip.folder(`Decks ${date} [${format}]`);
    Promise.all(fetchPromises).then((deckExports) => {
      deckExports.forEach((d) => {
        folder.file(`${d.deckName}.xlsx`, d.file, {
          base64: true,
        });
      });

      zip
        .generateAsync({ type: 'blob' })
        .then((blob) => saveFile(blob, `Decks ${date} [${format}].zip`));
    });
  } else {
    Object.values(decks).forEach((deck) => {
      let deckName = deck[NAME];
      if (deck.branchName && (deck.master || deck.branches.length > 0)) {
        deckName += ` [${deck['branchName']}]`;
      }

      zip.folder(`Decks ${date} [${format}]`).file(`${deckName}.txt`, useDeckExport(deck, format));
    });

    zip
      .generateAsync({ type: 'blob' })
      .then((blob) => saveFile(blob, `Decks ${date} [${format}].zip`));
  }
};

export const exportXlsx = async (deck) => {
  const XLSX = await import('xlsx');
  const crypt = Object.values(deck[CRYPT]).map((card) => {
    const c = card.c;
    let name = c[NAME];
    if (c[ADV] && c[ADV][0]) name += ' (ADV)';
    if (c[NEW]) name += ` (G${c[GROUP]})`;

    return {
      Quantity: card.q,
      Card: name,
      Disciplines: getTextDisciplines(c[DISCIPLINES]),
      Capacity: c[CAPACITY],
      Group: c[GROUP],
      Clan: c[CLAN],
      Text: c[TEXT].replace(/ ?\[\w+\]/g, ''),
    };
  });

  const library = Object.values(deck[LIBRARY]).map((card) => {
    const c = card.c;
    return {
      Quantity: card.q,
      Card: c[NAME],
      Type: c[TYPE],
      Clan: c[CLAN],
      'Blood Cost': c[BLOOD],
      'Pool Cost': c[POOL],
      Text: c[TEXT].replace(/ ?\[\w+\]/g, ''),
    };
  });

  const cryptSheet = XLSX.utils.json_to_sheet(crypt);
  const librarySheet = XLSX.utils.json_to_sheet(library);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, cryptSheet, 'Crypt');
  XLSX.utils.book_append_sheet(workbook, librarySheet, 'Library');
  return XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
};

const saveFile = async (file, name) => {
  const { saveAs } = await import('file-saver');
  saveAs(file, name);
};

export const deckLoader = async ({ params }) => {
  const deckid = params.deckid;

  if (deckid === 'deck' || deckid.includes(':')) return null;
  if (deckid.length == 32) {
    return redirect(`/decks/${deckid.substring(0, 9)}`);
  }

  const response = getDeck(deckid);
  return defer({ deckData: response });
};

export const getDeck = (deckid) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}`;
  return ky.get(url).json();
};
