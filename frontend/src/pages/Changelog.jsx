import React, { useState, useEffect } from 'react';
import { Banner } from 'components';

const Changelog = () => {
  const [changes, setChanges] = useState();

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
    <div className="about-container mx-auto">
      <div className="space-y-6">
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
