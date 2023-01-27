import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/assets/images/icons/three-dots.svg';
import { Modal, Button, ErrorOverlay } from '@/components';
import { useApp, deckAdd } from '@/context';
import { deckServices } from '@/services';

const DeckImportAmaranth = ({ handleCloseModal, show }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const navigate = useNavigate();
  const [deckUrl, setDeckUrl] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const refUrl = useRef();
  const [idReference, setIdReference] = useState();
  const [spinnerState, setSpinnerState] = useState(false);

  const getIdReference = () => {
    const VERSION = '2022-07-22';
    const url = `${import.meta.env.VITE_BASE_URL}/data/amaranth_ids.json?v=${VERSION}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.error === undefined && setIdReference(data));
  };

  if (show && !idReference) getIdReference();

  const handleClose = () => {
    handleCloseModal();
    setDeckUrl('');
  };

  const handleImport = () => {
    setImportError(false);

    if (/.*#deck\//.test(deckUrl)) {
      setEmptyError(false);
      setSpinnerState(true);

      if (idReference) {
        deckServices
          .getDeckFromAmaranth(deckUrl)
          .then((deck) => importDeckFromAmaranth(deck))
          .then(() => {
            setDeckUrl('');
            setSpinnerState(false);
            handleClose();
          })
          .catch(() => {
            setImportError(true);
            setSpinnerState(false);
          });
      }
    } else {
      setEmptyError(true);
    }
  };

  const branchesImport = async (master, revisions) => {
    const branches = [];

    revisions.map((revision) => {
      const cards = {};
      Object.keys(revision.cards).map((i) => {
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

    Object.keys(amaranth_deck.cards).map((i) => {
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
      .then((response) => response.json())
      .then((data) => {
        deck.deckid = data.deckid;

        if (amaranth_deck.versions) {
          const branches = {};

          branchesImport(deck, amaranth_deck.versions).then((brs) => {
            brs.map((b) => {
              const bCrypt = {};
              const bLibrary = {};
              Object.keys(b.cards).map((cardid) => {
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
            Object.values(branches).map((b) => {
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
      onShow={() => refUrl.current.focus()}
      size="lg"
      centered={isMobile}
      dialogClassName={isMobile ? '' : null}
      title="Import from Amaranth"
    >
      <div>
        <input
          placeholder="e.g. https://amaranth.co.nz/deck#my-best-deck-id"
          className="text-xl focus:text-fgRed dark:text-fgRedDark"
          type="text"
          name="url"
          value={deckUrl}
          onChange={(event) => setDeckUrl(event.target.value)}
          ref={refUrl}
        />
        <div className={isMobile ? 'flex justify-end' : 'flex justify-end'}>
          {!spinnerState ? (
            <Button variant="primary" onClick={handleImport}>
              Import
            </Button>
          ) : (
            <Button variant="primary" onClick={handleImport}>
              <Spinner />
              <span>Import</span>
            </Button>
          )}
        </div>
        {emptyError && (
          <ErrorOverlay placement="bottom">ERROR IN URL</ErrorOverlay>
        )}
        {importError && (
          <ErrorOverlay placement="bottom">ERROR DURING IMPORT</ErrorOverlay>
        )}
      </div>
    </Modal>
  );
};

export default DeckImportAmaranth;
