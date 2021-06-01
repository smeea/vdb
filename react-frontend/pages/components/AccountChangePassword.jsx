import React, { useState, useRef } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import LockFill from '../../assets/images/icons/lock-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';
import ErrorOverlay from './ErrorOverlay.jsx';

function AccountChangePassword(props) {
  const [state, setState] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyNewPassword, setEmptyNewPassword] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const refOldPassword = useRef(null);
  const refNewPassword = useRef(null);
  const refConfirmPassword = useRef(null);

  const [hidePassword, setHidePassword] = useState(true);
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changePassword = () => {
    setPasswordError(false);

    if (state.password && state.newPassword == state.confirmPassword) {
      setEmptyPassword(false);
      setEmptyNewPassword(false);
      setPasswordConfirmError(false);

      const url = `${process.env.API_URL}account`;
      const input = {
        password: state.password,
        newPassword: state.newPassword,
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
          setButtonState(true);
          setTimeout(() => {
            setButtonState(false);
          }, 1000);
          setState({
            password: '',
            newPassword: '',
            confirmPassword: '',
          });
        })
        .catch((error) => {
          setPasswordError(true);
          setState((prevState) => ({
            ...prevState,
            password: '',
          }));
        });
    } else {
      setEmptyPassword(!state.password);
      setEmptyNewPassword(!state.newPassword);
      if (
        state.confirmPassword != state.newPassword ||
        !state.confirmPassword
      ) {
        setPasswordConfirmError(true);
      } else {
        setPasswordConfirmError(false);
      }
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changePassword();
  };

  return (
    <>
      <h6 className="d-flex align-items-center px-1">
        <LockFill />
        <span className="ml-2">Change password</span>
      </h6>
      <Form className="my-1" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="Old password"
            type={hidePassword ? 'password' : 'text'}
            name="password"
            value={state.password}
            onChange={handleChange}
            ref={refOldPassword}
          />
          <FormControl
            placeholder="New password"
            type={hidePassword ? 'password' : 'text'}
            name="newPassword"
            value={state.newPassword}
            onChange={handleChange}
            ref={refNewPassword}
          />
          <FormControl
            placeholder="Confirm password"
            type={hidePassword ? 'password' : 'text'}
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            ref={refConfirmPassword}
          />
          <InputGroup.Append>
            <Button
              tabIndex="-1"
              variant="outline-secondary"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeFill /> : <EyeSlashFill />}
            </Button>
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
        <ErrorOverlay
          show={emptyPassword}
          target={refOldPassword.current}
          placement="bottom"
        >
          ENTER OLD PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refOldPassword.current}
          placement="bottom"
        >
          WRONG OLD PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyNewPassword}
          target={refNewPassword.current}
          placement="bottom"
        >
          ENTER NEW PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordConfirmError}
          target={refConfirmPassword.current}
          placement="bottom"
        >
          NEW PASSWORDS DOES NOT MATCH
        </ErrorOverlay>
      </Form>
    </>
  );
}

export default AccountChangePassword;
