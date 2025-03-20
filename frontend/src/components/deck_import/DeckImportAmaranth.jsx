import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, ErrorOverlay, Input, Modal, Spinner } from '@/components';
import {
  AUTHOR,
  BRANCHES,
  BRANCH_NAME,
  CARDS,
  CRYPT,
  DECKID,
  DESCRIPTION,
  IS_AUTHOR,
  LIBRARY,
  MASTER,
  NAME,
  TIMESTAMP,
  TITLE,
} from '@/constants';
import { deckAdd, useApp } from '@/context';
import { useFetch } from '@/hooks';
import { deckServices } from '@/services';

const DeckImportAmaranth = ({ setShow }) => {
  const { setShowFloatingButtons, cryptCardBase, libraryCardBase, isMobile } = useApp();
  const navigate = useNavigate();
  const [deckUrl, setDeckUrl] = useState('');
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  const VERSION = '2024-11-07';
  const url = `${import.meta.env.VITE_BASE_URL}/data/amaranth_ids.json?v=${VERSION}`;
  const { value: idReference } = useFetch(url, {}, []);

  const handleClose = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  const handleClick = () => {
    setError(null);
    if (!deckUrl) {
      setError('ENTER URL');
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
          .catch(() => setError('ERROR DURING IMPORT'))
          .finally(() => setIsLoading(false));
      }
    } else {
      setError('ERROR IN URL');
    }
  };

  const branchesImport = async (master, revisions) => {
    const branches = [];

    revisions.forEach((revision) => {
      const cards = {};
      Object.keys(revision[CARDS]).forEach((i) => {
        if (idReference[i] !== undefined) {
          cards[idReference[i]] = revision[CARDS][i];
        }
      });

      let description = master[DESCRIPTION];
      if (revision.comments) {
        if (description) description += '\n\n';
        description += revision.comments;
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
    const deck = {
      [BRANCH_NAME]: '#0',
      [NAME]: amaranth_deck[TITLE],
      [AUTHOR]: amaranth_deck[AUTHOR] || '',
      [DESCRIPTION]: amaranth_deck[DESCRIPTION] || '',
      [CRYPT]: {},
      [LIBRARY]: {},
      [IS_AUTHOR]: true,
      [TIMESTAMP]: dayjs().toISOString(),
    };

    Object.keys(amaranth_deck[CARDS]).forEach((i) => {
      if (idReference[i] !== undefined) {
        if (idReference[i] > 200000) {
          deck[CRYPT][idReference[i]] = {
            c: cryptCardBase[idReference[i]],
            q: amaranth_deck[CARDS][i],
          };
        } else {
          deck[LIBRARY][idReference[i]] = {
            c: libraryCardBase[idReference[i]],
            q: amaranth_deck[CARDS][i],
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
              Object.keys(b[CARDS]).forEach((cardid) => {
                if (cardid > 200000) {
                  bCrypt[cardid] = {
                    c: cryptCardBase[cardid],
                    q: b[CARDS][cardid],
                  };
                } else {
                  bLibrary[cardid] = {
                    c: libraryCardBase[cardid],
                    q: b[CARDS][cardid],
                  };
                }
              });

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
                [TIMESTAMP]: dayjs().toISOString(),
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
      .catch(() => setError('ERROR DURING IMPORT'));
  };

  const onChange = (e) => {
    setDeckUrl(e.target.value);
    setError(null);
  };

  return (
    <Modal
      handleClose={handleClose}
      initialFocus={ref}
      centered={isMobile}
      title="Import from Amaranth"
      size="sm"
      withMobileMargin
    >
      <div className="flex">
        <div className="relative flex w-full">
          <Input
            placeholder="e.g. https://amaranth.co.nz/deck#my-best-deck-id"
            className="text-xl"
            roundedStyle="rounded-sm rounded-r-none"
            type="url"
            value={deckUrl}
            onChange={onChange}
            ref={ref}
          />
          {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
        </div>
        <Button className="min-w-[72px] rounded-l-none" onClick={handleClick}>
          {isLoading ? <Spinner className="size-5" /> : 'Import'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeckImportAmaranth;
