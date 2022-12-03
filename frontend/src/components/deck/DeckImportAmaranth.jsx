import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Modal, Button, Spinner } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import { useApp, deckAdd } from 'context';
import { deckServices } from 'services';

const DeckImportAmaranth = ({ handleCloseModal, show }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const navigate = useNavigate();
  const [deckUrl, setDeckUrl] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const refUrl = useRef(null);
  const [idReference, setIdReference] = useState(undefined);
  const [spinnerState, setSpinnerState] = useState(false);

  const getIdReference = () => {
    const VERSION = '2022-07-22';
    const url = `${process.env.ROOT_URL}data/amaranth_ids.json?v=${VERSION}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.error === undefined && setIdReference(data));
  };

  if (show && !idReference) getIdReference();

  const handleClose = () => {
    handleCloseModal();
    setDeckUrl('');
  };

  const handleImportButton = () => {
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
      show={show}
      onHide={handleClose}
      onShow={() => refUrl.current.focus()}
      animation={false}
      size="lg"
      centered={isMobile}
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
      >
        <h5>Import from Amaranth</h5>
        <Button variant="outline-secondary" onClick={handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'px-0 pt-0' : 'px-4 pt-2'}>
        <FormControl
          placeholder="e.g. https://amaranth.co.nz/deck#my-best-deck-id"
          className="deck-import mb-3"
          type="text"
          name="url"
          value={deckUrl}
          onChange={(event) => setDeckUrl(event.target.value)}
          ref={refUrl}
        />
        <div
          className={
            isMobile
              ? 'flex justify-end py-0 px-3'
              : 'flex justify-end py-1'
          }
        >
          {!spinnerState ? (
            <Button variant="primary" onClick={handleImportButton}>
              Import
            </Button>
          ) : (
            <Button variant="primary" onClick={handleImportButton}>
              <Spinner animation="border" size="sm" />
              <span className="ps-2">Import</span>
            </Button>
          )}
        </div>
        <ErrorOverlay
          show={emptyError}
          target={refUrl.current}
          placement="bottom"
          modal={true}
        >
          ERROR IN URL
        </ErrorOverlay>
        <ErrorOverlay
          show={importError}
          target={refUrl.current}
          placement="bottom"
          modal={true}
        >
          ERROR DURING IMPORT
        </ErrorOverlay>
      </Modal.Body>
    </Modal>
  );
};

export default DeckImportAmaranth;
