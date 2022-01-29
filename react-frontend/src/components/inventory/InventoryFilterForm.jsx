import React from 'react';
import { ResultDisciplineImage, ResultClanImage } from 'components';
import Select from 'react-select';

function InventoryFilterForm(props) {
  const options = [];

  props.values.map((i, index) => {
    const imgSrc = `${process.env.ROOT_URL}images/types/${i
      .toLowerCase()
      .replace(/[\s,:!?'.\-]/g, '')}.svg`;

    options.push({
      value: i,
      label: (
        <div className="d-flex justify-content-between">
          {props.target === 'crypt' && (
            <div className="pe-1">
              {i === 'All' ? (
                <div className="px-1">All Clans</div>
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

          {props.target === 'type' && (
            <div className="pe-1">
              {i === 'All' ? (
                <div className="px-1">All Types</div>
              ) : (
                <>
                  <span className="margin-full">
                    <img src={imgSrc} className="type-discipline-image-forms" />
                  </span>
                  {i}
                </>
              )}
            </div>
          )}
          {props.target === 'discipline' && (
            <div className="pe-1">
              {i === 'All' ? (
                <div className="px-1">All Disciplines</div>
              ) : (
                <>
                  <span className="margin-full">
                    {i !== 'None' && (
                      <ResultDisciplineImage
                        className="type-discipline-image-forms"
                        value={i}
                      />
                    )}
                  </span>
                  {i}
                </>
              )}
            </div>
          )}
          <div className="nobr">
            {props.byTotal[i]} ({props.byUnique[i]} uniq)
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
      value={options.find((obj) => obj.value === props.value)}
      onChange={(e) => props.setValue(e.value)}
    />
  );
}

export default InventoryFilterForm;
