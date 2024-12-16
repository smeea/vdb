import React from 'react';
import { Select } from '@/components';
import EyeFill from '@icons/eye-fill.svg?react';
import { CardImage, Tooltip } from '@/components';
import { NAME, ID, SET, DATE, POD } from '@/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const DeckProxyTableSetSelect = ({ card, value, handleSetSelector }) => {
  const setOptions = [
    {
      value: '',
      id: card[ID],
      label: <div className="text-sm">Newest</div>,
    },
  ];

  Object.keys(setsAndPrecons).map((i) => {
    if (card[SET][i] && i !== POD) {
      setOptions.push({
        value: i.toLowerCase(),
        id: card[ID],
        label: (
          <div className="text-sm">
            {setsAndPrecons[i][NAME]}
            {setsAndPrecons[i][DATE] ? ` '${setsAndPrecons[i][DATE].slice(2, 4)}` : null}
          </div>
        ),
      });
    }
  });

  return (
    <>
      <td className="min-w-[165px]">
        <Select
          options={setOptions}
          isSearchable={false}
          name="set"
          placeholder="Set"
          value={setOptions.find((obj) => value && obj.value === value.toLowerCase)}
          onChange={handleSetSelector}
        />
      </td>
      <td className="min-w-[25px]">
        <div className="flex items-center justify-center">
          <Tooltip overlay={<CardImage card={card} set={value ?? null} />} noPadding>
            <EyeFill />
          </Tooltip>
        </div>
      </td>
    </>
  );
};

export default DeckProxyTableSetSelect;
