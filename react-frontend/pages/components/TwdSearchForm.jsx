import React, { useState, useEffect } from 'react';
import TwdSearchFormTextAndButtons from './TwdSearchFormTextAndButtons.jsx';
import TwdSearchFormPlayer from './TwdSearchFormPlayer.jsx';
import TwdSearchFormLocation from './TwdSearchFormLocation.jsx';
import TwdSearchFormCrypt from './TwdSearchFormCrypt.jsx';
import TwdSearchFormLibrary from './TwdSearchFormLibrary.jsx';

function TwdSearchForm(props) {
  const defaults = {
    player: '',
    location: '',
    crypt: {},
    library: {},
  };

  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClearButton = () => {
    props.setFormState(defaults);
    props.setResults(undefined);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();

    const url = `${process.env.API_URL}search/twd`;

    const input = JSON.parse(JSON.stringify(props.formState));

    const multiSelectForms = [
      'crypt',
      'library',
    ];

    multiSelectForms.map((i) => {
      Object.keys(input[i]).forEach(
        (k) => input[i][k] == 0 && delete input[i][k]
      );
    });

    Object.keys(input).forEach(
      (k) =>
        (input[k] == 'any' ||
          !input[k] ||
          Object.keys(input[k]).length === 0) &&
        delete input[k]
    );
    // if (input['capacity'] == null) {
    //   delete input['capacitymoreless'];
    // }

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

      setSpinnerState(true);

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          props.setShowSearch(false);
          props.setResults(data);
          setSpinnerState(false);
        })
        .catch((error) => {
          props.setResults(null);
          setSpinnerState(false);
          console.log(error);
        });
    }
  };

  // useEffect(() => {
  //   console.log(props.formState)
  // }, [props.formState])

  return (
    <form onSubmit={handleSubmitButton}>
      <TwdSearchFormTextAndButtons
        value={props.formState.text}
        onChange={handleChange}
        handleClearButton={handleClearButton}
        spinner={spinnerState}
      />
      <TwdSearchFormPlayer
        value={props.formState.player}
        setFormState={props.setFormState}
        onChange={handleChange}
        handleClearButton={handleClearButton}
        spinner={spinnerState}
      />
      <TwdSearchFormLocation
        value={props.formState.location}
        setFormState={props.setFormState}
        onChange={handleChange}
        handleClearButton={handleClearButton}
        spinner={spinnerState}
      />
      <TwdSearchFormCrypt
        state={props.formState.crypt}
        setFormState={props.setFormState}
        handleClearButton={handleClearButton}
        spinner={spinnerState}
      />
      <TwdSearchFormLibrary
        state={props.formState.library}
        setFormState={props.setFormState}
        handleClearButton={handleClearButton}
        spinner={spinnerState}
      />
    </form>
  );
}

export default TwdSearchForm;
