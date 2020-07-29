import React, { useState, useEffect } from 'react';

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

function SearchLibraryFormText(props) {

  return (
    <div className="col-8">
      <input
        placeholder="Card Name / Text"
        type="text"
        value={props.value}
        onChange={props.onChange}/>
    </div>
  );
}

function SearchLibraryFormButtons(props) {
  return (
    <div className="pr-1">
      <button className="btn btn-outline-primary" type="submit">
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
        </svg>
      </button>
      <button className="btn btn-outline-secondary" type="button" onClick={props.handleClearFormButton}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" />
          <path d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" />
        </svg>
      </button>
      <button className="btn btn-outline-secondary" type="button" onClick={props.handleClearResultButton}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" />
          <path d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" />
        </svg>
      </button>
    </div>
  );
}


function SearchLibraryFormDiscipline(props) {
  const disciplines = [
    'ANY',
    'Abombwe',
    'Animalism',
    'Auspex',
    'Celerity',
    'Chimerstry',
    'Daimoinon',
    'Dominate',
    'Dementation',
    'Fortitude',
    'Melpominee',
    'Mytherceria',
    'Necromancy',
    'Obeah',
    'Obfuscate',
    'Obtenebration',
    'Potence',
    'Presence',
    'Protean',
    'Quietus',
    'Sanguinus',
    'Serpentis',
    'Spiritus',
    'Temporis',
    'Thanatosis',
    'Thaumaturgy',
    'Valeren',
    'Vicissitude',
    'Visceratika',
    'Innocence',
    'Judgement',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
  ];

  const disciplineforms = disciplines.map((i, index) => {
    return(
      <option key={index} value={i}>{i}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Discipline:
        </label>
      </div>
      <div className="form-group col-9">
        <select className="custom-select" name="discipline" value={props.value} onChange={props.onChange}>
          {disciplineforms}
        </select>
      </div>
    </div>
  );
}

function SearchLibraryFormType(props) {
  const types = [
    'ANY',
    'Action',
    'Action Modifier',
    'Ally',
    'Combat',
    'Conviction',
    'Equipment',
    'Event',
    'Master',
    'Political Action',
    'Power',
    'Reaction',
    'Reflex',
    'Retainer',
  ];

  const typeforms = types.map((i, index) => {
    return(
      <option key={index} value={i}>{i}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Type:
        </label>
      </div>
      <div className="form-group col-9">
        <select className="custom-select" name="type" value={props.value} onChange={props.onChange}>
          {typeforms}
        </select>
      </div>
    </div>
  );
}

function SearchLibraryFormBloodCost(props) {
  const blood = ['ANY', 1, 2, 3, 4, 5, 6];
  const bloodforms = blood.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const bloodmoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];
  const bloodmorelessforms = bloodmoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Blood Cost:
        </label>
      </div>
      <div className="form-group col-9">
        <div className="input-group">
          <select className="custom-select" value={props.moreless} onChange={props.onMorelessChange}>
            {bloodmorelessforms}
          </select>
          <select className="custom-select" value={props.value} onChange={props.onValueChange} >
            {bloodforms}
          </select>
        </div>
      </div>
    </div>
  );
}

function SearchLibraryFormPoolCost(props) {
  const pool = ['ANY', 1, 2, 3, 4, 5, 6];
  const poolforms = pool.map( (i, index) => {
    return (
      <option key={index} value={i}>{i}</option>
    );
  });

  const poolmoreless = [
    ['le', '<=',],
    ['eq', '==',],
    ['ge', '>=',],
  ];
  const poolmorelessforms = poolmoreless.map( (i, index) => {
    return (
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Pool Cost:
        </label>
      </div>
      <div className="form-group col-9">
        <div className="input-group">

          <select className="custom-select" value={props.moreless} onChange={props.onMorelessChange}>
            {poolmorelessforms}
          </select>
          <select className="custom-select" value={props.value} onChange={props.onValueChange} >
            {poolforms}
          </select>
        </div>
      </div>
    </div>
  );
}

function SearchLibraryFormClan(props) {
  const clans = [
    "ANY",
    "Abomination",
    "Ahrimane",
    "Akunanse",
    "Assamite",
    "Baali",
    "Blood Brother",
    "Brujah",
    "Brujah antitribu",
    "Caitiff",
    "Daughter of Cacophony",
    "Follower of Set",
    "Gangrel",
    "Gangrel antitribu",
    "Gargoyle",
    "Giovanni",
    "Guruhi",
    "Harbinger of Skulls",
    "Ishtarri",
    "Kiasyd",
    "Lasombra",
    "Malkavian",
    "Malkavian antitribu",
    "Nagaraja",
    "Nosferatu",
    "Nosferatu antitribu",
    "Osebo",
    "Pander",
    "Ravnos",
    "Salubri",
    "Salubri antitribu",
    "Samedi",
    "Toreador",
    "Toreador antitribu",
    "Tremere",
    "Tremere antitribu",
    "True Brujah",
    "Tzimisce",
    "Ventrue",
    "Ventrue antitribu",
    "Avenger",
    "Defender",
    "Innocent",
    "Judge",
    "Martyr",
    "Redeemer",
    "Visionary",
  ];

  const clanforms = clans.map((i, index) => {
    return(
      <option key={index} value={i}>{i}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Clan:
        </label>
      </div>
      <div className="form-group col-9">
        <select className="custom-select" name="clan" value={props.value} onChange={props.onChange}>
          {clanforms}
        </select>
      </div>
    </div>
  );
}


function SearchLibraryFormSect(props) {
  const sects = [
    ['ANY', 'ANY'],
    ['Camarilla', 'camarilla'],
    ['Sabbat', 'sabbat'],
    ['Laibon', 'laibon'],
    ['Independent', 'independent'],
    ['Anarch', 'anarch'],
    ['Imbued', 'imbued'],
  ];

  const sectforms = sects.map((i, index) => {
    return(
      <option key={index} value={i[1]}>{i[0]}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Sect:
        </label>
      </div>
      <div className="form-group col-9">
        <select className="custom-select" name="sect" value={props.value} onChange={props.onChange}>
          {sectforms}
        </select>
      </div>
    </div>
  );
}


function SearchLibraryFormVotes(props) {
  const votes = [
    ["ANY", "ANY"],
    [1, "1+"],
    [2, "2+"],
    [3, "3+"],
    [4, "4+"],
  ];

  const votesforms = votes.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Votes:
        </label>
      </div>
      <div className="form-group col-9">
        <select className="custom-select" name="votes" value={props.value} onChange={props.onChange}>
          {votesforms}
        </select>
      </div>
    </div>
  );
}


function SearchLibraryFormTitle(props) {
  const title = [
    ['ANY', 'ANY'],
    ['Primogen', 'primogen'],
    ['Prince', 'prince'],
    ['Justicar', 'justicar'],
    ['Inner Circle', 'inner circle'],
    ['Baron', 'baron'],
    ['1 vote', '1 vote'],
    ['2 votes', '2 votes'],
    ['Bishop', 'bishop'],
    ['Archbishop', 'archbishop'],
    ['Priscus', 'priscus'],
    ['Cardinal', 'cardinal'],
    ['Regent', 'regent'],
    ['Magaji', 'magaji'],
  ];

  const titleforms = title.map((i, index) => {
    return(
      <option key={index} value={i[1]}>{i[0]}</option>
    );
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">
          Title:
        </label>
      </div>
      <div className="form-group col-9">
        <select className="custom-select" name="title" value={props.value} onChange={props.onChange}>
          {titleforms}
        </select>
      </div>
    </div>
  );
}

function SearchLibraryFormTraits(props) {
  const traitsLeft = [
    ['intercept', '+Intercept / -Stealth'],
    ['stealth', '+Stealth / -Intercept'],
    ['bleed', '+Bleed'],
    ['strength', '+Strength'],
    ['dodge', 'Dodge'],
    ['optional maneuver', 'Maneuver'],
    ['additional strike', 'Additional Strike'],
    ['aggravated', 'Aggravated'],
    ['prevent', 'Prevent'],
  ];

  const traitsRight = [
    ['optional press', 'Press'],
    ['combat ends', 'Combat Ends'],
    ['enter combat', 'Enter combat'],
    ['bounce bleed', 'Bounce Bleed'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['anarch', 'Anarch'],
    ['infernal', 'Infernal'],
  ];

  const traitsLeftforms = traitsLeft.map( (i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input id={i[0]} className="mr-2 custom-control-input" type="checkbox" checked={props.value[i[0]]} onChange={(e) => props.onChange(i[0], e)} />
        <label htmlFor={i[0]} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map( (i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input id={i[0]} className="mr-2 custom-control-input" type="checkbox" checked={props.value[i[0]]} onChange={(e) => props.onChange(i[0], e)} />
        <label htmlFor={i[0]} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <div className="pt-2">
      <h6>Traits:</h6>
      <div className="form-row">
        <div className="form-group col-7">
          {traitsLeftforms}
        </div>
        <div className="form-group col-5">
          {traitsRightforms}
        </div>
      </div>
    </div>
  );
}


class SearchLibraryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      discipline: 'ANY',
      blood: 'ANY',
      bloodmoreless: 'le',
      pool: 'ANY',
      poolmoreless: 'le',
      clan: 'ANY',
      sect: 'ANY',
      title: 'ANY',
      traits: {
        'intercept': false,
        'stealth': false,
        'bleed': false,
        'strength': false,
        'dodge': false,
        'optional maneuver': false,
        'additional strike': false,
        aggravated: false,
        prevent: false,
        'optional press': false,
        'combat ends': false,
        'bounce bleed': false,
        'black hand': false,
        seraph: false,
        anarch: false,
        infernal: false,
      }
    };

    this.handleTextChange = event => {
      const { text, value } = event.target;
      this.setState({text: value});
    };

    this.handleTypeChange = event => {
      const { type, value } = event.target;
      this.setState({type: value});
    };

    this.handleDisciplineChange = event => {
      const { discipline, value } = event.target;
      this.setState({discipline: value});
    };

    this.handleBloodChange = event => {
      const { blood, value } = event.target;
      this.setState({blood: value});
    };

    this.handleBloodMorelessChange = event => {
      const { bloodmoreless, value } = event.target;
      this.setState({bloodmoreless: value});
    };

    this.handlePoolChange = event => {
      const { pool, value } = event.target;
      this.setState({pool: value});
    };

    this.handlePoolMorelessChange = event => {
      const { poolmoreless, value } = event.target;
      this.setState({poolmoreless: value});
    };

    this.handleClanChange = event => {
      const { clan, value } = event.target;
      this.setState({clan: value});
    };

    this.handleSectChange = event => {
      const { sect, value } = event.target;
      this.setState({sect: value});
    };

    this.handleTitleChange = event => {
      const { title, value } = event.target;
      this.setState({title: value});
    };

    this.handleTraitsChange = (i, event) => {
      const { traits, value } = event.target;
      let newState = this.state.traits;
      newState[i] = !newState[i];
      this.setState({traits: newState});
    };

    this.handleClearFormButton = () => {
      this.setState({
        text: '',
        type: 'ANY',
        discipline: 'ANY',
        clan: 'ANY',
        sect: 'ANY',
        title: 'ANY',
        blood: 'ANY',
        bloodmoreless: 'le',
        pool: 'ANY',
        poolmoreless: 'le',
        traits: {
          'intercept': false,
          'stealth': false,
          'bleed': false,
          'strength': false,
          'dodge': false,
          'optional maneuver': false,
          'additional strike': false,
          aggravated: false,
          prevent: false,
          'optional press': false,
          'combat ends': false,
          'bounce bleed': false,
          'black hand': false,
          seraph: false,
          anarch: false,
          infernal: false,
        },
      });
    };

    this.handleClearResultButton = () => {
      props.setResults([]);
    };

    this.handleSubmitButton = event => {
      event.preventDefault();

      const url = 'http://127.0.0.1:5001/api/search/library';


      let input = JSON.parse(JSON.stringify(this.state));
      Object.keys(input.traits).forEach(k => (input.traits[k] == false) && delete input.traits[k]);
      Object.keys(input).forEach(k => (input[k] == 'ANY' || !input[k] || Object.keys(input[k]).length === 0) && delete input[k]);
      if (input['blood'] == null) {
        delete input['bloodmoreless'];
      };

      if (input['pool'] == null) {
        delete input['poolmoreless'];
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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitButton}>
        <div className="form-row justify-content-between">
          <SearchLibraryFormText value={this.state.text} onChange={this.handleTextChange} />
          <SearchLibraryFormButtons handleClearFormButton={this.handleClearFormButton} handleClearResultButton={this.handleClearResultButton} />
        </div>
        <SearchLibraryFormType value={this.state.type} onChange={this.handleTypeChange} />
        <SearchLibraryFormDiscipline value={this.state.discipline} onChange={this.handleDisciplineChange}/>
        <SearchLibraryFormClan value={this.state.clan} onChange={this.handleClanChange} />
        <SearchLibraryFormSect value={this.state.sect} onChange={this.handleSectChange} />
        <SearchLibraryFormTitle value={this.state.titles} onChange={this.handleTitleChange} />
        <SearchLibraryFormBloodCost value={this.state.blood} moreless={this.state.bloodmoreless} onValueChange={this.handleBloodChange} onMorelessChange={this.handleBloodMorelessChange} />
        <SearchLibraryFormPoolCost value={this.state.pool} moreless={this.state.poolmoreless} onValueChange={this.handlePoolChange} onMorelessChange={this.handlePoolMorelessChange} />
        <SearchLibraryFormTraits value={this.state.traits} onChange={this.handleTraitsChange} />
      </form>
    );
  }
}

export default SearchLibraryForm;
