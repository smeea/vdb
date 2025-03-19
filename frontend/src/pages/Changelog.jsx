import { Await, useLoaderData } from 'react-router';
import { Banner, TextWithLinks } from '@/components';

const Changelog = () => {
  const loaderData = useLoaderData();

  return (
    <div className="about-container mx-auto">
      <div className="sm:mb-6">
        <Banner />
      </div>
      <Await resolve={loaderData}>
        {(changes) => (
          <div className="flex flex-col gap-3 max-sm:p-3">
            <div className="text-fgSecondary dark:text-fgSecondaryDark text-xl font-bold underline">
              CHANGELOG
            </div>
            <div className="flex flex-col gap-5">
              {changes.map((item) => (
                <div className="flex flex-col gap-1.5" key={item.version}>
                  <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">
                    {item.version}:
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {item.changes.map((change, idx) => (
                      <li key={idx}>
                        <TextWithLinks>{change}</TextWithLinks>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </Await>
    </div>
  );
};

export default Changelog;
