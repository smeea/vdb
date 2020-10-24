import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import LockFill from '../../assets/images/icons/lock-fill.svg';
import EyeFill from '../../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../../assets/images/icons/eye-slash-fill.svg';

function AccountChangePassword(props) {
  const [state, setState] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [emptyNewPassword, setEmptyNewPassword] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changePassword = () => {
    setPasswordError(false);

    if (state.confirmPassword != state.newPassword || !state.confirmPassword) {
      setPasswordConfirmError(true);
    } else if (state.newPassword && state.password) {
      setEmptyPassword(false);
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
          if (response.ok) {
            response.json();
          } else {
            throw Error(`Error: ${response.status}`);
          }
        })
        .then((data) => {
          console.log('changed password');
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

    !state.newPassword ? setEmptyNewPassword(true) : setEmptyNewPassword(false);
    !state.password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  return (
    <>
      <h6 className="d-flex align-items-center">
        <LockFill />
        <span className="ml-2">
          Change password
        </span>
      </h6>
      <InputGroup className="mb-2">
        {hidePassword ? (
          <>
            <FormControl
              placeholder="Old password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <FormControl
              placeholder="New password"
              type="password"
              name="newPassword"
              value={state.newPassword}
              onChange={handleChange}
            />
            <FormControl
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <FormControl
              placeholder="Old password"
              type="text"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <FormControl
              placeholder="New password"
              type="text"
              name="newPassword"
              value={state.newPassword}
              onChange={handleChange}
            />
            <FormControl
              placeholder="Confirm password"
              type="text"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </>
        )}
        <InputGroup.Append>
          <Button variant="outline-secondary"
                  onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          <Button variant="outline-secondary" onClick={changePassword}>
            <Check2 size={20} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {passwordConfirmError && (
        <div>
          <span className="login-error">Confirm new password</span>
        </div>
      )}
      {emptyPassword && (
        <div>
          <span className="login-error">Enter old password</span>
        </div>
      )}
      {emptyNewPassword && (
        <div>
          <span className="login-error">Enter new password</span>
        </div>
      )}
      {passwordError && (
        <div>
          <span className="login-error">Wrong password</span>
        </div>
      )}
    </>
  );
}

export default AccountChangePassword;
