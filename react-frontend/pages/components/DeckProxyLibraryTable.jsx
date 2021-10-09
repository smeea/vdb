import React, { useContext } from 'react';
import Select from 'react-select';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import setsAndPrecons from './forms_data/setsAndPrecons.json';
import AppContext from '../../context/AppContext.js';

function DeckProxyLibraryTable(props) {
  const {
    decks,
    inventoryMode,
    inventoryLibrary,
    usedLibraryCards,
    nativeLibrary,
    lang,
    localizedLibrary,
    isMobile,
  } = useContext(AppContext);

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

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (decks && inventoryMode) {
      if (Object.keys(inventoryLibrary).includes(card.c['Id'].toString())) {
        inInventory = inventoryLibrary[card.c['Id']].q;
      } else {
        inInventory = 0;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card.c['Id']]) {
        SoftUsedDescription = Object.keys(
          usedLibraryCards.soft[card.c['Id']]
        ).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card.c['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.soft[card.c['Id']][id]}
              deckName={decks[id]['name']}
              t="s"
            />
          );
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card.c['Id']]) {
        HardUsedDescription = Object.keys(
          usedLibraryCards.hard[card.c['Id']]
        ).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.hard[card.c['Id']][id]}
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
              {" '"}
              {setsAndPrecons[i].year.slice(2, 4)}
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
            localizedLibrary &&
            localizedLibrary[lang] &&
            localizedLibrary[lang][card.c['Id']]
              ? lang
              : 'en-EN'
          }`;

    const imgFile = `${card.c['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;

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
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card.c} />}
            >
              <td className="name ps-3 pe-2" onClick={() => handleClick()}>
                <ResultLibraryName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name ps-3 pe-2" onClick={() => handleClick()}>
              <ResultLibraryName card={card.c} />
            </td>
          )}
          <td className="cost" onClick={() => handleClick()}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            {DisciplineOrClan}
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
                placement="left"
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
      <table className="deck-library-table">
        <tbody>{cardRows}</tbody>
      </table>
    </>
  );
}

export default DeckProxyLibraryTable;
