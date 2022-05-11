import React from 'react';
import Select from 'react-select';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import {
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  DeckCryptDisciplines,
  ResultCryptDisciplines,
  ResultCryptCapacity,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  CardImage,
  ConditionalOverlayTrigger,
} from 'components';
import { getSoftMax, getHardTotal } from 'utils';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { useApp } from 'context';

const DeckProxyCryptTable = ({
  handleModalCardOpen,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
}) => {
  const { decks, inventoryMode, inventoryCrypt, usedCryptCards, isMobile } =
    useApp();

  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 20;

  let maxDisciplines = 0;
  cards.map((card) => {
    const n = Object.keys(card.c.Disciplines).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  const cardRows = cards.map((card, idx) => {
    const handleClick = () => {
      handleModalCardOpen(card.c);
      setShowFloatingButtons(false);
    };

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      if (inventoryCrypt[card.c.Id]) {
        inInventory = inventoryCrypt[card.c.Id].q;
      }

      if (usedCryptCards) {
        softUsedMax = getSoftMax(usedCryptCards.soft[card.Id]);
        hardUsedTotal = getHardTotal(usedCryptCards.hard[card.Id]);
      }
    }

    const setOptions = [
      {
        value: '',
        id: card.c.Id,
        label: <div className="small">Newest (default)</div>,
      },
    ];

    Object.keys(setsAndPrecons).map((i) => {
      if (card.c['Set'][i] && i !== 'POD') {
        setOptions.push({
          value: i.toLowerCase(),
          id: card.c.Id,
          label: (
            <div className="small">
              {setsAndPrecons[i].name}
              {setsAndPrecons[i].date
                ? ` '${setsAndPrecons[i].date.slice(2, 4)}`
                : null}
            </div>
          ),
        });
      }
    });

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          <td className="proxy-selector">
            <Form.Check
              className="px-1"
              type="checkbox"
              id={card.c.Id}
              name="print"
              checked={
                proxySelected[card.c.Id]
                  ? proxySelected[card.c.Id].print
                  : false
              }
              onChange={(e) => handleProxySelector(e)}
            />
          </td>
          {inventoryMode && decks ? (
            <OverlayTrigger
              placement="right"
              overlay={<UsedPopover cardid={card.c.Id} />}
            >
              <td className="quantity">
                <DeckCardQuantity
                  cardid={card.c.Id}
                  deckid={null}
                  q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
                  inProxy={true}
                  inInventory={inInventory}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  cardChange={handleProxyCounter}
                  isSelected={
                    proxySelected[card.c.Id] && proxySelected[card.c.Id].print
                  }
                />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c.Id}
                deckid={null}
                q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
                cardChange={handleProxyCounter}
              />
            </td>
          )}
          <td
            className={isMobile ? 'capacity' : 'capacity px-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c.Capacity} />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            {disciplinesSet.length < ALIGN_DISCIPLINES_THRESHOLD ? (
              <DeckCryptDisciplines
                value={card.c.Disciplines}
                disciplinesSet={disciplinesSet}
                keyDisciplines={keyDisciplines}
                nonKeyDisciplines={nonKeyDisciplines}
              />
            ) : (
              <ResultCryptDisciplines
                value={card.c.Disciplines}
                maxDisciplines={maxDisciplines}
              />
            )}
          </td>

          <ConditionalOverlayTrigger
            placement={placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>

          <td className="clan-group" onClick={() => handleClick()}>
            <div>
              <ResultClanImage value={card.c.Clan} />
            </div>
            <div className="d-flex small justify-content-end">
              <b>
                <ResultCryptTitle value={card.c.Title} />
              </b>
              <ResultCryptGroup value={card.c.Group} />
            </div>
          </td>
          {!isMobile && (
            <>
              <td className="proxy-set">
                <Select
                  classNamePrefix="react-select"
                  options={setOptions}
                  isSearchable={false}
                  name="set"
                  placeholder="Set"
                  value={setOptions.find((obj) => {
                    if (
                      proxySelected[card.c.Id] &&
                      proxySelected[card.c.Id].set
                    ) {
                      obj.value === proxySelected[card.c.Id].set.toLowerCase();
                    }
                  })}
                  onChange={handleSetSelector}
                />
              </td>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Popover>
                    <Popover.Body>
                      <CardImage
                        card={card.c}
                        set={
                          proxySelected[card.c.Id]
                            ? proxySelected[card.c.Id].set
                            : null
                        }
                      />
                    </Popover.Body>
                  </Popover>
                }
              >
                <td className="proxy-set-image">
                  <div>
                    <EyeFill />
                  </div>
                </td>
              </OverlayTrigger>
            </>
          )}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-crypt-table">
        <tbody>{cardRows}</tbody>
      </table>
    </>
  );
};

export default DeckProxyCryptTable;
