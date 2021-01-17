import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
  Overlay,
} from 'react-bootstrap';
import OverlayTooltip from './OverlayTooltip.jsx';
import ModalTooltip from './ModalTooltip.jsx';
import DoorOpenFill from '../../assets/images/icons/door-open-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function AccountLogin(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [spinnerState, setSpinnerState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = () => {
    setPasswordError(false);

    if (state.username && state.password) {
      setEmptyUsername(false);
      setEmptyPassword(false);

      const url = `${process.env.API_URL}login`;
      const input = {
        username: state.username,
        password: state.password,
        remember: 'True',
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

      setSpinnerState(true);

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          props.setUsername(state.username);
          setSpinnerState(false);
        })
        .catch((error) => {
          setPasswordError(true);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
          setSpinnerState(false);
          console.log(error);
        });
    } else {
      setEmptyUsername(!state.username);
      setEmptyPassword(!state.password);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    loginUser();
  };

  const passwordTooltipText = (
    <>
      We do not have automatic password restoration yet.
      <br />
    Please <a href="mailto:smeea@riseup.net?subject=VDB - Pasword reset&body=Please reset password for VDB account put-your-account-name-here.">send me an email</a> with your account username and I will generate temporary password for you.
    </>
  );

  const loginTooltipText = (
    <>
      Login is required for Deck Building.
      <br />
      Decks are stored on the server and you can access them from any device.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center">
        <DoorOpenFill />
        <span className="ml-2">Login</span>
        {!props.isMobile ? (
          <OverlayTooltip text={loginTooltipText}>
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
      <Form className="mb-2" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="Username"
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            autoFocus={true}
            ref={refUsername}
          />
          <FormControl
            placeholder="Password"
            type={hidePassword ? 'password' : 'text'}
            name="password"
            value={state.password}
            onChange={handleChange}
            ref={refPassword}
          />
          <InputGroup.Append>
            <Button
              tabIndex="-1"
              variant="outline-secondary"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeFill /> : <EyeSlashFill />}
            </Button>
            {!spinnerState ? (
              <Button variant="outline-secondary" type="submit">
                <Check2 />
              </Button>
            ) : (
              <Button variant="outline-secondary">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}
          </InputGroup.Append>
        </InputGroup>
        <Overlay
          show={emptyUsername}
          target={refUsername.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="error-tooltip small" {...props}>
              <b>ENTER USERNAME</b>
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
      </Form>
      {!props.isMobile ? (
        <OverlayTooltip delay={{ show: 0, hide: 1500 }} placement="bottom" text={passwordTooltipText}>
          <div className="d-flex justify-content-center small pl-4">
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </div>
        </OverlayTooltip>
      ) : (
        <div onClick={() => setShowModal(true)} className="d-flex justify-content-center small pl-4">
          <a href="#">
            <i>Forgot password?</i>
          </a>
        </div>
      )}
      {showModal && (
        <ModalTooltip
          text={passwordTooltipText}
          title="Forgot password"
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountLogin;
