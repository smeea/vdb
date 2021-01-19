import React, { useState, useEffect, useRef } from 'react';
import { Form, FormControl, InputGroup, Button, Overlay } from 'react-bootstrap';
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
          if (!response.ok) throw Error(response.status)
          return response.json()
        })
        .then((data) => {
          props.setEmail(state.email);
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
          console.log(error);
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
          show={emptyEmail}
          target={refEmail.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="error-tooltip small" {...props}>
              <b>ENTER EMAIL</b>
            </div>
          )}
        </Overlay>
        <Overlay
          show={emptyPassword}
          target={refPassword.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="error-tooltip small" {...props}>
              <b>ENTER PASSWORD</b>
            </div>
          )}
        </Overlay>
        <Overlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="error-tooltip small" {...props}>
              <b>WRONG PASSWORD</b>
            </div>
          )}
        </Overlay>
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
