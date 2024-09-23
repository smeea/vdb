import React from 'react';
import PersonFillExclamation from '@/assets/images/icons/person-fill-exclamation.svg?react';
import { ListEntry, PlaytestLanguageSelector } from '@/components';
import { useApp } from '@/context';
import { LIAISON } from '@/utils/constants';

const PlaytestUserCard = () => {
  const { playtestInfo } = useApp();

  return (
    <div className="flex flex-col gap-5 sm:gap-6 sm:p-0">
      <PlaytestLanguageSelector />
      <ListEntry icon={<PersonFillExclamation />} title="Liaison">
        {playtestInfo?.[LIAISON] ?? 'Please contact your liaison to update profile'}
      </ListEntry>
    </div>
  );
};

export default PlaytestUserCard;
