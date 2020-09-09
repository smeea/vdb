import React from 'react';

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
  const handleChange = event => {
    const {name, value} = event.target;
    props.setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = event => {
    const {name, value} = event;
    props.setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMultiChange = event => {
    const { id, name } = event.target;
    let newState = props.formState[name];
    newState[id] = !newState[id];
    props.setFormState(prevState => ({
      ...prevState,
      [name]: newState
    }));
  };

  const handleClearFormButton = () => {
    props.setFormState({
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

    let input = JSON.parse(JSON.stringify(props.formState));
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
      <div className="input-group mb-3">
        <SearchLibraryFormText value={props.formState.text} onChange={handleChange} />
        <SearchLibraryFormButtons handleClearFormButton={handleClearFormButton} handleClearResultButton={handleClearResultButton} />
      </div>
      <SearchLibraryFormType value={props.formState.type} onChange={handleSelectChange} />
      <SearchLibraryFormDiscipline value={props.formState.discipline} onChange={handleSelectChange}/>
      <SearchLibraryFormClan value={props.formState.clan} onChange={handleSelectChange} />
      <SearchLibraryFormSect value={props.formState.sect} onChange={handleChange} />
      <SearchLibraryFormTitle value={props.formState.titles} onChange={handleChange} />
      <SearchLibraryFormBloodCost value={props.formState.blood} moreless={props.formState.bloodmoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchLibraryFormPoolCost value={props.formState.pool} moreless={props.formState.poolmoreless} onValueChange={handleChange} onMorelessChange={handleChange} />
      <SearchLibraryFormTraits value={props.formState.traits} onChange={handleMultiChange} />
      <SearchLibraryFormSet value={props.formState.set} onChange={handleChange} />
    </form>
  );
}

export default SearchLibraryForm;
