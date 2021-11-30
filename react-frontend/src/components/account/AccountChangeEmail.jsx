import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import AppContext from 'context/AppContext';

function AccountChangeEmail(props) {
  const { email, setEmail, isMobile } = useContext(AppContext);

  const [state, setState] = useState({
    password: '',
    email: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

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
          if (!response.ok) throw Error(response.status);
          return response.json();
        })
        .then((data) => {
          setEmail(state.email);
          setButtonState(true);
          setTimeout(() => {
            setButtonState(false);
          }, 1000);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
        })
        .catch((error) => {
          setPasswordError(true);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
        });
    } else {
      setEmptyEmail(!state.email);
      setEmptyPassword(!state.password);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeEmail();
  };

  useEffect(() => {
    if (email) {
      setState((prevState) => ({
        ...prevState,
        email: email,
      }));
    }
  }, [email]);

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
        <span className="ms-2">Change email (optional)</span>
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
            placeholder="New email"
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            ref={refEmail}
          />
          <FormControl
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            ref={refPassword}
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
          show={emptyEmail}
          target={refEmail.current}
          placement="bottom"
        >
          ENTER EMAIL
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyPassword}
          target={refPassword.current}
          placement="bottom"
        >
          ENTER PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
        >
          WRONG PASSWORD
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

export default AccountChangeEmail;
