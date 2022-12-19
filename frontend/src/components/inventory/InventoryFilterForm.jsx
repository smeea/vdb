import React from 'react';
import { ResultDisciplineImage, ResultClanImage } from 'components';
import Select from 'react-select';

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
    const imgSrc = `${process.env.ROOT_URL}images/types/${i
      .toLowerCase()
      .replace(/[\s,:!?'.-]/g, '')}.svg`;

    options.push({
      value: i,
      label: (
        <div className="flex justify-between">
          {target === 'crypt' && (
            <div>
              {i === 'All' ? (
                <div>All Clans</div>
              ) : (
                <>
                  <span className="margin-full">
                    <ResultClanImage value={i} />
                  </span>
                  {i}
                </>
              )}
            </div>
          )}

          {target === 'type' && (
            <div>
              {i === 'All' ? (
                <div>All Types</div>
              ) : (
                <>
                  <span className="margin-full">
                    <img src={imgSrc} className="w-[25px] discipline-image" />
                  </span>
                  {i}
                </>
              )}
            </div>
          )}
          {target === 'discipline' && (
            <div>
              {i === 'All' ? (
                <div>All Disciplines</div>
              ) : (
                <>
                  <span className="margin-full">
                    {i !== 'None' && (
                      <ResultDisciplineImage
                        className="w-[25px discipline-image"
                        value={i}
                      />
                    )}
                  </span>
                  {i}
                </>
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
      classNamePrefix="react-select"
      options={options}
      placeholder="Select Filter"
      value={options.find((obj) => obj.value === value)}
      onChange={(e) => setValue(e.value)}
    />
  );
};

export default InventoryFilterForm;
