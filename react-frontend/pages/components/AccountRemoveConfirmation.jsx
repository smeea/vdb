import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AccountRemoveConfirmation(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleCancel} animation={false}>
        <Modal.Header closeButton>
          Delete account <span className='px-1'><b><i>{props.username}</i></b>?</span>
        </Modal.Header>
        <Modal.Body>
          THIS CANNOT BE UNDONE!
          <br />
          <input
            placeholder='Password'
            type='text'
            name='password'
            value={props.password}
            onChange={props.handleChange}
          />
          <Button variant="outline-secondary" onClick={props.handleConfirm}>
            Delete
          </Button>
          <Button variant="outline-secondary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountRemoveConfirmation;
