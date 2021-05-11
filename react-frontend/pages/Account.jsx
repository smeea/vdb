import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AccountLogin from './components/AccountLogin.jsx';
import AccountLogout from './components/AccountLogout.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import AccountChangePassword from './components/AccountChangePassword.jsx';
import AccountChangeEmail from './components/AccountChangeEmail.jsx';
import AccountChangeName from './components/AccountChangeName.jsx';
import AccountDelete from './components/AccountDelete.jsx';
import PersonFill from '../assets/images/icons/person-fill.svg';
import AppContext from '../context/AppContext';

function Account(props) {
  const { username } = useContext(AppContext);

  return (
    <Container className="main-container">
      <Row className="h-75 align-items-center justify-content-center">
        <Col md={12} lg={5}>
          {username ? (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="d-flex align-items-center px-1">
                  <PersonFill />
                  <span className="ml-2">Logged as: {username}</span>
                </h6>
                <div>
                  <AccountLogout />
                </div>
              </div>
              <div className="py-2">
                <AccountChangeName />
              </div>
              <div className="py-2">
                <AccountChangePassword />
              </div>
              <div className="py-2">
                <AccountChangeEmail />
              </div>
              <div className="py-2">
                <AccountDelete />
              </div>
            </>
          ) : (
            <>
              <div className="py-2">
                <AccountLogin />
              </div>
              <div className="py-2">
                <AccountRegister />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
