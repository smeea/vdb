import React, { useContext } from 'react';
import Select from 'react-select';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import DeckCryptDisciplines from './DeckCryptDisciplines.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptTitle from './ResultCryptTitle.jsx';
import setsAndPrecons from './forms_data/setsAndPrecons.json';
import AppContext from '../../context/AppContext';

function DeckProxyCryptTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryCrypt,
    usedCryptCards,
    lang,
    localizedCrypt,
    isMobile,
  } = useContext(AppContext);

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

    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (decks && inventoryMode) {
      if (Object.keys(inventoryCrypt).includes(card.c['Id'].toString())) {
        inInventory = inventoryCrypt[card.c['Id']].q;
      } else {
        inInventory = 0;
      }

      if (usedCryptCards && usedCryptCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          usedCryptCards.soft[card.c['Id']]
        ).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card.c['Id']][id]) {
            softUsedMax = usedCryptCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={id}
              q={usedCryptCards.soft[card.c['Id']][id]}
              deckName={decks[id]['name']}
              t="s"
            />
          );
        });
      }

      if (usedCryptCards && usedCryptCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          usedCryptCards.hard[card.c['Id']]
        ).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={id}
              q={usedCryptCards.hard[card.c['Id']][id]}
              deckName={decks[id]['name']}
              t="h"
            />
          );
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
              {setsAndPrecons[i].year
                ? ` '${setsAndPrecons[i].year.slice(2, 4)}`
                : null}
            </div>
          ),
        });
      }
    });

    const imgPath =
      props.proxySelected[card.c['Id']] && props.proxySelected[card.c['Id']].set
        ? `${process.env.ROOT_URL}images/cards/set/${
            props.proxySelected[card.c['Id']].set
          }`
        : `${process.env.ROOT_URL}images/cards/${
            localizedCrypt &&
            localizedCrypt[lang] &&
            localizedCrypt[lang][card.c['Id']]
              ? lang
              : 'en-EN'
          }`;

    const imgFile = `${card.c['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${
      card.c['Adv'][0] ? 'adv' : ''
    }.jpg`;

    const CardImage = (
      <img
        className="card-popover"
        src={`${imgPath}/${imgFile}`}
        alt={card.c['Name']}
        onClick={props.handleClose}
      />
    );

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
              overlay={
                <UsedPopover
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  inInventory={inInventory}
                  SoftUsedDescription={SoftUsedDescription}
                  HardUsedDescription={HardUsedDescription}
                />
              }
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
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card.c} />}
            >
              <td className="name px-2" onClick={() => handleClick()}>
                <ResultCryptName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          )}
          <td className="clan-group" onClick={() => handleClick()}>
            <div>
              <ResultCryptClan value={card.c['Clan']} />
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
                    <Popover.Body>{CardImage}</Popover.Body>
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
