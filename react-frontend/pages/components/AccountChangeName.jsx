import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import PenFill from '../../assets/images/icons/pen-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';

function AccountChangeName(props) {
  const [emptyPublicName, setEmptyPublicName] = useState(false);
  const [state, setState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const changeName = () => {
    if (state) {
      setEmptyPublicName(false);

      const url = `${process.env.API_URL}account`;
      const input = {
        publicName: state,
      };

      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => {
          if (response.ok) {
            response.json();
          } else {
            throw Error(`Error: ${response.status}`);
          }
        })
        .then(() => props.setPublicName(state))
        .catch((error) => {
          console.log(error);
        });
    }

    !state ? setEmptyPublicName(true) : setEmptyPublicName(false);
  };

  useEffect(() => {
    if (props.publicName) {
      setState(props.publicName);
    }
  }, [props.publicName]);

  return (
    <>
      <h6 className="d-flex align-items-center">
        <PenFill />
        <span className="ml-2">Change public name</span>
        <OverlayTooltip text="Public name is default author name for new decks. Author name is per-deck and can be changed anytime for each deck. Public names are not unique. Changing public name will not change author name of your existing decks. Public name is *not* your account username which cannot be changed.">
          <span className="question-tooltip ml-1">[?]</span>
        </OverlayTooltip>
      </h6>
      <InputGroup className="mb-2">
        <FormControl
          placeholder="Public name"
          type="text"
          name="publicName"
          value={state}
          onChange={handleChange}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={changeName}>
            <Check2 size={20} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {emptyPublicName && (
        <div>
          <span className="login-error">Enter name</span>
        </div>
      )}
    </>
  );
}

export default AccountChangeName;
