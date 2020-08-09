import React, { useState } from 'react';
import Select from 'react-select';

import abombwe from './../../assets/images/disciplines/abombwe.gif';
import animalism from './../../assets/images/disciplines/animalism.gif';
import auspex from './../../assets/images/disciplines/auspex.gif';
import celerity from './../../assets/images/disciplines/celerity.gif';
import chimerstry from './../../assets/images/disciplines/chimerstry.gif';
import daimoinon from './../../assets/images/disciplines/daimoinon.gif';
import dominate from './../../assets/images/disciplines/dominate.gif';
import dementation from './../../assets/images/disciplines/dementation.gif';
import fortitude from './../../assets/images/disciplines/fortitude.gif';
import melpominee from './../../assets/images/disciplines/melpominee.gif';
import mytherceria from './../../assets/images/disciplines/mytherceria.gif';
import necromancy from './../../assets/images/disciplines/necromancy.gif';
import obeah from './../../assets/images/disciplines/obeah.gif';
import obfuscate from './../../assets/images/disciplines/obfuscate.gif';
import obtenebration from './../../assets/images/disciplines/obtenebration.gif';
import potence from './../../assets/images/disciplines/potence.gif';
import presence from './../../assets/images/disciplines/presence.gif';
import protean from './../../assets/images/disciplines/protean.gif';
import quietus from './../../assets/images/disciplines/quietus.gif';
import sanguinus from './../../assets/images/disciplines/sanguinus.gif';
import serpentis from './../../assets/images/disciplines/serpentis.gif';
import spiritus from './../../assets/images/disciplines/spiritus.gif';
import temporis from './../../assets/images/disciplines/temporis.gif';
import thanatosis from './../../assets/images/disciplines/thanatosis.gif';
import thaumaturgy from './../../assets/images/disciplines/thaumaturgy.gif';
import valeren from './../../assets/images/disciplines/valeren.gif';
import vicissitude from './../../assets/images/disciplines/vicissitude.gif';
import visceratika from './../../assets/images/disciplines/visceratika.gif';
import abombwesup from './../../assets/images/disciplines/abombwesup.gif';
import animalismsup from './../../assets/images/disciplines/animalismsup.gif';
import auspexsup from './../../assets/images/disciplines/auspexsup.gif';
import celeritysup from './../../assets/images/disciplines/celeritysup.gif';
import chimerstrysup from './../../assets/images/disciplines/chimerstrysup.gif';
import daimoinonsup from './../../assets/images/disciplines/daimoinonsup.gif';
import dominatesup from './../../assets/images/disciplines/dominatesup.gif';
import dementationsup from './../../assets/images/disciplines/dementationsup.gif';
import fortitudesup from './../../assets/images/disciplines/fortitudesup.gif';
import melpomineesup from './../../assets/images/disciplines/melpomineesup.gif';
import mytherceriasup from './../../assets/images/disciplines/mytherceriasup.gif';
import necromancysup from './../../assets/images/disciplines/necromancysup.gif';
import obeahsup from './../../assets/images/disciplines/obeahsup.gif';
import obfuscatesup from './../../assets/images/disciplines/obfuscatesup.gif';
import obtenebrationsup from './../../assets/images/disciplines/obtenebrationsup.gif';
import potencesup from './../../assets/images/disciplines/potencesup.gif';
import presencesup from './../../assets/images/disciplines/presencesup.gif';
import proteansup from './../../assets/images/disciplines/proteansup.gif';
import quietussup from './../../assets/images/disciplines/quietussup.gif';
import sanguinussup from './../../assets/images/disciplines/sanguinussup.gif';
import serpentissup from './../../assets/images/disciplines/serpentissup.gif';
import spiritussup from './../../assets/images/disciplines/spiritussup.gif';
import temporissup from './../../assets/images/disciplines/temporissup.gif';
import thanatosissup from './../../assets/images/disciplines/thanatosissup.gif';
import thaumaturgysup from './../../assets/images/disciplines/thaumaturgysup.gif';
import valerensup from './../../assets/images/disciplines/valerensup.gif';
import vicissitudesup from './../../assets/images/disciplines/vicissitudesup.gif';
import visceratikasup from './../../assets/images/disciplines/visceratikasup.gif';
import defense from '././../../assets/images/disciplines/defense.gif';
import innocence from './../../assets/images/disciplines/innocence.gif';
import justice from './../../assets/images/disciplines/justice.gif';
import martyrdom from './../../assets/images/disciplines/martyrdom.gif';
import redemption from './../../assets/images/disciplines/redemption.gif';
import vengeance from './../../assets/images/disciplines/vengeance.gif';
import vision from './../../assets/images/disciplines/vision.gif';

