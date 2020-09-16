import React, { useState, useEffect, useFocus } from 'react';

import SearchCryptFormButtons from './SearchCryptFormButtons.jsx';
import SearchCryptFormText from './SearchCryptFormText.jsx';
import SearchCryptFormDisciplines from './SearchCryptFormDisciplines.jsx';
import SearchCryptFormVirtues from './SearchCryptFormVirtues.jsx';
import SearchCryptFormCapacity from './SearchCryptFormCapacity.jsx';
import SearchCryptFormClan from './SearchCryptFormClan.jsx';
import SearchCryptFormSect from './SearchCryptFormSect.jsx';
import SearchCryptFormVotes from './SearchCryptFormVotes.jsx';
import SearchCryptFormTitles from './SearchCryptFormTitles.jsx';
import SearchCryptFormGroup from './SearchCryptFormGroup.jsx';
import SearchCryptFormTraits from './SearchCryptFormTraits.jsx';
import SearchCryptFormSet from './SearchCryptFormSet.jsx';

function SearchCryptForm(props) {
  const defaults = {
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
  }

  const [formState, setFormState] = useState(defaults);

  const handleChange = event => {
    const {name, value} = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = event => {
    const {name, value} = event;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMultiChange = event => {
    const { id, name } = event.target;
    let newState = formState[name];
    newState[id] = !newState[id];
    setFormState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleDisciplinesChange = event => {
    const { id, name } = event.target;
    let newState = formState[name];
    if (newState[id] < 2) {
      newState[id] += 1;
    } else {
      newState[id] = 0;
    }
    setFormState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleVirtuesChange = event => {
    const { id, name } = event.target;
    let newState = formState[name];
    if (newState[id] == 0) {
      newState[id] = 1;
    } else {
      newState[id] = 0;
    }
    setFormState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleClearFormButton = () => setFormState(defaults)

  const handleClearResultButton = () => {
    props.setResults([]);
  };

  const handleSubmitButton = event => {
    event.preventDefault();

    const url = process.env.API_URL + 'search/crypt';

    let input = JSON.parse(JSON.stringify(formState));
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
        .then(response => response.json())
        .then(data => {
          props.setResults(data);
        });
    };
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <div className="input-group">
        <SearchCryptFormText
          value={formState.text}
          onChange={handleChange}
        />
        <SearchCryptFormButtons
          handleClearFormButton={handleClearFormButton}
          handleClearResultButton={handleClearResultButton}
        />
      </div>
      <SearchCryptFormDisciplines
        value={formState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <SearchCryptFormVirtues
        value={formState.virtues}
        onChange={handleVirtuesChange}
      />
      <SearchCryptFormCapacity
        value={formState.capacity}
        moreless={formState.capacitymoreless}
        onValueChange={handleChange}
        onMorelessChange={handleChange}
      />
      <SearchCryptFormClan
        value={formState.clan}
        onChange={handleSelectChange}
      />
      <SearchCryptFormSect
        value={formState.sect}
        onChange={handleChange}
      />
      <SearchCryptFormVotes
        value={formState.votes}
        onChange={handleChange}
      />
      <SearchCryptFormTitles
        value={formState.titles}
        onChange={handleMultiChange}
      />
      <SearchCryptFormGroup
        value={formState.group}
        onChange={handleMultiChange}
      />
      <SearchCryptFormTraits
        value={formState.traits}
        onChange={handleMultiChange}
      />
      <SearchCryptFormSet
        value={formState.set}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchCryptForm;
