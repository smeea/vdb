import React, { useState } from 'react';
import { FormControl, InputGroup, Modal, Button } from 'react-bootstrap';

function AccountDeleteConfirmation(props) {
  const [password, setPassword] = useState(undefined);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleChange = (event) => setPassword(event.target.value);

  const deleteAccount = () => {
    setPasswordError(false);

    if (password) {
      setEmptyPassword(false);

      const url = `${process.env.API_URL}account/remove`;
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
          props.setShow(false);
          props.setUsername(undefined);
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
          <h5>
            DELETE ACCOUNT
            <span className="px-1 pl-1">
              <b>{props.username}</b>
            </span>
          </h5>
        </Modal.Header>
        <Modal.Body>
          <h6>
            THIS CANNOT BE UNDONE!
          </h6>
          This will also delete all your decks and they will not be available via URL anymore.
        </Modal.Body>
        <Modal.Footer>
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Enter password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={deleteAccount}>
                Delete
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => props.setShow(false)}
              >
                Cancel
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {passwordError && (
            <div>
              <span className="login-error">Wrong password</span>
            </div>
          )}
          {emptyPassword && (
            <div>
              <span className="login-error">Enter password</span>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountDeleteConfirmation;
