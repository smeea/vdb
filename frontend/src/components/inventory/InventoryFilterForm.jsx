import React from 'react';
import {
  ResultLibraryTypeImage,
  ResultDisciplineImage,
  ResultClanImage,
} from '@/components';
import { Select } from '@/components';

const InventoryFilterForm = ({
  value,
  setValue,
  values,
  target,
  byTotal,
  byUnique,
}) => {
  const options = [];

  values.map((i) => {
    options.push({
      value: i,
      label: (
        <div className="flex justify-between">
          {target === 'crypt' && (
            <div>
              {i === 'All' ? (
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

          {target === 'type' && (
            <div>
              {i === 'All' ? (
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

          {target === 'discipline' && (
            <div>
              {['All', 'None'].includes(i) ? (
                <div className="flex items-center">
                  <div className="flex w-[40px]" />
                  {i === 'All' ? 'All Disciplines' : 'None'}
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
