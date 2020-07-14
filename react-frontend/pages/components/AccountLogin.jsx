import React, { useState } from 'react';

function AccountLogin(props) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const logoutUser = () => {
    console.log('submit logout button');

    const url = 'http://127.0.0.1:5001/api/logout';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);
    props.updateUsername(undefined);
  };

  const handleChange = event => {
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const loginUser = () => {
    const url = 'http://127.0.0.1:5001/api/login';
    let input = {
      username: state.username,
      password: state.password,
      remember: 'True',
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then(result => result.json());

    props.updateUsername(state.username);
  };

  return (
    <div>
      <h6>Login</h6>
      <form>
        <input
          placeholder="Username"
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="text"
          name="password"
          id="password"
          value={state.password}
          onChange={handleChange}
        />
        <input type="button" label="Login" value="Login" onClick={loginUser} />
        <input type="button" label="Logout" value="Logout" onClick={logoutUser} />
      </form>
    </div>
  );
}

export default AccountLogin;
