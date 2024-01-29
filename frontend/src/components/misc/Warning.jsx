import React from 'react';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg?react';
import { ResultLegalIcon } from '@/components';
import { BANNED, LEGAL, PLAYTEST } from '@/utils/constants';

const Warning = ({ type, value = 'WARNING', title = '' }) => {
  const types = {
    GROUPS: {
      text: 'GROUPS',
      title: `Bad Groups`,
    },
    BANNED: {
      text: 'BANNED',
      title: 'Banned Cards',
      icon: <ResultLegalIcon type={BANNED} value={BANNED} className="flex" />,
    },
    PLAYTEST: {
      text: 'PLAYTEST',
      title: 'Playtest',
      icon: (
        <ResultLegalIcon type={PLAYTEST} value={PLAYTEST} className="flex" />
      ),
    },
    LEGAL: {
      text: 'LEGAL',
      title: `Not Tournament Legal until ${value}`,
      icon: <ResultLegalIcon type={LEGAL} value={value} className="flex" />,
    },
    LIMITED: {
      text: 'LIMITED',
      title: 'Cards Excluded in Limited Format',
    },
  };

  return (
    <div
      className="flex items-center gap-0.5 dark:text-fgedDark whitespace-nowrap text-fgRed"
      title={types?.[type]?.title ?? title}
    >
      {types?.[type]?.icon ?? (
        <Exclamation width="15" height="15" viewBox="0 0 16 16" />
      )}
      <div className="flex items-center">{types?.[type]?.text ?? value}</div>
    </div>
  );
};

export default Warning;
