import React, { useState } from 'react';
import Spinner from '@/assets/images/icons/three-dots.svg';
import Check2 from '@/assets/images/icons/check2.svg';
import { Input, Button, ErrorOverlay } from '@/components';

const AccountPlaytestAdd = ({
  playtesters,
  newPlaytesters,
  setNewPlaytesters,
}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const addPlaytester = () => {
    setIsLoading(true);

    const url = `${import.meta.env.VITE_API_URL}/playtest`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    };

    setError(false);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        if (
          !newPlaytesters.includes(username) &&
          !playtesters.includes(username)
        ) {
          setNewPlaytesters([...newPlaytesters, username]);
          setUsername('');
        } else {
          setError('ALREADY PLAYTESTER');
        }
      })
      .catch(() => {
        setError('USER DOES NOT EXIST');
      });

    setIsLoading(false);
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) addPlaytester();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="relative flex w-full">
          <Input
            placeholder="Add Playtester (login)"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            roundedStyle="rounded rounded-r-none"
          />
          {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
        </div>
        <Button className="rounded-l-none" variant="primary" type="submit">
          {isLoading ? <Spinner /> : <Check2 />}
        </Button>
      </div>
    </form>
  );
};

export default AccountPlaytestAdd;
