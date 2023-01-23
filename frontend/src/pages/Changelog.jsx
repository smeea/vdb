import React, { useState, useEffect } from 'react';
import { Banner } from 'components';

const Changelog = () => {
  const [changes, setChanges] = useState();
  const TOP_SPACING = 'pt-8';
  const Y_SPACING = 'space-y-8';

  useEffect(() => {
    const url = `${process.env.API_URL}changelog`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setChanges(data);
      });
  }, []);

  return (
    <div className="search-container mx-auto flex justify-center">
      <div
        className={`basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2 ${TOP_SPACING} ${Y_SPACING}`}
      >
        <Banner />
        <div className="space-y-4">
          {changes && (
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
                      <li key={idx}>{change}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changelog;
