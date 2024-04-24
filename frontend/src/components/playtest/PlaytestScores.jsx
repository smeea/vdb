import React from 'react';
import Star from '@/assets/images/icons/star.svg?react';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import { useApp } from '@/context';

const PlaytestScores = ({ value, handleClick, isSmall }) => {
  const { isMobile } = useApp();
  const SIZE = isSmall ? (isMobile ? '16' : '20') : isMobile ? '22' : '24';

  const titles = [
    'Useless / Unplayable',
    'Extremely weak',
    'Very weak',
    'Weak',
    'Average, on the weaker side',
    'Average, on the stronger side',
    'Strong',
    'Very strong',
    'Extremely Strong',
    'Overpowered / Broken',
  ];

  return (
    <div className="flex px-1 gap-1.5 sm:gap-2">
      {Array.apply(null, Array(10)).map((i, idx) => {
        return (
          <div
            key={idx}
            className={`flex ${handleClick ? 'cursor-pointer' : ''}`}
            onClick={handleClick ? () => handleClick(idx + 1) : null}
            title={titles[idx]}
          >
            {idx < value ? (
              <StarFill width={SIZE} height={SIZE} />
            ) : (
              <Star width={SIZE} height={SIZE} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlaytestScores;
