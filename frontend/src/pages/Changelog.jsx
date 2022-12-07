import React from 'react';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Changelog = () => {
  return (
    <div className="search-container mx-auto">
      <div className="flex flex-row justify-center">
        <div className="basis-full px-0 md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
          <Banner />
          <div className="pt-lg-3 px-3 pt-0">
            <div className="text-blue text-lg font-bold underline">
              CHANGELOG
            </div>

            {changes.map((item) => (
              <div className="py-1" key={item.version}>
                <div className="text-blue pb-1 font-bold">{item.version}:</div>
                <ul>
                  {item.changes.map((change, idx) => (
                    <li key={idx} className="pb-1">
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
