import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Modal, Input, Button, ErrorOverlay } from '@/components';
import { useApp, deckAdd } from '@/context';
import { deckServices } from '@/services';
import { useFetch } from '@/hooks';

const DeckImportAmaranth = ({ handleClose }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const navigate = useNavigate();
  const [deckUrl, setDeckUrl] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  const VERSION = '2022-07-22';
  const url = `${import.meta.env.VITE_BASE_URL}/data/amaranth_ids.json?v=${VERSION}`;
  const { value: idReference } = useFetch(url, {}, []);

  const handleImport = () => {
    setImportError(false);

    if (/.*#deck\//.test(deckUrl)) {
      setIsLoading(true);

      if (idReference) {
        deckServices
          .getDeckFromAmaranth(deckUrl)
          .then((deck) => importDeckFromAmaranth(deck))
          .then(() => {
            setDeckUrl('');
            handleClose();
          })
          .catch(() => setImportError(true))
          .finally(() => setIsLoading(false));
      }
    } else {
      setEmptyError(true);
    }
  };

  const branchesImport = async (master, revisions) => {
    const branches = [];

    revisions.forEach((revision) => {
      const cards = {};
      Object.keys(revision.cards).forEach((i) => {
        if (idReference[i] !== undefined) {
          cards[idReference[i]] = revision.cards[i];
        }
      });

      let description = master.description;
      if (revision['comments']) {
        if (description) description += '\n\n';
        description += revision['comments'];
      }

      branches.push({
        author: master.author,
        cards: cards,
        description: description,
      });
    });

    return deckServices.branchesImport(master.deckid, branches);
  };

  const importDeckFromAmaranth = async (amaranth_deck) => {
    const now = new Date();
    const deck = {
      branchName: '#0',
      name: amaranth_deck.title,
      author: amaranth_deck.author || '',
      description: amaranth_deck.description || '',
      crypt: {},
      library: {},
      isAuthor: true,
      timestamp: now.toUTCString(),
    };

    Object.keys(amaranth_deck.cards).forEach((i) => {
      if (idReference[i] !== undefined) {
        if (idReference[i] > 200000) {
          deck.crypt[idReference[i]] = {
            c: cryptCardBase[idReference[i]],
            q: amaranth_deck.cards[i],
          };
        } else {
          deck.library[idReference[i]] = {
            c: libraryCardBase[idReference[i]],
            q: amaranth_deck.cards[i],
          };
        }
      }
    });

    deckServices
      .deckImport(deck)
      .then((data) => {
        deck.deckid = data.deckid;

        if (amaranth_deck.versions) {
          const branches = {};

          branchesImport(deck, amaranth_deck.versions).then((brs) => {
            brs.forEach((b) => {
              const bCrypt = {};
              const bLibrary = {};
              Object.keys(b.cards).forEach((cardid) => {
                if (cardid > 200000) {
                  bCrypt[cardid] = {
                    c: cryptCardBase[cardid],
                    q: b.cards[cardid],
                  };
                } else {
                  bLibrary[cardid] = {
                    c: libraryCardBase[cardid],
                    q: b.cards[cardid],
                  };
                }
              });

              const n = new Date();
              const d = {
                author: deck.author,
                branchName: b.branchName,
                crypt: bCrypt,
                library: bLibrary,
                deckid: b.deckid,
                description: b.description,
                isAuthor: true,
                master: deck.deckid,
                name: deck.name,
                timestamp: n.toUTCString(),
              };

              branches[d.deckid] = d;
            });

            deck.branches = Object.keys(branches);
            Object.values(branches).forEach((b) => {
              deckAdd(b);
            });
            deckAdd(deck);
            navigate(`/decks/${deck.deckid}`);
          });
        } else {
          deckAdd(deck);
          navigate(`/decks/${deck.deckid}`);
        }
      })
      .catch(() => setImportError(true));
  };

  return (
    <Modal
      handleClose={handleClose}
      initialFocus={ref}
      size="lg"
      centered={isMobile}
      title="Import from Amaranth"
    >
      <div className="flex">
        <div className="relative flex w-full">
          <Input
            placeholder="e.g. https://amaranth.co.nz/deck#my-best-deck-id"
            className="text-xl"
            roundedStyle="rounded rounded-r-none"
            type="text"
            name="url"
            value={deckUrl}
            onChange={(event) => setDeckUrl(event.target.value)}
            ref={ref}
          />
          {emptyError && <ErrorOverlay placement="bottom">ERROR IN URL</ErrorOverlay>}
          {importError && <ErrorOverlay placement="bottom">ERROR DURING IMPORT</ErrorOverlay>}
        </div>
        <Button className="min-w-[72px] rounded-l-none" variant="primary" onClick={handleImport}>
          {isLoading ? <Spinner className="size-5" /> : 'Import'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeckImportAmaranth;
