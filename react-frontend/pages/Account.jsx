import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AccountLogin from './components/AccountLogin.jsx';
import AccountLogout from './components/AccountLogout.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import AccountChangePassword from './components/AccountChangePassword.jsx';
import AccountChangeEmail from './components/AccountChangeEmail.jsx';
import AccountChangeName from './components/AccountChangeName.jsx';
import AccountRemove from './components/AccountRemove.jsx';

function Account(props) {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col lg={8}>
          {props.username ? (
            <>
              <div className="d-flex justify-content-between">
                <div>
                  Login: <b>{props.username}</b>
                  <br />
                  Public Name: <b>{props.publicName}</b>
                  <br />
                  Email: <b>{props.email}</b>
                </div>
                <div>
                  <AccountLogout setUsername={props.setUsername} />
                </div>
              </div>
              <br />
              <AccountChangeName setPublicName={props.setPublicName} />
              <AccountChangePassword />
              <AccountChangeEmail setEmail={props.setEmail} />
              <AccountRemove
                username={props.username}
                setUsername={props.setUsername}
              />
            </>
          ) : (
            <>
              <AccountLogin setUsername={props.setUsername} />
              <AccountRegister setUsername={props.setUsername} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