import abomination from './../../assets/images/clans/abomination.gif';
import ahrimane from './../../assets/images/clans/ahrimane.gif';
import akunanse from './../../assets/images/clans/akunanse.gif';
import assamite from './../../assets/images/clans/assamite.gif';
import baali from './../../assets/images/clans/baali.gif';
import bloodbrother from './../../assets/images/clans/bloodbrother.gif';
import brujah from './../../assets/images/clans/brujah.gif';
import brujahantitribu from './../../assets/images/clans/brujahantitribu.gif';
import caitiff from './../../assets/images/clans/caitiff.gif';
import daughterofcacophony from './../../assets/images/clans/daughterofcacophony.gif';
import followerofset from './../../assets/images/clans/followerofset.gif';
import gangrel from './../../assets/images/clans/gangrel.gif';
import gangrelantitribu from './../../assets/images/clans/gangrelantitribu.gif';
import gargoyle from './../../assets/images/clans/gargoyle.gif';
import giovanni from './../../assets/images/clans/giovanni.gif';
import guruhi from './../../assets/images/clans/guruhi.gif';
import harbingerofskulls from './../../assets/images/clans/harbingerofskulls.gif';
import ishtarri from './../../assets/images/clans/ishtarri.gif';
import kiasyd from './../../assets/images/clans/kiasyd.gif';
import lasombra from './../../assets/images/clans/lasombra.gif';
import malkavian from './../../assets/images/clans/malkavian.gif';
import malkavianantitribu from './../../assets/images/clans/malkavianantitribu.gif';
import nagaraja from './../../assets/images/clans/nagaraja.gif';
import nosferatu from './../../assets/images/clans/nosferatu.gif';
import nosferatuantitribu from './../../assets/images/clans/nosferatuantitribu.gif';
import osebo from './../../assets/images/clans/osebo.gif';
import pander from './../../assets/images/clans/pander.gif';
import ravnos from './../../assets/images/clans/ravnos.gif';
import salubri from './../../assets/images/clans/salubri.gif';
import salubriantitribu from './../../assets/images/clans/salubriantitribu.gif';
import samedi from './../../assets/images/clans/samedi.gif';
import toreador from './../../assets/images/clans/toreador.gif';
import toreadorantitribu from './../../assets/images/clans/toreadorantitribu.gif';
import tremere from './../../assets/images/clans/tremere.gif';
import tremereantitribu from './../../assets/images/clans/tremereantitribu.gif';
import truebrujah from './../../assets/images/clans/truebrujah.gif';
import tzimisce from './../../assets/images/clans/tzimisce.gif';
import ventrue from './../../assets/images/clans/ventrue.gif';
import ventrueantitribu from './../../assets/images/clans/ventrueantitribu.gif';
import avenger from './../../assets/images/clans/avenger.gif';
import defender from './../../assets/images/clans/defender.gif';
import innocent from './../../assets/images/clans/innocent.gif';
import judge from './../../assets/images/clans/judge.gif';
import martyr from './../../assets/images/clans/martyr.gif';
import redeemer from './../../assets/images/clans/redeemer.gif';
import visionary from './../../assets/images/clans/visionary.gif';

