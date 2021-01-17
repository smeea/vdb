import React, { useState, useEffect, useRef } from 'react';
import { Form, FormControl, InputGroup, Button, Overlay } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import PenFill from '../../assets/images/icons/pen-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';
import ModalTooltip from './ModalTooltip.jsx';

function AccountChangeName(props) {
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
        .then((response) => response.json())
        .then(() => {
          props.setPublicName(state);
          setEmptyName(false);
          setButtonState(true);
          setTimeout(() => {
            setButtonState(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setEmptyName(true);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeName();
  };

  useEffect(() => {
    if (props.publicName) {
      setState(props.publicName);
    }
  }, [props.publicName]);

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
        <span className="ml-2">Change public name</span>
        {!props.isMobile ? (
          <OverlayTooltip text={tooltipText}>
            <span className="question-tooltip ml-1">[?]</span>
          </OverlayTooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip ml-1"
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
          <InputGroup.Append>
            {!buttonState ? (
              <Button variant="outline-secondary" type="submit">
                <Check2 />
              </Button>
            ) : (
              <Button variant="success" type="submit">
                <Check2 />
              </Button>
            )}
          </InputGroup.Append>
        </InputGroup>
        <Overlay
          show={emptyName}
          target={refName.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="error-tooltip small" {...props}>
              <b>ENTER PUBLIC NAME</b>
            </div>
          )}
        </Overlay>
      </Form>
      {showModal && (
        <ModalTooltip
          text={tooltipText}
          title="Public name"
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountChangeName;
