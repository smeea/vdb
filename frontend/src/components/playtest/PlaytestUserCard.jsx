import React, { useState, useEffect } from 'react';
import PersonFillExclamation from '@/assets/images/icons/person-fill-exclamation.svg?react';
import EightCircleFill from '@/assets/images/icons/8-circle-fill.svg?react';
import { Input, Select, ListEntry, PlaytestLanguageSelector } from '@/components';
import { useApp } from '@/context';
import { GAMES, LIAISON } from '@/utils/constants';

const PlaytestUserCard = () => {
  const { playtestProfile, updatePlaytestProfile } = useApp();
  const [liaison, setLiaison] = useState(playtestProfile?.[LIAISON] || '');

  const gamesBrackets = ['0', '1-3', '4-6', '7+'];
  const gamesOptions = gamesBrackets.map((i) => ({
    value: i,
    label: i,
  }));

  useEffect(() => {
    if (liaison !== playtestProfile?.[LIAISON]) setLiaison(playtestProfile?.[LIAISON] ?? '');
  }, [playtestProfile?.[LIAISON]]);

  const handleLiaisonChange = (e) => setLiaison(e.target.value);
  const changeLiaison = () => updatePlaytestProfile(LIAISON, liaison);
  const handleLiaisonSubmit = (event) => {
    event.preventDefault();
    changeLiaison();
  };

  const handleLiaisonOnBlur = () => {
    if (liaison != playtestProfile?.[LIAISON]) {
      changeLiaison();
    }
  };

  const handleGamesChange = (e) => updatePlaytestProfile(GAMES, e.value);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 sm:p-0">
      <PlaytestLanguageSelector />
      <ListEntry icon={<PersonFillExclamation />} title="Liaison" basis={3}>
        <form className="flex" onSubmit={handleLiaisonSubmit}>
          <Input
            onChange={handleLiaisonChange}
            onBlur={handleLiaisonOnBlur}
            value={liaison}
            onChange={handleLiaisonChange}
            placeholder="Your playtest liaison name"
          />
        </form>
      </ListEntry>
      <ListEntry
        icon={<EightCircleFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title="Games played"
        basis={3}
      >
        <Select
          options={gamesOptions}
          value={gamesOptions.find((obj) => obj.value === playtestProfile?.[GAMES])}
          onChange={handleGamesChange}
        />
      </ListEntry>
      <ListEntry
        icon={<EightCircleFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title="Last Activity"
        basis={3}
      >
        {playtestProfile.timestamp}
      </ListEntry>
    </div>
  );
};

export default PlaytestUserCard;