function SearchCryptFormButtons(props) {
  return (
    <div className='pr-1'>
      <button className='btn btn-outline-primary' type='submit'>
        <svg width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z' />
        </svg>
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={props.handleClearFormButton}>
        <svg width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z' />
          <path d='M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z' />
        </svg>
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={props.handleClearResultButton}>
        <svg width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z' />
          <path d='M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z' />
        </svg>
      </button>
    </div>
  );
}

function SearchCryptFormText(props) {
  return (
    <div className='col-8'>
      <input
        placeholder='Card Name / Text'
        type='text'
        name='text'
        value={props.value}
        onChange={props.onChange}/>
    </div>
  );
}

function SearchCryptFormDisciplines(props) {
  const disciplines = [
    ['Abombwe', abombwe, abombwesup],
    ['Animalism', animalism, animalismsup],
    ['Auspex', auspex, auspexsup],
    ['Celerity', celerity, celeritysup],
    ['Chimerstry', chimerstry, chimerstrysup],
    ['Daimoinon', daimoinon, daimoinonsup],
    ['Dominate', dominate, dominatesup],
    ['Dementation', dementation, dementationsup],
    ['Fortitude', fortitude, fortitudesup],
    ['Melpominee', melpominee, melpomineesup],
    ['Mytherceria', mytherceria, mytherceriasup],
    ['Necromancy', necromancy, necromancysup],
    ['Obeah', obeah, obeahsup],
    ['Obfuscate', obfuscate, obfuscatesup],
    ['Obtenebration', obtenebration, obtenebrationsup],
    ['Potence', potence, potencesup],
    ['Presence', presence, presencesup],
    ['Protean', protean, proteansup],
    ['Quietus', quietus, quietussup],
    ['Sanguinus', sanguinus, sanguinussup],
    ['Serpentis', serpentis, serpentissup],
    ['Spiritus', spiritus, spiritussup],
    ['Temporis', temporis, temporissup],
    ['Thanatosis', thanatosis, thanatosissup],
    ['Thaumaturgy', thaumaturgy, thaumaturgysup],
    ['Valeren', valeren, valerensup],
    ['Vicissitude', vicissitude, vicissitudesup],
    ['Visceratika', visceratika, visceratikasup],
  ];

  const disciplinesforms = disciplines.map((i, index) => {
    let disciplineState = 'discipline-container state' + props.value[i[0]];
    return (
      <div key={index} className={disciplineState}>
        <label className='discipline-container d-flex justify-content-center align-items-center' htmlFor={i[0]}>
          <input className='d-none' type='button' name='disciplines' id={i[0]} onClick={e => props.onChange(e)} />
          <img className='discipline-base-image-forms' src={i[1]} />
          <img className='discipline-superior-image-forms' src={i[2]} />
        </label>
      </div>
    );
  });

  return (
    <div className='form-row pt-2'>
      <div className='input-group justify-content-start'>
        {disciplinesforms}
      </div>
    </div>
  );
}


function SearchCryptFormVirtues(props) {
  const virtues = [
    ['Defense', defense],
    ['Innocence', innocence],
    ['Judgment', justice],
    ['Martyrdom', martyrdom],
    ['Redemption', redemption],
    ['Vengeance', vengeance],
    ['Vision', vision],
  ];

  const virtuesforms = virtues.map((i, index) => {
    let virtueState = 'virtue-container mb-2 state' + props.value[i[0]];
    return (
      <div key={index} className={virtueState}>
        <label className='virtue-container d-flex justify-content-center align-items-center' htmlFor={i[0]}>
          <input className='d-none' type='button' name='virtues' id={i[0]} onClick={e => props.onChange(e)} />
          <img className='virtue-image' src={i[1]} />
        </label>
      </div>
    );
  });

  return (
    <div className='form-row'>
      <div className='input-group'>
        {virtuesforms}
      </div>
    </div>
  );
}


