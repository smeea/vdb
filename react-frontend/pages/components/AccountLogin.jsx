import React, { useState, useRef, useContext } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import OverlayTooltip from './OverlayTooltip.jsx';
import ModalTooltip from './ModalTooltip.jsx';
import DoorOpenFill from '../../assets/images/icons/door-open-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';
import Check2 from '../../assets/images/icons/check2.svg';
import ErrorOverlay from './ErrorOverlay.jsx';
import AppContext from '../../context/AppContext';

function AccountLogin(props) {
  const { setPublicName, setEmail, setUsername, isMobile } =
    useContext(AppContext);

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [spinnerState, setSpinnerState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
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
    setConnectionError(false);

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
        .then((response) => {
          if (!response.ok) throw Error(response.status);
          return response.json();
        })
        .then((data) => {
          setSpinnerState(false);
          setUsername(data.username);
          setPublicName(data.public_name);
          setEmail(data.email);
        })
        .catch((e) => {
          if (e.message == 401) {
            setSpinnerState(false);
            setPasswordError(true);
            setState((prevState) => ({
              ...prevState,
              password: '',
            }));
          } else {
            setConnectionError(true);
          }
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
      Please{' '}
      <a href="mailto:smeea@riseup.net?subject=VDB - Password reset&body=Please reset password for VDB account: <PUT YOUR ACCOUNT NAME HERE>">
        send me an email
      </a>{' '}
      with your account username and I will generate temporary password for you.
    </>
  );

  const loginTooltipText = (
    <>
      Login is required for Deck Building and Inventory.
      <br />
      Decks and Inventory are stored on the server and you can access them from
      any device.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center">
        <DoorOpenFill />
        <span className="ms-2">Login</span>
        {!isMobile ? (
          <OverlayTooltip text={loginTooltipText}>
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
      <Form className="mb-0" onSubmit={handleSubmitButton}>
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
          <Button
            tabIndex="-1"
            variant="primary"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          {!spinnerState ? (
            <Button variant="primary" type="submit">
              <Check2 />
            </Button>
          ) : (
            <Button variant="primary">
              <Spinner animation="border" size="sm" />
            </Button>
          )}
        </InputGroup>
        <ErrorOverlay
          show={emptyUsername}
          target={refUsername.current}
          placement="bottom"
        >
          ENTER USERNAME
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
        >
          WRONG PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refPassword.current}
          placement="bottom"
        >
          CONNECTION PROBLEM
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyPassword}
          target={refPassword.current}
          placement="bottom"
        >
          ENTER PASSWORD
        </ErrorOverlay>
      </Form>
      {!isMobile ? (
        <div className="d-flex justify-content-center small ms-3 ps-4">
          <OverlayTooltip
            delay={{ show: 0, hide: 2000 }}
            placement="bottom"
            text={passwordTooltipText}
          >
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </OverlayTooltip>
        </div>
      ) : (
        <div
          onClick={() => setShowModal(true)}
          className="d-flex justify-content-center small ms-3 ps-4"
        >
          <a href="#">
            <i>Forgot password?</i>
          </a>
        </div>
      )}
      {showModal && (
        <ModalTooltip
          text={passwordTooltipText}
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountLogin;
