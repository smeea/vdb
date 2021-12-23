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
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';
import { useApp } from 'context';

function DeckProxyCryptTable(props) {
  const { decks, inventoryMode, inventoryCrypt, usedCryptCards, isMobile } =
    useApp();

  let resultTrClass;

  let maxDisciplines = 0;
  props.cards.map((card) => {
    const n = Object.keys(card.c['Disciplines']).length;
    if (maxDisciplines < n) {
      maxDisciplines = n;
    }
  });

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
      if (inventoryCrypt[card.c['Id']]) {
        inInventory = inventoryCrypt[card.c['Id']].q;
      }

      if (usedCryptCards && usedCryptCards.soft[card.c['Id']]) {
        Object.keys(usedCryptCards.soft[card.c['Id']]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card.c['Id']][id]) {
            softUsedMax = usedCryptCards.soft[card.c['Id']][id];
          }
        });
      }

      if (usedCryptCards && usedCryptCards.hard[card.c['Id']]) {
        Object.keys(usedCryptCards.hard[card.c['Id']]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card.c['Id']][id];
        });
      }
    }

    const setOptions = [
      {
        value: '',
        id: card.c['Id'],
        label: <div className="small">Newest (default)</div>,
      },
    ];

    Object.keys(setsAndPrecons).map((i) => {
      if (card.c['Set'][i] && i !== 'POD') {
        setOptions.push({
          value: i.toLowerCase(),
          id: card.c['Id'],
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
      <React.Fragment key={card.c['Id']}>
        <tr className={resultTrClass}>
          <td className="proxy-selector">
            <Form.Check
              className="px-1"
              type="checkbox"
              id={card.c['Id']}
              name="print"
              checked={
                props.proxySelected[card.c['Id']]
                  ? props.proxySelected[card.c['Id']].print
                  : false
              }
              onChange={(e) => props.handleProxySelector(e)}
            />
          </td>
          {inventoryMode && decks ? (
            <OverlayTrigger
              placement="right"
              overlay={<UsedPopover cardid={card.c['Id']} />}
            >
              <td className="quantity">
                <DeckCardQuantity
                  cardid={card.c['Id']}
                  deckid={null}
                  q={
                    props.proxySelected[card.c['Id']]
                      ? props.proxySelected[card.c['Id']].q
                      : 0
                  }
                  inProxy={true}
                  inInventory={inInventory}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  cardChange={props.handleProxyCounter}
                  isSelected={
                    props.proxySelected[card.c['Id']] &&
                    props.proxySelected[card.c['Id']].print
                  }
                />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c['Id']}
                deckid={null}
                q={
                  props.proxySelected[card.c['Id']]
                    ? props.proxySelected[card.c['Id']].q
                    : 0
                }
                cardChange={props.handleProxyCounter}
              />
            </td>
          )}
          <td
            className={isMobile ? 'capacity' : 'capacity px-1'}
            onClick={() => handleClick()}
          >
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          <td className="disciplines" onClick={() => handleClick()}>
            {props.disciplinesSet.length < 13 ? (
              <DeckCryptDisciplines
                value={card.c['Disciplines']}
                disciplinesSet={props.disciplinesSet}
                keyDisciplines={props.keyDisciplines}
                nonKeyDisciplines={props.nonKeyDisciplines}
              />
            ) : (
              <ResultCryptDisciplines
                value={card.c['Disciplines']}
                maxDisciplines={maxDisciplines}
              />
            )}
          </td>

          <ConditionalOverlayTrigger
            placement={props.placement ? props.placement : 'right'}
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          </ConditionalOverlayTrigger>

          <td className="clan-group" onClick={() => handleClick()}>
            <div>
              <ResultClanImage value={card.c['Clan']} />
            </div>
            <div className="d-flex small justify-content-end">
              <b>
                <ResultCryptTitle value={card.c['Title']} />
              </b>
              <ResultCryptGroup value={card.c['Group']} />
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
                      props.proxySelected[card.c['Id']] &&
                      props.proxySelected[card.c['Id']].set
                    ) {
                      obj.value ===
                        props.proxySelected[card.c['Id']].set.toLowerCase();
                    }
                  })}
                  onChange={props.handleSetSelector}
                />
              </td>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Popover>
                    <Popover.Body>
                      <CardImage
                        card={card.c}
                        set={props.proxySelected[card.c['Id']].set}
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
}

export default DeckProxyCryptTable;
