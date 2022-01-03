import React from 'react';
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
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';
import { useApp } from 'context';

function DeckProxyLibraryTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    isMobile,
  } = useApp();

  let resultTrClass;

  const cardRows = props.cards.map((card) => {
    const handleClick = () => {
      props.handleModalCardOpen(card.c);
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let inInventory = 0;
    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (decks && inventoryMode) {
      if (inventoryLibrary[card.c.Id]) {
        inInventory = inventoryLibrary[card.c.Id].q;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c.Id]) {
        Object.keys(usedLibraryCards.soft[card.c.Id]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c.Id][id]) {
            softUsedMax = usedLibraryCards.soft[card.c.Id][id];
          }
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c.Id]) {
        Object.keys(usedLibraryCards.hard[card.c.Id]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c.Id][id];
        });
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
              {" '"}
              {setsAndPrecons[i].date.slice(2, 4)}
            </div>
          ),
        });
      }
    });

    return (
      <React.Fragment key={card.c.Id}>
        <tr className={resultTrClass}>
          <td className="proxy-selector">
            <Form.Check
              className="px-1"
              type="checkbox"
              id={card.c.Id}
              name="print"
              checked={
                props.proxySelected[card.c.Id]
                  ? props.proxySelected[card.c.Id].print
                  : false
              }
              onChange={(e) => props.handleProxySelector(e)}
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
                  q={
                    props.proxySelected[card.c.Id]
                      ? props.proxySelected[card.c.Id].q
                      : 0
                  }
                  inProxy={true}
                  inInventory={inInventory}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  cardChange={props.handleProxyCounter}
                  isSelected={
                    props.proxySelected[card.c.Id] &&
                    props.proxySelected[card.c.Id].print
                  }
                />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c.Id}
                deckid={null}
                q={
                  props.proxySelected[card.c.Id]
                    ? props.proxySelected[card.c.Id].q
                    : 0
                }
                cardChange={props.handleProxyCounter}
              />
            </td>
          )}
          <ConditionalOverlayTrigger
            placement={props.placement}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name ps-3 pe-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>

          <td className="cost" onClick={() => handleClick()}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryClan value={card.c.Clan} />
            {card.c.Discipline && card.c.Clan && '+'}
            <ResultLibraryDisciplines value={card.c.Discipline} />
          </td>
          <td className="burn" onClick={() => handleClick()}>
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
                      props.proxySelected[card.c.Id] &&
                      props.proxySelected[card.c.Id].set
                    ) {
                      obj.value ===
                        props.proxySelected[card.c.Id].set.toLowerCase();
                    }
                  })}
                  onChange={props.handleSetSelector}
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
                          props.proxySelected[card.c.Id] &&
                          props.proxySelected[card.c.Id].set
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
}

export default DeckProxyLibraryTable;
