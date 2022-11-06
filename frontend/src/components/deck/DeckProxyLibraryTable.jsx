import React from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import {
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  CardImage,
  ConditionalOverlayTrigger,
} from 'components';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { useApp, deckStore, usedStore, inventoryStore } from 'context';
import { getSoftMax, getHardTotal } from 'utils';

const DeckProxyLibraryTable = ({
  handleModalCardOpen,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
}) => {
  const { inventoryMode, nativeLibrary, isMobile, setShowFloatingButtons } =
    useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;

  const handleClick = (idx) => {
    handleModalCardOpen(idx);
    setShowFloatingButtons(false);
  };

  const cardRows = cards.map((card, idx) => {
    let inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
    let softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
    let hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

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
              {" '"}
              {setsAndPrecons[i].date.slice(2, 4)}
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
            </OverlayTrigger>
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
          <ConditionalOverlayTrigger
            placement={placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name ps-3 pe-2" onClick={() => handleClick(card.c)}>
              <ResultLibraryName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>

          <td className="cost" onClick={() => handleClick(card.c)}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick(card.c)}>
            <ResultLibraryClan value={card.c.Clan} />
            {card.c.Discipline && card.c.Clan && '+'}
            <ResultLibraryDisciplines value={card.c.Discipline} />
          </td>
          <td className="burn" onClick={() => handleClick(card.c)}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle
              value={nativeLibrary[card.c.Id]['Card Text']}
            />
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
                placement="left"
                overlay={
                  <Popover>
                    <Popover.Body>
                      <CardImage
                        card={card.c}
                        set={
                          proxySelected[card.c.Id] &&
                          proxySelected[card.c.Id].set
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
      <table className="deck-library-table">
        <tbody>{cardRows}</tbody>
      </table>
    </>
  );
};

export default DeckProxyLibraryTable;
