import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AccountLogin from './components/AccountLogin.jsx';
import AccountLogout from './components/AccountLogout.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import AccountChangePassword from './components/AccountChangePassword.jsx';
import AccountChangeEmail from './components/AccountChangeEmail.jsx';
import AccountChangeName from './components/AccountChangeName.jsx';
import AccountDelete from './components/AccountDelete.jsx';
import PersonFill from '../assets/images/icons/person-fill.svg';

function Account(props) {
  return (
    <Container className="main-container">
      <Row>
        <Col>
          {props.username ? (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="d-flex align-items-center">
                  <PersonFill />
                  <span className="ml-2">
                    Logged as: {props.username}
                  </span>
                </h6>
                <div>
                  <AccountLogout setUsername={props.setUsername} />
                </div>
              </div>
              <AccountChangeName
                setPublicName={props.setPublicName}
                publicName={props.publicName}
              />
              <AccountChangePassword />
              <AccountChangeEmail
                setEmail={props.setEmail}
                email={props.email}
              />
              <AccountDelete
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
