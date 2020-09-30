import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AccountRemoveConfirmation(props) {
  const [password, setPassword] = useState(undefined);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleChange = (event) => setPassword(event.target.value);

  const removeAccount = () => {
    setPasswordError(false);
    if (password) {
      const url = process.env.API_URL + 'account/remove';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            response.json();
          } else {
            throw Error(`Error: ${response.status}`);
          }
        })
        .then((data) => {
          setShowConfirmation(false);
          props.setUsername(undefined);
          console.log('Remove account: ', props.username);
        })
        .catch((error) => {
          setPasswordError(true);
          setPassword('');
          console.log(error);
        });
    }
    !password ? setEmptyPassword(true) : setEmptyPassword(false);
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setShow(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          Delete account{' '}
          <span className="px-1">
            <b>
              <i>{props.username}</i>
            </b>
            ?
          </span>
        </Modal.Header>
        <Modal.Body>
          THIS CANNOT BE UNDONE!
          <br />
          <input
            placeholder="Password"
            type="text"
            name="password"
            value={props.password}
            onChange={handleChange}
          />
          <Button variant="outline-secondary" onClick={removeAccount}>
            Delete
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => props.setShow(false)}
          >
            Cancel
          </Button>
          {passwordError && (
            <>
              <br />
              <span className="login-error">Wrong password</span>
            </>
          )}
          {emptyPassword && (
            <>
              <br />
              <span className="login-error">Enter password</span>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountRemoveConfirmation;
