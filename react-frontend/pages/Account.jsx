import React from "react";
import AccountLogin from "./components/AccountLogin.jsx";
import AccountRegister from "./components/AccountRegister.jsx";

function Greetings(props) {
  return (
    <div className='pb-3 pt-3'>
      <h6>
        Account:
      </h6>
      <b>Logged as:</b> {props.username}
      <input type="button" label="WhoAmI" value="WhoAmI" onClick={props.whoAmI} />
    </div>
  );
}

function Account(props) {
  return (
    <div className="container main-container py-xl-3 px-0 px-xl-2">
      <div className="row mx-0">
        <div className="col-xs-12 col-xl-1 left-col px-0 px-xl-2">
        </div>
        <div className="col-xs-12 col-xl-7 center-col px-0 px-xl-2">
          <Greetings whoAmI={props.whoAmI} username={props.username} />
          <AccountLogin updateUsername={props.updateUsername} />
          <AccountRegister />
        </div>
        <div className="col-xs-12 col-xl-4 right-col px-0 px-xl-2">
        </div>
      </div>
    </div>
  )
}

export default Account;
