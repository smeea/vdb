import React from 'react';
import Calendar2MinusFill from '@/assets/images/icons/calendar2-minus-fill.svg?react';
import EightCircleFill from '@/assets/images/icons/8-circle-fill.svg?react';
import { ListEntry, Select } from '@/components';
import { useApp } from '@/context';
import { ROUND, GAMES_PLAYED } from '@/utils/constants';

const PlaytestRoundReport = () => {
  const { playtestInfo, updatePlaytestProfile } = useApp();
  const CURRENT_ROUND = 2;
  const CURRENT_ROUND_DATE = '2024-09-01';
  let roundOptions = [];
  for (let i = 1; i <= CURRENT_ROUND; i++) {
    roundOptions.push({
      value: i,
      label: `Round ${i}${i == CURRENT_ROUND ? `, started ${CURRENT_ROUND_DATE}` : ''}`,
    });
  }

  const gamesBrackets = [0, 5, 15, 30];
  const gamesOptions = gamesBrackets.map((i, idx) => ({
    value: `${gamesBrackets[idx]}+`,
    label: `${i + 1}${gamesBrackets[idx + 1] ? `...${gamesBrackets[idx + 1]}` : `+`}`,
  }));

  const handleChange = (v, target) => updatePlaytestProfile(target, v.value);

  return (
    <>
      <ListEntry
        icon={<Calendar2MinusFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title="Report for"
      >
        <Select
          options={roundOptions}
          value={roundOptions.find((obj) => obj.value === playtestInfo?.[ROUND])}
          onChange={(e) => handleChange(e, ROUND)}
        />
      </ListEntry>
      <ListEntry
        icon={<EightCircleFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title="Games this round"
      >
        <Select
          options={gamesOptions}
          value={gamesOptions.find((obj) => obj.value === playtestInfo?.[GAMES_PLAYED])}
          onChange={(e) => handleChange(e, GAMES_PLAYED)}
        />
      </ListEntry>
    </>
  );
};

export default PlaytestRoundReport;
