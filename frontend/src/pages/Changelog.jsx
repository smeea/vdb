import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Banner } from '@/components';

const Changelog = () => {
  const { changes } = useLoaderData();

  return (
    <div className="about-container mx-auto">
      <div className="sm:pb-6">
        <Banner />
      </div>
      <div className="space-y-4 p-3 sm:p-0">
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
  );
};

export default Changelog;

export const loader = async () => {
  const url = `${import.meta.env.VITE_API_URL}/changelog`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = await fetch(url, options);
  if (!response.ok) return { error: response.status };
  const changes = await response.json();

  return { changes };
};
