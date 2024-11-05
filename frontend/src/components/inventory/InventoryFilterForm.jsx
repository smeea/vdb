import React from 'react';
import {
  Select,
  ResultLibraryTypeImage,
  ResultDisciplineImage,
  ResultClanImage,
} from '@/components';
import { ALL, CRYPT, TYPE, DISCIPLINE, NONE } from '@/constants';

const InventoryFilterForm = ({ value, setValue, values, target, byTotal, byUnique }) => {
  const options = [];

  values.map((i) => {
    options.push({
      value: i,
      label: (
        <div className="flex justify-between">
          {target === CRYPT && (
            <div>
              {i === ALL ? (
                <div className="flex items-center">
                  <div className="flex w-[40px]" />
                  All Clans
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex w-[40px] justify-center">
                    <ResultClanImage value={i} />
                  </div>
                  {i}
                </div>
              )}
            </div>
          )}

          {target === TYPE && (
            <div>
              {i === ALL ? (
                <div className="flex items-center">
                  <div className="flex w-[40px]" />
                  All Types
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex w-[40px]">
                    <ResultLibraryTypeImage value={i} />
                  </div>
                  {i}
                </div>
              )}
            </div>
          )}

          {target === DISCIPLINE && (
            <div>
              {[ALL, NONE].includes(i) ? (
                <div className="flex items-center">
                  <div className="flex w-[40px]" />
                  {i === ALL ? 'All Disciplines' : NONE}
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex w-[40px]">
                    <ResultDisciplineImage value={i} />
                  </div>
                  {i}
                </div>
              )}
            </div>
          )}
          <div className="whitespace-nowrap">
            {byTotal[i]} {byUnique ? `(${byUnique[i]} uniq)` : null}
          </div>
        </div>
      ),
    });
  });

  return (
    <Select
      options={options}
      placeholder="Select Filter"
      value={options.find((obj) => obj.value === value)}
      onChange={(e) => setValue(e.value)}
    />
  );
};

export default InventoryFilterForm;
