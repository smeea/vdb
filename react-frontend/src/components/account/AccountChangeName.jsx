import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import PenFill from 'assets/images/icons/pen-fill.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import AppContext from 'context/AppContext';

function AccountChangeName(props) {
  const { publicName, setPublicName, isMobile } = useContext(AppContext);

  const [emptyName, setEmptyName] = useState(false);
  const [state, setState] = useState('');
  const refName = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const changeName = () => {
    if (state) {
      setEmptyName(false);

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
          if (!response.ok) throw Error(response.status);
          return response.json();
        })
        .then(() => {
          setPublicName(state);
          setEmptyName(false);
          setButtonState(true);
          setTimeout(() => {
            setButtonState(false);
          }, 1000);
        })
        .catch((error) => {});
    } else {
      setEmptyName(true);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeName();
  };

  useEffect(() => {
    if (publicName) {
      setState(publicName);
    }
  }, [publicName]);

  const tooltipText = (
    <>
      Public name is default author name for new decks.
      <br />
      Author name is per-deck and can be changed anytime for each deck.
      <br />
      Public names are not unique.
      <br />
      Changing public name will not change author name of your existing decks.
      <br />
      Public name is *not* your account username which cannot be changed.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center px-1">
        <PenFill />
        <span className="ms-2">Change public name</span>
        {!isMobile ? (
          <OverlayTooltip text={tooltipText}>
            <span className="question-tooltip ms-1">[?]</span>
          </OverlayTooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip ms-1"
          >
            [?]
          </span>
        )}
      </h6>
      <Form className="my-1" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="Public name"
            type="text"
            name="publicName"
            value={state}
            onChange={handleChange}
            ref={refName}
          />
          {!buttonState ? (
            <Button variant="primary" type="submit">
              <Check2 />
            </Button>
          ) : (
            <Button variant="success" type="submit">
              <Check2 />
            </Button>
          )}
        </InputGroup>
        <ErrorOverlay
          show={emptyName}
          target={refName.current}
          placement="bottom"
        >
          ENTER PUBLIC NAME
        </ErrorOverlay>
      </Form>
      {showModal && (
        <ModalTooltip
          text={tooltipText}
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountChangeName;
