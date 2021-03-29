import React from 'react';
import { ListGroup } from 'react-bootstrap';
import reactStringReplace from 'react-string-replace';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function ResultCryptPopover(props) {
  const imgSrc = `${process.env.ROOT_URL}images/cards/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${props.card['Adv'] && 'adv'}.jpg`;

  const cardImage = (
    <img
      className={props.fullWidth ? 'card-popover full-width' : 'card-popover'}
      src={imgSrc}
      alt={props.card['Name']}
      onClick={props.handleClose}
    />
  );

  const Sets = Object.keys(props.card['Set']).map((k, index) => {
    return (
      <span key={index} className="d-inline-block nobr ml-2">
        {k}:{props.card['Set'][k]}
      </span>
    );
  });

  const Rulings = Object(props.card['Rulings']).map((k, index) => {
    return (
      <ListGroup.Item className="rulings p-2" key={index}>
        {k.text}
      </ListGroup.Item>
    );
  });

  const icons = {
    aus: 'auspex',
    abo: 'abombwe',
    ani: 'animalism',
    cel: 'celerity',
    chi: 'chimerstry',
    dai: 'daimoinon',
    dem: 'dementation',
    dom: 'dominate',
    for: 'fortitude',
    mel: 'melpominee',
    myt: 'mytherceria',
    nec: 'necromancy',
    obe: 'obeah',
    obf: 'obfuscate',
    obt: 'obtenebration',
    pot: 'potence',
    pre: 'presence',
    pro: 'protean',
    ser: 'serpentis',
    san: 'sanguinus',
    spi: 'spiritus',
    tem: 'temporis',
    thn: 'thanatosis',
    tha: 'thaumaturgy',
    qui: 'quietus',
    val: 'valeren',
    vic: 'vicissitude',
    vis: 'visceratika',
    AUS: 'auspexsup',
    ABO: 'abombwesup',
    ANI: 'animalismsup',
    CEL: 'celeritysup',
    CHI: 'chimerstrysup',
    DAI: 'daimoinonsup',
    DEM: 'dementationsup',
    DOM: 'dominatesup',
    FOR: 'fortitudesup',
    MEL: 'melpomineesup',
    MYT: 'mytherceriasup',
    NEC: 'necromancysup',
    OBE: 'obeahsup',
    OBF: 'obfuscatesup',
    OBT: 'obtenebrationsup',
    POT: 'potencesup',
    PRE: 'presencesup',
    PRO: 'proteansup',
    SER: 'serpentissup',
    SAN: 'sanguinussup',
    SPI: 'spiritussup',
    TEM: 'temporissup',
    THN: 'thanatosissup',
    THA: 'thaumaturgysup',
    QUI: 'quietussup',
    VAL: 'valerensup',
    VIC: 'vicissitudesup',
    VIS: 'visceratikasup',
    '1CONVICTION': 'con1',
    '2CONVICTION': 'con2',
    FLIGHT: 'flight',
    MERGED: 'merged',
  };

  const text = props.card['Card Text'].replace(/\(D\)/g, '\u24B9').split('\n');
  const newText = [];
  text.map((i, index) => {
    newText.push(
      reactStringReplace(i, /\[(\w+)\]/g, (match, x) => (
        <img
          className="discipline-base-image-results"
          src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
          title={match}
        />
      ))
    );
  });

  return (
    <>
      {!props.showImage ? (
        <div className="py-1">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <div className="d-flex flex-nowrap align-items-center">
              <div>
                <ResultCryptClan value={props.card['Clan']} />
              </div>
              <div className="pl-2">
                <b>{props.card['Name']}</b>
                {props.card['Banned'] && (
                  <span className="pl-1">
                    <Hammer />
                  </span>
                )}
                {props.card['Adv'] && (
                  <span className="pl-1">
                    <img
                      className="advanced-image-results"
                      src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                      title="Advanced"
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="pl-2">
              <ResultCryptGroup value={props.card['Group']} />
            </div>
          </div>
          <hr />
          {newText.map((i, index) => {
            return (
              <React.Fragment key={index}>
                {i.map((y, index) => {
                  return <React.Fragment key={index}>{y}</React.Fragment>;
                })}
                <br />
              </React.Fragment>
            );
          })}
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <ResultCryptDisciplines value={props.card['Disciplines']} />
            <div className="popover-sets px-1">{Sets}</div>
            <ResultCryptCapacity value={props.card['Capacity']} />
          </div>
          {Rulings.length > 0 && (
            <div className="popover-rulings pt-2">
              <ListGroup>{Rulings}</ListGroup>
            </div>
          )}
        </div>
      ) : (
        cardImage
      )}
    </>
  );
}

export default ResultCryptPopover;