function SearchCryptFormCapacity(props) {
  const capacity = ['ANY', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const capacityforms = capacity.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const capacitymoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];

  const capacitymorelessforms = capacitymoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Capacity:
        </label>
      </div>
      <div className='form-group col-9'>
        <div className='input-group'>
          <select className='custom-select' name='capacitymoreless' value={props.moreless} onChange={props.onMorelessChange}>
            {capacitymorelessforms}
          </select>
          <select className='custom-select' name='capacity' value={props.value} onChange={props.onValueChange} >
            {capacityforms}
          </select>
        </div>
      </div>
    </div>
  );
}

function SearchCryptFormClan(props) {
  const clanicons = {
    'Abomination': abomination,
    'Ahrimane': ahrimane,
    'Akunanse': akunanse,
    'Assamite': assamite,
    'Baali': baali,
    'Blood Brother': bloodbrother,
    'Brujah': brujah,
    'Brujah antitribu': brujahantitribu,
    'Caitiff': caitiff,
    'Daughter of Cacophony': daughterofcacophony,
    'Follower of Set': followerofset,
    'Gangrel': gangrel,
    'Gangrel antitribu': gangrelantitribu,
    'Gargoyle': gargoyle,
    'Giovanni': giovanni,
    'Guruhi': guruhi,
    'Harbinger of Skulls': harbingerofskulls,
    'Ishtarri': ishtarri,
    'Kiasyd': kiasyd,
    'Lasombra': lasombra,
    'Malkavian': malkavian,
    'Malkavian antitribu': malkavianantitribu,
    'Nagaraja': nagaraja,
    'Nosferatu': nosferatu,
    'Nosferatu antitribu': nosferatuantitribu,
    'Osebo': osebo,
    'Pander': pander,
    'Ravnos': ravnos,
    'Salubri': salubri,
    'Salubri antitribu': salubriantitribu,
    'Samedi': samedi,
    'Toreador': toreador,
    'Toreador antitribu': toreadorantitribu,
    'Tremere': tremere,
    'Tremere antitribu': tremereantitribu,
    'True Brujah': truebrujah,
    'Tzimisce': tzimisce,
    'Ventrue': ventrue,
    'Ventrue antitribu': ventrueantitribu,
    'Avenger': avenger,
    'Defender': defender,
    'Innocent': innocent,
    'Judge': judge,
    'Martyr': martyr,
    'Redeemer': redeemer,
    'Visionary': visionary,
  };

  const clanOptions = [{
    value: 'ANY',
    label:
    <React.Fragment>
      <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
      </span>
      ANY
    </React.Fragment>
  }];

  Object.keys(clanicons).map((key, index) => {
    clanOptions.push({
      value: key,
      name: 'clan',
      label:
      <React.Fragment>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={clanicons[key]} className='discipline-base-image-results' />
        </span>
        {key}
      </React.Fragment>
    });
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Clan:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select
          options={clanOptions}
          name='clan'
          value={clanOptions.find(obj => obj.value === props.value)}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}


function SearchCryptFormSect(props) {
  const sects = [
    'ANY',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ];

  const sectforms = sects.map((i, index) => {
    return(
      <option key={index} value={i}>{i}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Sect:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='sect' value={props.value} onChange={props.onChange}>
          {sectforms}
        </select>
      </div>
    </div>
  );
}


function SearchCryptFormVotes(props) {
  const votes = [
    ['ANY', 'ANY'],
    [1, '1+'],
    [2, '2+'],
    [3, '3+'],
    [4, '4+'],
  ];

  const votesforms = votes.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Votes:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='votes' value={props.value} onChange={props.onChange}>
          {votesforms}
        </select>
      </div>
    </div>
  );
}


function SearchCryptFormTitles(props) {
  const titlesLeft = [
    ['primogen', 'Primogen'],
    ['prince', 'Prince'],
    ['justicar', 'Justicar'],
    ['inner circle', 'Inner Circle'],
    ['baron', 'Baron'],
    ['1 vote', '1 vote (Independent)'],
    ['2 votes', '2 votes (Independent)'],
  ];

  const titlesRight = [
    ['bishop', 'Bishop'],
    ['archbishop', 'Archbishop'],
    ['priscus', 'Priscus'],
    ['cardinal', 'Cardinal'],
    ['regent', 'Regent'],
    ['magaji', 'Magaji'],
  ];

  const titlesLeftforms = titlesLeft.map((i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input name='titles' id={i[0]} className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  const titlesRightforms = titlesRight.map((i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input name='titles' id={i[0]} className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <React.Fragment>
      <h6>Title:</h6>
      <div className='form-row'>
        <div className='form-group col-7'>
          {titlesLeftforms}
        </div>
        <div className='form-group col-5'>
          {titlesRightforms}
        </div>
      </div>
    </React.Fragment>
  );
}


function SearchCryptFormGroup(props) {
  const groups = [1, 2, 3, 4, 5, 6];

  const groupforms = groups.map( (i, index) => {
    return (
      <div key={index} className='ml-2 custom-control custom-checkbox'>
        <input id={i} name='group' className='mr-1 custom-control-input' type='checkbox' checked={props.value[i]} onChange={e => props.onChange(e)} />
        <label htmlFor={i} className='mr-0 custom-control-label'>
          {i}
        </label>
      </div>
    );
  });

  return (
    <div className='form-row justify-content-between'>
      <div className='col-2'>
        <h6>Group:</h6>
      </div>
      {groupforms}
    </div>
  );
}


function SearchCryptFormTraits(props) {
  const traitsLeft = [
    ['1 intercept', '+1 intercept'],
    ['1 stealth', '+1 stealth'],
    ['1 bleed', '+1 bleed'],
    ['2 bleed', '+2 bleed'],
    ['1 strength', '+1 strength'],
    ['2 strength', '+2 strength'],
    ['additional strike', 'Additional Strike'],
    ['optional maneuver', 'Maneuver'],
    ['optional press', 'Press'],
  ];

  const traitsRight = [
    ['prevent', 'Prevent'],
    ['aggravated', 'Aggravated'],
    ['enter combat', 'Enter combat'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['infernal', 'Infernal'],
    ['red list', 'Red List'],
    ['flight', 'Flight'],
  ];

  const traitsLeftforms = traitsLeft.map( (i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input id={i[0]} name='traits' className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map( (i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input id={i[0]} name='traits' className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <div className='pt-2'>
      <h6>Traits:</h6>
      <div className='form-row'>
        <div className='form-group col-7'>
          {traitsLeftforms}
        </div>
        <div className='form-group col-5'>
          {traitsRightforms}
        </div>
      </div>
    </div>
  );
}

function SearchCryptFormSet(props) {
  const sets = [
    ['ANY', 'ANY'],
    ['25th', '25th Anniversary - 2019'],
    ['FB', 'First Blood - 2019'],
    ['SP', 'Sabbat Preconstructed - 2019'],
    ['Anthology', 'Anthology - 2018'],
    ['LK', 'Lost Kindred - 2018'],
    ['AU', 'Anarchs Unbound - 2016'],
    ['TU', 'The Unaligned - 2014'],
    ['DM', 'Danse Macabre - 2013'],
    ['HttB', 'Heirs to the Blood - 2010'],
    ['EK', 'Ebony Kingdom - 2009'],
    ['BSC', 'Blood Shadowed Court - 2008'],
    ['KoT', 'Keepers of Tradition - 2008'],
    ['TR', 'Twilight Rebellion - 2008'],
    ['SoC', 'Sword of Caine - 2007'],
    ['LotN', 'Lords of the Night - 2007'],
    ['NoR', 'Nights of Reckoning - 2006'],
    ['Third', 'Third Edition - 2006'],
    ['KMW', 'Kindred Most Wanted - 2005'],
    ['LoB', 'Legacies of Blood - 2005'],
    ['Gehenna', 'Gehenna - 2004'],
    ['Tenth', '10th Anniversary - 2004'],
    ['Anarchs', 'Anarchs - 2003'],
    ['BH', 'Black Hand - 2003'],
    ['CE', 'Camarilla Edition - 2002'],
    ['BL', 'Bloodlines - 2001'],
    ['FN', 'Final Nights - 2001'],
    ['SW', 'Sabbat War - 2000'],
    ['AH', 'Ancient Hearts - 1996'],
    ['DS', 'Dark Sovereigns - 1995'],
    ['VTES', 'V:TES - 1995'],
    ['Jyhad', 'Jyhad - 1994'],
    ['Promo', 'Promo'],
  ];

  const setforms = sets.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Set:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='set' value={props.value} onChange={props.onChange}>
          {setforms}
        </select>
      </div>
    </div>
  );
}

function SearchCryptForm(props) {
  const [state, setState] = useState({
    text: '',
    disciplines: {
      Abombwe: 0,
      Animalism: 0,
      Auspex: 0,
      Celerity: 0,
      Chimerstry: 0,
      Daimoinon: 0,
      Dementation: 0,
      Dominate: 0,
      Fortitude: 0,
      Melpominee: 0,
      Mytherceria: 0,
      Necromancy: 0,
      Obeah: 0,
      Obfuscate: 0,
      Obtenebration: 0,
      Potence: 0,
      Presence: 0,
      Protean: 0,
      Quietus: 0,
      Sanguinus: 0,
      Serpentis: 0,
      Spiritus: 0,
      Temporis: 0,
      Thanatosis: 0,
      Thaumaturgy: 0,
      Valeren: 0,
      Vicissitude: 0,
      Visceratika: 0,
    },
    virtues: {
      Defense: 0,
      Innocence: 0,
      Judgment: 0,
      Martyrdom: 0,
      Redemption: 0,
      Vengeance: 0,
      Vision: 0,
    },
    capacity: 'ANY',
    capacitymoreless: 'le',
    clan: 'ANY',
    sect: 'ANY',
    votes: 'ANY',
    titles: {
      primogen: false,
      prince: false,
      justicar: false,
      innercircle: false,
      baron: false,
      '1 votes': false,
      '2 votes': false,
      bishop: false,
      archbishop: false,
      priscus: false,
      cardinal: false,
      regent: false,
      magaji: false,
    },
    group: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
    traits: {
      '1 intercept': false,
      '1 stealth': false,
      '1 bleed': false,
      '2 bleed': false,
      '1 strength': false,
      '1 strength': false,
      'additional strike': false,
      'optional maneuver': false,
      'optional press': false,
      prevent: false,
      aggravated: false,
      'enter combat': false,
      'black hand': false,
      seraph: false,
      infernal: false,
      'red list': false,
      flight: false,
    },
    set: 'ANY',
  });

  const handleChange = event => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = event => {
    const {name, value} = event;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMultiChange = event => {
    const { id, name } = event.target;
    let newState = state[name];
    newState[id] = !newState[id];
    setState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleDisciplinesChange = event => {
    const { id, name } = event.target;
    let newState = state[name];
    if (newState[id] < 2) {
      newState[id] += 1;
    } else {
      newState[id] = 0;
    }
    setState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleVirtuesChange = event => {
    const { id, name } = event.target;
    let newState = state[name];
    if (newState[id] == 0) {
      newState[id] = 1;
    } else {
      newState[id] = 0;
    }
    setState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleClearFormButton = () => {
    setState({
      text: '',
      disciplines: {
        Abombwe: 0,
        Animalism: 0,
        Auspex: 0,
        Celerity: 0,
        Chimerstry: 0,
        Daimoinon: 0,
        Dementation: 0,
        Dominate: 0,
        Fortitude: 0,
        Melpominee: 0,
        Mytherceria: 0,
        Necromancy: 0,
        Obeah: 0,
        Obfuscate: 0,
        Obtenebration: 0,
        Potence: 0,
        Presence: 0,
        Protean: 0,
        Quietus: 0,
        Sanguinus: 0,
        Serpentis: 0,
        Spiritus: 0,
        Temporis: 0,
        Thanatosis: 0,
        Thaumaturgy: 0,
        Valeren: 0,
        Vicissitude: 0,
        Visceratika: 0,
      },
      virtues: {
        Defense: 0,
        Innocence: 0,
        Judgment: 0,
        Martyrdom: 0,
        Redemption: 0,
        Vengeance: 0,
        Vision: 0,
      },
      capacity: 'ANY',
      capacitymoreless: 'le',
      clan: 'ANY',
      sect: 'ANY',
      votes: 'ANY',
      titles: {
        primogen: false,
        prince: false,
        justicar: false,
        innercircle: false,
        baron: false,
        '1 vote': false,
        '2 votes': false,
        bishop: false,
        archbishop: false,
        priscus: false,
        cardinal: false,
        regent: false,
        magaji: false,
      },
      group: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      },
      traits: {
        '1 intercept': false,
        '1 stealth': false,
        '1 bleed': false,
        '2 bleed': false,
        '1 strength': false,
        '1 strength': false,
        'additional strike': false,
        'optional maneuver': false,
        'optional press': false,
        prevent: false,
        aggravated: false,
        'enter combat': false,
        'black hand': false,
        seraph: false,
        infernal: false,
        'red list': false,
        flight: false,
      },
      set: 'ANY',
    });
  };

  const handleClearResultButton = () => {
    props.setResults([]);
  };

  const handleSubmitButton = event => {
    event.preventDefault();

    const url = 'http://127.0.0.1:5001/api/search/crypt';

    let input = JSON.parse(JSON.stringify(state));
    Object.keys(input.disciplines).forEach(k => (input.disciplines[k] == 0) && delete input.disciplines[k]);
    Object.keys(input.virtues).forEach(k => (input.virtues[k] == 0) && delete input.virtues[k]);
    Object.keys(input.titles).forEach(k => (input.titles[k] == false) && delete input.titles[k]);
    Object.keys(input.group).forEach(k => (input.group[k] == false) && delete input.group[k]);
    Object.keys(input.traits).forEach(k => (input.traits[k] == false) && delete input.traits[k]);
    Object.keys(input).forEach(k => (input[k] == 'ANY' || !input[k] || Object.keys(input[k]).length === 0) && delete input[k]);
    if (input['capacity'] == null) {
      delete input['capacitymoreless'];
    };

    if (Object.keys(input).length === 0) {
      console.log('submit with empty forms');
    } else {
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      };

      fetch(url, options)
        .then(result => result.json())
        .then(result => {
          props.setResults(result);
        });
    };
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <div className='form-row justify-content-between'>
        <SearchCryptFormText value={state.text} onChange={handleChange} />
        <SearchCryptFormButtons handleClearFormButton={handleClearFormButton} handleClearResultButton={handleClearResultButton} />
      </div>
      <SearchCryptFormDisciplines value={state.disciplines} onChange={handleDisciplinesChange}/>
      <SearchCryptFormVirtues value={state.virtues} onChange={handleVirtuesChange}/>
      <SearchCryptFormCapacity value={state.capacity} moreless={state.capacitymoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchCryptFormClan value={state.clan} onChange={handleSelectChange} />
      <SearchCryptFormSect value={state.sect} onChange={handleChange} />
      <SearchCryptFormVotes value={state.votes} onChange={handleChange} />
      <SearchCryptFormTitles value={state.titles} onChange={handleMultiChange} />
      <SearchCryptFormGroup value={state.group} onChange={handleMultiChange} />
      <SearchCryptFormTraits value={state.traits} onChange={handleMultiChange} />
      <SearchCryptFormSet value={state.set} onChange={handleChange} />
    </form>
  );
}

export default SearchCryptForm;
