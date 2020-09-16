import React, { useState } from 'react';

import SearchLibraryFormButtons from './SearchLibraryFormButtons.jsx';
import SearchLibraryFormText from './SearchLibraryFormText.jsx';
import SearchLibraryFormType from './SearchLibraryFormType.jsx';
import SearchLibraryFormClan from './SearchLibraryFormClan.jsx';
import SearchLibraryFormTitle from './SearchLibraryFormTitle.jsx';
import SearchLibraryFormSect from './SearchLibraryFormSect.jsx';
import SearchLibraryFormDiscipline from './SearchLibraryFormDiscipline.jsx';
import SearchLibraryFormSet from './SearchLibraryFormSet.jsx';
import SearchLibraryFormTraits from './SearchLibraryFormTraits.jsx';
import SearchLibraryFormBloodCost from './SearchLibraryFormBloodCost.jsx';
import SearchLibraryFormPoolCost from './SearchLibraryFormPoolCost.jsx';

function SearchLibraryForm(props) {
  const defaults = {
    text: '',
    type: 'any',
    discipline: 'any',
    blood: 'any',
    bloodmoreless: 'le',
    pool: 'any',
    poolmoreless: 'le',
    clan: 'any',
    sect: 'any',
    title: 'any',
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
    set: 'any',
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

  const handleClearFormButton = () => setFormState(defaults);
  const handleClearResultButton = () => props.setResults([]);

  const handleSubmitButton = event => {
    event.preventDefault();

    const url = process.env.API_URL + 'search/library';

    let input = JSON.parse(JSON.stringify(formState));
    Object.keys(input.traits).forEach(k => (input.traits[k] == false) && delete input.traits[k]);
    Object.keys(input).forEach(k => (input[k] == 'any' || !input[k] || Object.keys(input[k]).length === 0) && delete input[k]);
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
        .then(response => response.json())
        .then(data => {
          props.setResults(data);
        });
    };
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <div className="input-group mb-3">
        <SearchLibraryFormText
          value={formState.text}
          onChange={handleChange}
        />
        <SearchLibraryFormButtons
          handleClearFormButton={handleClearFormButton}
          handleClearResultButton={handleClearResultButton}
        />
      </div>
      <SearchLibraryFormType
        value={formState.type}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormDiscipline
        value={formState.discipline}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormClan
        value={formState.clan}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormSect
        value={formState.sect}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormTitle
        value={formState.title}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormBloodCost
        value={formState.blood}
        moreless={formState.bloodmoreless}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormPoolCost
        value={formState.pool}
        moreless={formState.poolmoreless}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormTraits
        value={formState.traits}
        onChange={handleMultiChange}
      />
      <SearchLibraryFormSet
        value={formState.set}
        onChange={handleSelectChange}
      />
    </form>
  );
}

export default SearchLibraryForm;
