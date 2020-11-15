import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import EnvelopeFill from '../../assets/images/icons/envelope-fill.svg';
import OverlayTooltip from './OverlayTooltip.jsx';
import ModalTooltip from './ModalTooltip.jsx';

function AccountChangeEmail(props) {
  const [state, setState] = useState({
    password: '',
    email: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeEmail = () => {
    setPasswordError(false);

    if (state.email && state.password) {
      setEmptyEmail(false);
      setEmptyPassword(false);

      const url = `${process.env.API_URL}account`;
      const input = {
        password: state.password,
        email: state.email,
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
        .then((data) => {
          props.setEmail(state.email);
          setButtonState(true);
          setTimeout(() => {
            setButtonState(false);
          }, 500);
        })
        .catch((error) => {
          setPasswordError(true);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
          console.log(error);
        });
    }

    !state.email ? setEmptyEmail(true) : setEmptyEmail(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeEmail();
  };

  useEffect(() => {
    if (props.email) {
      setState((prevState) => ({
        ...prevState,
        email: props.email,
      }));
    }
  }, [props.email]);

  const tooltipText = (
    <>
      Email is for password recovery only.
      <br />
      We will not share it with anyone and will not send you anything irrelevant
      to password reset.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center px-1">
        <EnvelopeFill />
        <span className="ml-2">Change email</span>
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
            placeholder="New email"
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <FormControl
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <InputGroup.Append>
            {!buttonState ? (
              <Button variant="outline-secondary" type="submit">
                <Check2 size={20} />
              </Button>
            ) : (
              <Button variant="success" type="submit">
                <Check2 size={20} />
              </Button>
            )}
          </InputGroup.Append>
        </InputGroup>
        {emptyEmail && <span className="login-error">Enter email</span>}
        {emptyPassword && <span className="login-error">Enter password</span>}
        {passwordError && <span className="login-error">Wrong password</span>}
      </Form>
      {showModal && (
        <ModalTooltip
          text={tooltipText}
          title="Email"
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountChangeEmail;
