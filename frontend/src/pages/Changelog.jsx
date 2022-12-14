import React from 'react';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Changelog = () => {
  const TOP_SPACING = 'pt-8';
  const Y_SPACING = 'space-y-8';

  return (
    <div className="search-container flex justify-center">
      <div
        className={`basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2 ${TOP_SPACING} ${Y_SPACING}`}
      >
        <Banner />
        <div className="space-y-4">
          <div className="text-blue text-xl font-bold underline">CHANGELOG</div>
          {changes.map((item) => (
            <div key={item.version}>
              <div className="text-blue font-bold">{item.version}:</div>
              <ul className="space-y-1">
                {item.changes.map((change, idx) => (
                  <li key={idx}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Changelog;
