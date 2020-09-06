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
import SearchLibraryFormVotes from './SearchLibraryFormVotes.jsx';
import SearchLibraryFormBloodCost from './SearchLibraryFormBloodCost.jsx';
import SearchLibraryFormPoolCost from './SearchLibraryFormPoolCost.jsx';

function SearchLibraryForm(props) {
  const [state, setState] = useState({
    text: '',
    type: 'ANY',
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

  const handleClearFormButton = () => {
    setState({
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
      set: 'ANY',
    });
  };

  const handleClearResultButton = () => {
    props.setResults([]);
  };

  const handleSubmitButton = event => {
    event.preventDefault();

    const url = process.env.API_URL + 'search/library';

    let input = JSON.parse(JSON.stringify(state));
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
        .then(response => response.json())
        .then(data => {
          props.setResults(data);
        });
    };
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <div className='form-row justify-content-between'>
        <SearchLibraryFormText value={state.text} onChange={handleChange} />
        <SearchLibraryFormButtons handleClearFormButton={handleClearFormButton} handleClearResultButton={handleClearResultButton} />
      </div>
      <SearchLibraryFormType value={state.type} onChange={handleSelectChange} />
      <SearchLibraryFormDiscipline value={state.discipline} onChange={handleSelectChange}/>
      <SearchLibraryFormClan value={state.clan} onChange={handleSelectChange} />
      <SearchLibraryFormSect value={state.sect} onChange={handleChange} />
      <SearchLibraryFormTitle value={state.titles} onChange={handleChange} />
      <SearchLibraryFormBloodCost value={state.blood} moreless={state.bloodmoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchLibraryFormPoolCost value={state.pool} moreless={state.poolmoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchLibraryFormTraits value={state.traits} onChange={handleMultiChange} />
      <SearchLibraryFormSet value={state.set} onChange={handleChange} />
    </form>
  );
}

export default SearchLibraryForm;
