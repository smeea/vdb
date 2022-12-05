import React from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
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
  ConditionalTooltip,
  Tooltip,
} from 'components';
import { getSoftMax, getHardTotal } from 'utils';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { useApp, usedStore, inventoryStore, deckStore } from 'context';

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
  const { inventoryMode, isMobile, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const ALIGN_DISCIPLINES_THRESHOLD = isMobile ? 13 : 20;

  let maxDisciplines = 0;
  cards.map((card) => {
    const n = Object.keys(card.c.Disciplines).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

  const handleClick = (idx) => {
    handleModalCardOpen(idx);
    setShowFloatingButtons(false);
  };

  const cardRows = cards.map((card, idx) => {
    let inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
    let softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
    let hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

    const setOptions = [
      {
        value: '',
        id: card.c.Id,
        label: <div className="text-xs">Newest (default)</div>,
      },
    ];

    Object.keys(setsAndPrecons).map((i) => {
      if (card.c['Set'][i] && i !== 'POD') {
        setOptions.push({
          value: i.toLowerCase(),
          id: card.c.Id,
          label: (
            <div className="text-xs">
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
            <input
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
            <Tooltip
              placement="right"
              overlay={<UsedPopover cardid={card.c.Id} />}
            >
              <td className="quantity">
                <DeckCardQuantity
                  card={card.c}
                  deckid={null}
                  q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
                  inInventory={inInventory}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  cardChange={handleProxyCounter}
                  isSelected={
                    proxySelected[card.c.Id] && proxySelected[card.c.Id].print
                  }
                  inProxy
                />
              </td>
            </Tooltip>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                card={card.c}
                deckid={null}
                q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
                cardChange={handleProxyCounter}
              />
            </td>
          )}
          <td
            className={isMobile ? 'capacity' : 'capacity px-1'}
            onClick={() => handleClick(card.c)}
          >
            <ResultCryptCapacity value={card.c.Capacity} />
          </td>
          <td className="disciplines" onClick={() => handleClick(card.c)}>
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

          <ConditionalTooltip
            placement={placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick(card.c)}>
              <ResultCryptName card={card.c} />
            </td>
          </ConditionalTooltip>

          <td className="clan-group" onClick={() => handleClick(card.c)}>
            <div>
              <ResultClanImage value={card.c.Clan} />
            </div>
            <div className="flex text-xs justify-end">
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
              <Tooltip
                placement="right"
                overlay={
                  <div className="p-1">
                    <CardImage
                      card={card.c}
                      set={
                        proxySelected[card.c.Id]
                          ? proxySelected[card.c.Id].set
                          : null
                      }
                    />
                  </div>
                }
              >
                <td className="proxy-set-image">
                  <div>
                    <EyeFill />
                  </div>
                </td>
              </Tooltip>
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
