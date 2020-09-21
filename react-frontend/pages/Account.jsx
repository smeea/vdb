import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AccountLogin from './components/AccountLogin.jsx';
import AccountLogout from './components/AccountLogout.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import AccountChangePassword from './components/AccountChangePassword.jsx';
import AccountChangeEmail from './components/AccountChangeEmail.jsx';

function Account(props) {
  return (
    <div className='container px-0 py-xl-3 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-2 col-xl-2 left-col px-0 px-xl-2'>
        </div>
        <div className='col-md-12 col-lg-8 col-xl-8 center-col px-0 px-xl-2'>
          { props.username
            ? <>
                <div className='d-flex justify-content-between'>
                  <div>
                    Logged as: <b>{props.username}{' '}</b>
                  </div>
                  <div>
                    <AccountLogout setUsername={props.setUsername} />
                  </div>
                </div>
                <AccountChangePassword />
                <AccountChangeEmail />
              </>
            : <>
                <AccountLogin setUsername={props.setUsername} />
                <AccountRegister setUsername={props.setUsername} />
              </>
          }
        </div>
        <div className='col-xs-12 col-xl-4 right-col px-0 px-xl-2'>
        </div>
      </div>
    </div>
  );
}

export default Account;
