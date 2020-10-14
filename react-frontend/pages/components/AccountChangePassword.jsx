import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LockFill from '../../assets/images/icons/lock-fill.svg';

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
      <h6>
        <LockFill />
        Change password
      </h6>
      <div className="d-flex">
        <div>
          <input
            placeholder="Old password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          {emptyPassword && (
            <div>
              <span className="login-error">Enter old password</span>
            </div>
          )}
          {passwordError && (
            <div>
              <span className="login-error">Wrong password</span>
            </div>
          )}
        </div>
        <div>
          <input
            placeholder="New password"
            type="password"
            name="newPassword"
            value={state.newPassword}
            onChange={handleChange}
          />
          {emptyNewPassword && (
            <div>
              <span className="login-error">Enter new password</span>
            </div>
          )}
        </div>
        <div>
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
          />
          {passwordConfirmError && (
            <div>
              <span className="login-error">Confirm new password</span>
            </div>
          )}
        </div>
        <Button variant="outline-secondary" onClick={changePassword}>
          Change
        </Button>
      </div>
    </>
  );
}

export default AccountChangePassword;
