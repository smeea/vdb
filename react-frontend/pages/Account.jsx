import React from 'react';
import AccountLogin from './components/AccountLogin.jsx';
import AccountLogout from './components/AccountLogout.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import AccountChangePassword from './components/AccountChangePassword.jsx';
import AccountChangeEmail from './components/AccountChangeEmail.jsx';
import AccountChangeName from './components/AccountChangeName.jsx';
import AccountRemove from './components/AccountRemove.jsx';

function Account(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-2"></div>
        <div className="col-md-12 col-lg-8">
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
        </div>
        <div className="col-md-12 col-lg-2"></div>
      </div>
    </div>
  );
}

export default Account;
