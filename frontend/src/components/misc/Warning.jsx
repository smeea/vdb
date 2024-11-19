import React from 'react';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg?react';
import { ResultLegalIcon } from '@/components';
import { TITLE, TEXT, LIMITED, GROUPS, BANNED, LEGAL, PLAYTEST } from '@/constants';

const Warning = ({ type, value = 'WARNING', title = '' }) => {
  const types = {
    [GROUPS]: {
      [TEXT]: 'GROUPS',
      [TITLE]: 'Bad Groups',
    },
    [BANNED]: {
      [TEXT]: 'BANNED',
      [TITLE]: 'Banned Cards',
      icon: <ResultLegalIcon type={BANNED} value={BANNED} className="flex" />,
    },
    [PLAYTEST]: {
      [TEXT]: 'PLAYTEST',
      [TITLE]: 'Playtest Cards',
      icon: <ResultLegalIcon type={PLAYTEST} value={PLAYTEST} className="flex" />,
    },
    [LEGAL]: {
      [TEXT]: 'LEGAL',
      [TITLE]: `Not Tournament Legal until ${value}`,
      icon: <ResultLegalIcon type={LEGAL} value={value} className="flex" />,
    },
    [LIMITED]: {
      [TEXT]: 'LIMITED',
      [TITLE]: 'Cards Excluded in Limited Format',
    },
  };

  return (
    <div
      className="dark:text-fgedDark flex items-center gap-0.5 whitespace-nowrap text-fgRed"
      title={title ?? types?.[type]?.[TITLE]}
    >
      {types?.[type]?.icon ?? <Exclamation width="15" height="15" viewBox="0 0 16 16" />}
      <div className="flex items-center">{types?.[type]?.[TEXT] ?? value}</div>
    </div>
  );
};

export default Warning;
