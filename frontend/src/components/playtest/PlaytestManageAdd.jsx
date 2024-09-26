import React, { useState } from 'react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import { Spinner, Input, Button, ErrorOverlay } from '@/components';
import { playtestServices } from '@/services';

const PlaytestManageAdd = ({ playtesters, newPlaytesters, setNewPlaytesters }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const addPlaytester = () => {
    if ([...newPlaytesters, ...Object.keys(playtesters)].includes(username)) {
      setError('ALREADY PLAYTESTER');
      return;
    }

    setIsLoading(true);
    setError(false);

    playtestServices
      .changePlaytester(username)
      .then(() => {
        setNewPlaytesters([...newPlaytesters, username]);
        setUsername('');
      })
      .catch(() => setError('USER DOES NOT EXIST'))
      .finally(() => setIsLoading(false));
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
    <form className="w-full" onSubmit={handleSubmit}>
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

export default PlaytestManageAdd;
