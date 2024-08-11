import ky from 'ky';
import { useDeckExport } from '@/hooks';
import { redirect, defer } from 'react-router-dom';
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
  Object.values({ ...deck.crypt, ...deck.library }).forEach((card) => {
    cards[card.c.Id] = card.q;
  });

  return ky
    .post(url, {
      json: {
        name: deck.name,
        description: deck.description,
        author: deck.author,
        cards: cards,
        anonymous: deck.anonymous,
      },
    })
    .json();
};

export const deckDelete = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/deck/${deck.deckid}`;
  return ky.delete(url).then(() => delete deckStore.decks[deck.master ?? deck.deckid]);
};

export const deckClone = (deck) => {
  const url = `${import.meta.env.VITE_API_URL}/deck`;
  const name = `${deck.name} [by ${deck.author}]`;
  const cards = {};
  Object.keys(deck.crypt).forEach((cardid) => (cards[cardid] = deck.crypt[cardid].q));
  Object.keys(deck.library).forEach((cardid) => (cards[cardid] = deck.library[cardid].q));

  return ky
    .post(url, {
      json: {
        name: name,
        description: deck.description,
        author: deck.author,
        cards: cards,
        tags: deck.tags,
      },
    })
    .json()
    .then((data) => {
      if (data.error === undefined) {
        const now = new Date();

        deckStore.decks[data.deckid] = {
          branchName: null,
          branches: [],
          crypt: { ...deck.crypt },
          library: { ...deck.library },
          deckid: data.deckid,
          master: null,
          name: name,
          timestamp: now.toUTCString(),
          tags: deck.tags,
          author: deck.author,
          description: deck.description,
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
  Object.keys(deck.crypt).forEach((cardid) => (cards[cardid] = deck.crypt[cardid].q));
  Object.keys(deck.library).forEach((cardid) => (cards[cardid] = deck.library[cardid].q));

  return ky
    .post(url, {
      json: {
        name: deck.name,
        description: deck.description,
        author: deck.author,
        cards: cards,
        tags: deck.tags,
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
      deckStore.decks[masterId].branches = branches;
      deckStore.decks[masterId].isBranches = branches.length > 0;
    } else {
      masterId = branches.pop();
      deckStore.decks[masterId].branches = branches;
      deckStore.decks[masterId].isBranches = branches.length > 0;
      deckStore.decks[masterId].master = null;
      branches.map((b) => {
        deckStore.decks[b].master = masterId;
      });
    }

    delete deckStore.decks[deckid];
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
      deckStore.decks[master].master = null;
      deckStore.decks[master].isBranches = true;
      deckStore.decks[master].branches = deckStore.decks[master].branches
        ? [...deckStore.decks[master].branches, data[0].deckid]
        : [data[0].deckid];

      deckStore.decks[data[0].deckid] = {
        ...deck,
        deckid: data[0].deckid,
        description: `[${now.toISOString().split('T')[0]}]\n${branch.description}`,
        tags: branch.tags,
        crypt: { ...branch.crypt },
        library: { ...branch.library },
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
      deckStore.deck.crypt = { ...decks[deck.publicParent].crypt };
      deckStore.deck.library = { ...decks[deck.publicParent].library };
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
      deckStore.decks[parentId].publicChild = isPublished ? null : data.deckid;
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
      let deckName = deck.name;
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
      let deckName = deck.name;
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
