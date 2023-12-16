import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Banner, TextWithLinks } from '@/components';

const Changelog = () => {
  const loaderData = useLoaderData();

  return (
    <div className="about-container mx-auto">
      <div className="sm:mb-6">
        <Banner />
      </div>
      <div className="space-y-4 max-sm:p-3">
        <Await resolve={loaderData.changes}>
          {(changes) => (
            <>
              <div className="text-xl font-bold text-fgSecondary underline dark:text-fgSecondaryDark">
                CHANGELOG
              </div>
              {changes.map((item) => (
                <div key={item.version}>
                  <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                    {item.version}:
                  </div>
                  <ul className="space-y-1">
                    {item.changes.map((change, idx) => (
                      <li key={idx}>
                        <TextWithLinks>{change}</TextWithLinks>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </Await>
      </div>
    </div>
  );
};

export default Changelog;
