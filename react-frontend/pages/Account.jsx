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
      <Row className="justify-content-center">
        <Col md={12} lg={5} className="px-0">
          {props.username ? (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="d-flex align-items-center">
                  <PersonFill />
                  <span className="ml-2">Logged as: {props.username}</span>
                </h6>
                <div>
                  <AccountLogout setUsername={props.setUsername} />
                </div>
              </div>
              <div className="pb-2 pt-2">
                <AccountChangeName
                  setPublicName={props.setPublicName}
                  publicName={props.publicName}
                  isMobile={props.isMobile}
                />
              </div>
              <div className="pb-2 pt-2">
                <AccountChangePassword />
              </div>
              <div className="pb-2 pt-2">
                <AccountChangeEmail
                  setEmail={props.setEmail}
                  email={props.email}
                  isMobile={props.isMobile}
                />
              </div>
              <div className="pb-2 pt-2">
                <AccountDelete
                  username={props.username}
                  setUsername={props.setUsername}
                />
              </div>
            </>
          ) : (
            <>
              <AccountLogin
                setUsername={props.setUsername}
                isMobile={props.isMobile}
              />
              <AccountRegister
                setUsername={props.setUsername}
                whoAmI={props.whoAmI}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
