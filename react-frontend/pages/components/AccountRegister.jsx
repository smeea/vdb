import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
  Overlay,
} from 'react-bootstrap';
import PersonPlusFill from '../../assets/images/icons/person-plus-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function AccountRegister(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [spinnerState, setSpinnerState] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
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

  const registerUser = () => {
    setUsernameError(false);

    if (state.username && state.password) {
      setEmptyUsername(false);
      setEmptyPassword(false);

      const url = `${process.env.API_URL}register`;
      const input = {
        username: state.username,
        password: state.password,
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
          if (!response.ok) throw Error(response.status)
          return response.json()
        })
        .then((data) => {
          props.whoAmI();
          setSpinnerState(false);
        })
        .catch((error) => {
          setUsernameError(true);
          setState((prevState) => ({
            ...prevState,
            username: '',
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
    registerUser();
  };

  return (
    <>
      <h6 className="d-flex align-items-center">
        <PersonPlusFill />
        <span className="ml-2">Create account</span>
      </h6>
      <Form className="mb-2" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="New Username"
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
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
          show={usernameError}
          target={refUsername.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="error-tooltip small" {...props}>
              <b>USER ALREADY EXIST</b>
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
    </>
  );
}

export default AccountRegister;
