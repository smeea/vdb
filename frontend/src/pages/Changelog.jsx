import React from 'react';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Changelog = () => {
  return (
    <div className="search-container flex justify-center mx-auto">
      <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
        <div className="py-4">
          <Banner />
        </div>
        <div className="text-blue py-1 text-xl font-bold underline">
          CHANGELOG
        </div>
        <div className="space-y-4">
          {changes.map((item) => (
            <div key={item.version}>
              <div className="text-blue py-1 font-bold">{item.version}:</div>
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
