import React, { useState, useEffect } from 'react';
import PersonFillExclamation from '@/assets/images/icons/person-fill-exclamation.svg?react';
import EightCircleFill from '@/assets/images/icons/8-circle-fill.svg?react';
import Calendar2EventFill from '@/assets/images/icons/calendar2-event-fill.svg?react';
import PostcardHeartFill from '@/assets/images/icons/postcard-heart-fill.svg?react';
import {
  Input,
  Textarea,
  Select,
  ListEntry,
  ConditionalTooltipOrModal,
  PlaytestLanguageSelector,
} from '@/components';
import { useApp } from '@/context';
import { GENERAL, GAMES, LIAISON } from '@/utils/constants';

const PlaytestUserCard = () => {
  const { isMobile, playtestProfile, updatePlaytestProfile } = useApp();
  const [liaison, setLiaison] = useState(playtestProfile?.[LIAISON] || '');
  const [general, setGeneral] = useState(playtestProfile?.[GENERAL] || '');

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
    if (liaison != playtestProfile?.[LIAISON]) changeLiaison();
  };

  useEffect(() => {
    if (general !== playtestProfile?.[GENERAL]) setGeneral(playtestProfile?.[GENERAL] ?? '');
  }, [playtestProfile?.[GENERAL]]);

  const handleGeneralChange = (e) => setGeneral(e.target.value);
  const changeGeneral = () => updatePlaytestProfile(GENERAL, general);
  const handleGeneralSubmit = (event) => {
    event.preventDefault();
    changeGeneral();
  };
  const handleGeneralOnBlur = () => {
    if (general != playtestProfile?.[GENERAL]) changeGeneral();
  };

  const handleGamesChange = (e) => updatePlaytestProfile(GAMES, e.value);

  return (
    <div className="flex flex-col gap-5 sm:gap-6 sm:p-0">
      <PlaytestLanguageSelector />
      <ListEntry
        icon={<PersonFillExclamation width="20" height="20" viewBox="0 0 16 16" />}
        title="Liaison"
        basis={3}
      >
        <form className="flex w-full" onSubmit={handleLiaisonSubmit}>
          <Input
            onChange={handleLiaisonChange}
            onBlur={handleLiaisonOnBlur}
            value={liaison}
            placeholder="Enter your liaison name"
          />
        </form>
      </ListEntry>
      <ListEntry
        icon={<EightCircleFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title={
          <div className="flex gap-2">
            Games
            <ConditionalTooltipOrModal
              title="Games Played"
              isModal={isMobile}
              overlay={
                <div className="flex flex-col gap-1">
                  <div>During playtest of this round</div>
                  <div>Online or offline does not matter</div>
                </div>
              }
            >
              <div className="text-fgThird dark:text-fgThirdDark">[?]</div>
            </ConditionalTooltipOrModal>
          </div>
        }
        basis={isMobile ? 2 : 3}
        forceOneLine
      >
        <Select
          className="w-full"
          options={gamesOptions}
          value={gamesOptions.find((obj) => obj.value === playtestProfile?.[GAMES])}
          onChange={handleGamesChange}
        />
      </ListEntry>
      <ListEntry
        icon={<PostcardHeartFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title={
          <div className="flex gap-2">
            Reports
            <ConditionalTooltipOrModal
              title="Total Reports"
              isModal={isMobile}
              overlay={
                <div className="flex flex-col gap-1">
                  <div>Only count reports (cards + precons) from current round</div>
                  <div>Updated on page refresh</div>
                </div>
              }
            >
              <div className="text-fgThird dark:text-fgThirdDark">[?]</div>
            </ConditionalTooltipOrModal>
          </div>
        }
        basis={isMobile ? 2 : 3}
        forceOneLine
      >
        {playtestProfile.reports}
      </ListEntry>
      <ListEntry
        icon={<Calendar2EventFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title="Last Activity"
        basis={isMobile ? 2 : 3}
        forceOneLine
      >
        {playtestProfile.timestamp}
      </ListEntry>
      <ListEntry
        icon={<Calendar2EventFill width="22" heigh="22" viewBox="0 0 16 16" />}
        title="General Opinion about the Expansion"
        forceNewLine
      >
        <form className="flex w-full" onSubmit={handleGeneralSubmit}>
          <Textarea
            rows={5}
            onChange={handleGeneralChange}
            onBlur={handleGeneralOnBlur}
            value={general}
            placeholder="Enter your general opinion about the Expansion"
          />
        </form>
      </ListEntry>
    </div>
  );
};

export default PlaytestUserCard;
