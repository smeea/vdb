import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import Printer from 'assets/images/icons/printer.svg';
import Spinner from 'assets/images/icons/three-dots.svg';
import { ButtonIconed, DeckProxySelectModal } from 'components';
import { cryptSort } from 'utils';
import { useDeckLibrary } from 'hooks';
import { cardtypeSortedFull } from 'utils/constants';
import { useApp } from 'context';

const DeckProxyButton = ({ deck, missingCrypt, missingLibrary, inDiff }) => {
  const {
    inventoryMode,
    setShowFloatingButtons,
    setShowMenuButtons,
    cryptDeckSort,
    lang,
  } = useApp();

  const [spinnerState, setSpinnerState] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(undefined);

  const checkImage = (url) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.status == 200;
  };

  const getUrl = (card, set, language) => {
    let url = null;
    let urlLangSet = null;
    if (card.Id > 200000) {
      url = `${process.env.ROOT_URL}images/cards/en-EN/${card['ASCII Name']
        .toLowerCase()
        .replace(/[\s,:!?'".\-\(\)\/]/g, '')}g${card.Group.toLowerCase()}${
        card.Adv[0] ? 'adv' : ''
      }.jpg`;
    } else {
      url = `${process.env.ROOT_URL}images/cards/en-EN/${card['ASCII Name']
        .toLowerCase()
        .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;
    }

    if (language !== 'en-EN' || set) {
      if (card.Id > 200000) {
        urlLangSet = `${process.env.ROOT_URL}images/cards/${
          set ? `set/${set}` : language
        }/${card['ASCII Name']
          .toLowerCase()
          .replace(/[\s,:!?'".\-\(\)\/]/g, '')}g${card.Group.toLowerCase()}${
          card.Adv[0] ? 'adv' : ''
        }.jpg`;
      } else {
        urlLangSet = `${process.env.ROOT_URL}images/cards/${
          set ? `set/${set}` : language
        }/${card['ASCII Name']
          .toLowerCase()
          .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;
      }
    }

    return { base: url, langset: urlLangSet };
  };

  const proxyCards = async (crypt, library, isWhiteGaps) => {
    setSpinnerState(true);

    const cryptSorted = cryptSort(
      Object.values(crypt).filter((card) => card.q > 0),
      cryptDeckSort
    );
    const { libraryByType } = useDeckLibrary(library);
    const cards = [];
    let cardsTotal = 0;

    cryptSorted.map((card) => {
      cards.push({ url: getUrl(card.c, card.set, lang), q: card.q });
      cardsTotal += card.q;
    });

    cardtypeSortedFull.map((type) => {
      if (libraryByType[type]) {
        libraryByType[type].map((card) => {
          cards.push({ url: getUrl(card.c, card.set, lang), q: card.q });
          cardsTotal += card.q;
        });
      }
    });

    let { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    isWhiteGaps
      ? pdf.setFillColor(255, 255, 255)
      : pdf.setFillColor(60, 60, 60);

    const w = 63;
    const h = 88;
    const gap = 0.25;
    const marginLeft = 10;
    const marginTop = 10;

    let counterX = 0;
    let counterY = 0;
    let page = 1;

    Object.values(cards).map((card) => {
      const img = new Image();
      if (card.url.langset && checkImage(card.url.langset)) {
        img.src = card.url.langset;
      } else {
        img.src = card.url.base;
      }

      for (let i = 0; i < card.q; i++) {
        pdf.rect(
          marginLeft + counterX * (w + gap),
          marginTop + counterY * (h + gap),
          w + gap,
          h + gap,
          'F'
        );

        pdf.addImage(
          img,
          'JPEG',
          (w + gap) * counterX + marginLeft,
          (h + gap) * counterY + marginTop,
          w,
          h
        );

        counterX += 1;

        if (counterX == 3) {
          counterY += 1;
          counterX = 0;
        }

        if (counterY == 3 && page * 9 < cardsTotal) {
          page += 1;
          pdf.addPage();
          isWhiteGaps
            ? pdf.setFillColor(255, 255, 255)
            : pdf.setFillColor(60, 60, 60);
          counterY = 0;
        }
      }
    });

    pdf.save(`${deck['name']}.pdf`);
    setSpinnerState(false);
  };

  return (
    <>
      {inDiff ? (
        <ButtonIconed
          variant="secondary"
          onClick={() => proxyCards(missingCrypt, missingLibrary)}
          title="Proxy Missing Cards to PDF ready for print"
          icon={<Printer />}
          text="Proxy Missing"
        />
      ) : (
        <Menu>
          {/* variant="secondary" */}
          <Menu.Button>
            <div
              title="Create PDF with Cards"
              className="flex items-center justify-center"
            >
              <div className="pe-2 flex">
                {spinnerState ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <Printer width="18" height="18" viewBox="0 0 18 16" />
                )}
              </div>
              PDF Proxy
            </div>
          </Menu.Button>
          <Menu.Items>
            <Menu.Item>
              <div onClick={() => proxyCards(deck.crypt, deck.library, false)}>
                Full Deck - Gray gaps
              </div>
            </Menu.Item>
            <Menu.Item>
              <div onClick={() => proxyCards(deck.crypt, deck.library, true)}>
                Full Deck - White gaps
              </div>
            </Menu.Item>
            {inventoryMode && (
              <>
                <Menu.Item>
                  <div
                    onClick={() =>
                      proxyCards(missingCrypt, missingLibrary, false)
                    }
                  >
                    Missing in Inventory - Gray gaps
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    onClick={() =>
                      proxyCards(missingCrypt, missingLibrary, true)
                    }
                  >
                    Missing in Inventory - White gaps
                  </div>
                </Menu.Item>
              </>
            )}
            <Menu.Item>
              <div
                onClick={() => {
                  setShowSelectModal(true);
                  setShowFloatingButtons(false);
                }}
              >
                Select Cards
              </div>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
      {showSelectModal && (
        <DeckProxySelectModal
          show={showSelectModal}
          handleClose={() => {
            setShowSelectModal(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          deck={deck}
          missingCrypt={missingCrypt}
          missingLibrary={missingLibrary}
          proxyCards={proxyCards}
        />
      )}
    </>
  );
};

export default DeckProxyButton;
