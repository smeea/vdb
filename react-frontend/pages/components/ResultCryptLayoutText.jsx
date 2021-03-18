import React from 'react';
import reactStringReplace from 'react-string-replace';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function ResultCryptLayoutText(props) {
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

  const Sets = Object.keys(props.card['Set']).map((k, index) => {
    return (
      <div className="d-inline-block nobr px-1" onClick={() => props.setImageSet(k.toLowerCase())} key={index}>
        {k}
        <div className="d-inline gray">:{props.card['Set'][k]}</div>
      </div>
    );
  });

  const Rulings = Object(props.card['Rulings']).map((k, index) => {
    const Refs = Object.keys(k['refs']).map((j, idx) => {
      return (
        <div className="d-inline small pl-1" key={idx}><a href={k['refs'][j]}>{j}</a></div>
      );
    });

    const text = k.text.replace(/\(D\)/g, '\u24B9').split('\n');
    const iconifiedRulingText = [];
    text.map((i, index) => {
      iconifiedRulingText.push(
        reactStringReplace(i, /\[(\w+)\]/g, (match, x) => (
          <img
            key={index}
            className="discipline-base-image-results"
            src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
            title={match}
          />
        ))
      );
    });

    return (
      <li className="rulings" key={index}>
        <div className="d-inline">{iconifiedRulingText}</div>
        {Refs}
      </li>
    );
  });

  const Artist =
    props.card['Artist'].length > 1
      ? props.card['Artist'].map((artist, index) => {
          return (
            <div className="d-inline-block nobr px-1" key={index}>
              {artist}
            </div>
          );
        })
      : props.card['Artist'];

  const text = props.card['Card Text'].replace(/\(D\)/g, '\u24B9').split('\n');
  const iconifiedText = [];
  text.map((i, index) => {
    iconifiedText.push(
      reactStringReplace(i, /\[(\w+)\]/g, (match, x) => (
        <img
          key={index}
          className="discipline-base-image-results"
          src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
          title={match}
        />
      ))
    );
  });

  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between align-items-center">
        <div className="d-flex flex-nowrap align-items-center pb-1">
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
      <hr className="mx-0" />
      <div className="py-2">
        {iconifiedText.map((i, index) => {
          return (
            <React.Fragment key={index}>
              {i.map((y, index) => {
                return <React.Fragment key={index}>{y}</React.Fragment>;
              })}
              <br />
            </React.Fragment>
          );
        })}
      </div>
      <hr className="mx-0" />
      <div className="d-flex align-items-center justify-content-between py-1">
        <ResultCryptDisciplines value={props.card['Disciplines']} />
        <ResultCryptCapacity value={props.card['Capacity']} />
      </div>
      <hr className="mx-0" />
      <div className="py-1">
        <b>Sets: </b>
        {Sets}
      </div>
      <div className="py-1">
        <b>Artist: </b>
        <div className="d-inline px-1">{Artist}</div>
      </div>
      {Rulings.length > 0 && (
        <>
          <div className="py-1">
            <b>Rulings: </b>
          </div>
          <div className="popover-rulings pb-1">
            <ul className="rulings">{Rulings}</ul>
          </div>
        </>
      )}
    </>
  );
}

export default ResultCryptLayoutText;
