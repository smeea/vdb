import React, { useState, useRef } from 'react';
import { FormControl, Modal, Button, Spinner } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import { useApp } from 'context';

const DeckImportAmaranth = ({
  addImportedDeckToState,
  parseCards,
  handleCloseModal,
  show,
}) => {
  const { setDecks, setActiveDeck, isMobile } = useApp();
  const [deckUrl, setDeckUrl] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const refUrl = useRef(null);
  const [idReference, setIdReference] = useState(undefined);
  const [spinnerState, setSpinnerState] = useState(false);

  const getIdReference = () => {
    const VERSION = '2022-07-22';
    const url = `${process.env.ROOT_URL}amaranth_ids.json?v=${VERSION}`;
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
        getDeckFromUrl(deckUrl)
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

    const url = `${process.env.API_URL}deck/${master.deckid}/branch`;

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
          branches[idx].branch_name = branch.branch_name;
        });
        return branches;
      })
      .catch(() => setImportError(true));
  };

  const importDeckFromAmaranth = async (amaranth_deck) => {
    const deck = {
      name: amaranth_deck.title,
      author: amaranth_deck.author,
      description: amaranth_deck.description,
      cards: {},
    };

    Object.keys(amaranth_deck.cards).map((i) => {
      if (idReference[i] !== undefined) {
        deck.cards[idReference[i]] = amaranth_deck.cards[i];
      }
    });

    const url = `${process.env.API_URL}deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deck),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        deck.deckid = data.deckid;

        if (amaranth_deck.versions) {
          branchesImport(deck, amaranth_deck.versions).then((branches) => {
            const now = new Date();
            const decks = {};

            branches.map((b) => {
              const { crypt, library } = parseCards(b.cards);

              decks[b.deckid] = {
                author: deck.author,
                branchName: b.branch_name,
                crypt: crypt,
                deckid: b.deckid,
                description: b.comments || '',
                isAuthor: true,
                library: library,
                master: deck.deckid,
                name: deck.name,
                timestamp: now.toUTCString(),
              };
            });

            const { crypt, library } = parseCards(deck.cards);
            decks[deck.deckid] = {
              author: deck.author,
              branchName: '#0',
              branches: Object.keys(decks),
              crypt: crypt,
              deckid: deck.deckid,
              description: deck.description || '',
              isAuthor: true,
              library: library,
              name: deck.name,
              timestamp: now.toUTCString(),
            };

            setDecks((prevState) => ({
              ...prevState,
              ...decks,
            }));
          });
        } else {
          addImportedDeckToState({ data });
        }

        setActiveDeck({ src: 'my', deckid: deck.deckid });
      })
      .catch(() => setImportError(true));
  };

  const getDeckFromUrl = async (deckUrl) => {
    const url = `${process.env.AMARANTH_API_URL}deck`;
    const id = deckUrl.replace(/.*#deck\//i, '');
    const options = {
      method: 'POST',
      body: `id=${id}`,
    };

    const response = await fetch(url, options).catch(() =>
      setImportError(true)
    );
    const deck = await response.json();
    return deck.result;
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
        <h5>Import from Amaranth URL</h5>
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
              ? 'd-flex justify-content-end py-0 px-3'
              : 'd-flex justify-content-end py-1'
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
