import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Modal, Input, Button, ErrorOverlay } from '@/components';
import { useApp, deckAdd } from '@/context';
import { deckServices } from '@/services';
import { useFetch } from '@/hooks';
import {
  AUTHOR,
  BRANCHES,
  BRANCH_NAME,
  CRYPT,
  DECKID,
  DESCRIPTION,
  LIBRARY,
  NAME,
  TITLE,
  TIMESTAMP,
  IS_AUTHOR,
  MASTER,
  CARDS,
} from '@/constants';

const DeckImportAmaranth = ({ handleClose }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const navigate = useNavigate();
  const [deckUrl, setDeckUrl] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  const VERSION = '2024-11-07';
  const url = `${import.meta.env.VITE_BASE_URL}/data/amaranth_ids.json?v=${VERSION}`;
  const { value: idReference } = useFetch(url, {}, []);

  const handleClick = () => {
    setImportError(false);
    if (!deckUrl) {
      setEmptyError(true);
      return;
    }

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
      setUrlError(true);
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

      let description = master[DESCRIPTION];
      if (revision['comments']) {
        if (description) description += '\n\n';
        description += revision['comments'];
      }

      branches.push({
        [AUTHOR]: master[AUTHOR],
        [CARDS]: cards,
        [DESCRIPTION]: description,
      });
    });

    return deckServices.branchesImport(master[DECKID], branches);
  };

  const importDeckFromAmaranth = async (amaranth_deck) => {
    const now = new Date();
    const deck = {
      [BRANCH_NAME]: '#0',
      [NAME]: amaranth_deck[TITLE],
      [AUTHOR]: amaranth_deck[AUTHOR] || '',
      [DESCRIPTION]: amaranth_deck[DESCRIPTION] || '',
      [CRYPT]: {},
      [LIBRARY]: {},
      [IS_AUTHOR]: true,
      [TIMESTAMP]: now.toUTCString(),
    };

    Object.keys(amaranth_deck.cards).forEach((i) => {
      if (idReference[i] !== undefined) {
        if (idReference[i] > 200000) {
          deck[CRYPT][idReference[i]] = {
            c: cryptCardBase[idReference[i]],
            q: amaranth_deck.cards[i],
          };
        } else {
          deck[LIBRARY][idReference[i]] = {
            c: libraryCardBase[idReference[i]],
            q: amaranth_deck.cards[i],
          };
        }
      }
    });

    deckServices
      .deckImport(deck)
      .then((data) => {
        deck[DECKID] = data[DECKID];

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
                [AUTHOR]: deck[AUTHOR],
                [BRANCH_NAME]: b[BRANCH_NAME],
                [CRYPT]: bCrypt,
                [LIBRARY]: bLibrary,
                [DECKID]: b[DECKID],
                [DESCRIPTION]: b[DESCRIPTION],
                [IS_AUTHOR]: true,
                [MASTER]: deck[DECKID],
                [NAME]: deck[NAME],
                [TIMESTAMP]: n.toUTCString(),
              };

              branches[d[DECKID]] = d;
            });

            deck[BRANCHES] = Object.keys(branches);
            Object.values(branches).forEach((b) => {
              deckAdd(b);
            });
            deckAdd(deck);
            navigate(`/decks/${deck[DECKID]}`);
          });
        } else {
          deckAdd(deck);
          navigate(`/decks/${deck[DECKID]}`);
        }
      })
      .catch(() => setImportError(true));
  };

  const onChange = (e) => {
    setDeckUrl(e.target.value);
    setEmptyError(null);
    setUrlError(null);
  };

  return (
    <Modal
      handleClose={handleClose}
      initialFocus={ref}
      centered={isMobile}
      title="Import from Amaranth"
      withMobileMargin
    >
      <div className="flex">
        <div className="relative flex w-full">
          <Input
            placeholder="e.g. https://amaranth.co.nz/deck#my-best-deck-id"
            className="text-xl"
            roundedStyle="rounded rounded-r-none"
            type="url"
            value={deckUrl}
            onChange={onChange}
            ref={ref}
          />
          {emptyError && <ErrorOverlay placement="bottom">ENTER URL</ErrorOverlay>}
          {urlError && <ErrorOverlay placement="bottom">ERROR IN URL</ErrorOverlay>}
          {importError && <ErrorOverlay placement="bottom">ERROR DURING IMPORT</ErrorOverlay>}
        </div>
        <Button className="min-w-[72px] rounded-l-none" onClick={handleClick}>
          {isLoading ? <Spinner className="size-5" /> : 'Import'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeckImportAmaranth;
