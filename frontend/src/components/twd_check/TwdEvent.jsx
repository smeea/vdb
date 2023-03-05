import React from 'react';
import { useDeckCrypt, useDeckLibrary, useFetch } from '@/hooks';

const TwdEvent = ({ deckData }) => {
  const url = `${import.meta.env.VITE_API_URL}/twd/event/${deckData.id}`;
  const { value } = useFetch(url, {}, [deckData.id]);

  const countriesFixes = {
    // X: "Australia",
    // X: "Austria",
    // X: "Belarus",
    // X: "Belgium",
    // X: "Brazil",
    // X: "Canada",
    // X: "Chile",
    // X: "Croatia",
    // X: "Czech Republic",
    // X: "Denmark",
    // X: "England",
    // X: "Finland",
    FR: 'France',
    // X: "Germany",
    // X: "Greece",
    // X: "Hungary",
    // X: "Iceland",
    // X: "Ireland",
    // X: "Italy",
    // X: "Japan",
    // X: "Lithuania",
    // X: "Mexico",
    // X: "Netherlands",
    // X: "Norway",
    // X: "Online",
    // X: "Poland",
    // X: "Portugal",
    // X: "Russia",
    // X: "Scotland",
    // X: "Serbia",
    // X: "Singapore",
    // X: "Slovakia",
    // X: "South Africa",
    // X: "Spain",
    // X: "Sweden",
    // X: "Switzerland",
    // X: "Wales",
    US: 'USA',
  };

  const country = countriesFixes[value?.venue_country] ?? value?.venue_country;
  const city = value?.venue_city;
  const venue = value?.venue_name;
  const location = country
    ? `${venue ? `${venue}, ` : ''}${city}, ${country}` || ''
    : 'Unknown';

  const veknEvent = {
    name: value?.event_name,
    format: value?.rounds,
    location: location,
    url: `https://www.vekn.net/event-calendar/event/${value?.event_id}`,
  };

  const {
    hasWrongGroups,
    hasBanned: cryptHasBanned,
    cryptTotal,
  } = useDeckCrypt(deckData.deck.crypt);

  const { hasBanned: libraryHasBanned, libraryTotal } = useDeckLibrary(
    deckData.deck.library
  );

  const cryptQtyError = cryptTotal < 12;
  const libraryQtyError = libraryTotal > 90 || libraryTotal < 60;

  return (
    <div>
      <div className="px-0.5 text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
        EVENT AT VEKN.NET{deckData.id ? ` - ${deckData.id}` : ''}
      </div>
      <>
        {value && value.event_id === deckData.id ? (
          <div className="font-mono text-sm p-1">
            <div
              className={
                deckData.event === veknEvent.name
                  ? ''
                  : 'decoration-fgRed underline'
              }
            >
              {veknEvent.name}
            </div>
            <div
              className={
                deckData.location === veknEvent.location
                  ? ''
                  : 'decoration-fgRed underline'
              }
            >
              {veknEvent.location}
            </div>
            <br />
            <div
              className={
                deckData.format === veknEvent.format
                  ? ''
                  : 'decoration-fgRed underline'
              }
            >
              {veknEvent.format}
            </div>
            <br />
            <br />
            <div>
              <a
                className={
                  deckData.url === veknEvent.url
                    ? ''
                    : 'decoration-fgRed underline'
                }
                href={veknEvent.url}
                rel="noreferrer"
                target="_blank"
              >
                {veknEvent.url}
              </a>
            </div>
            <br />
            {hasWrongGroups && (
              <div className="text-fgRed dark:text-fgRedDark">
                Crypt has non-matching groups
              </div>
            )}
            {cryptQtyError && (
              <div className="text-fgRed dark:text-fgRedDark">
                Crypt has &lt;12 cards
              </div>
            )}
            {libraryQtyError && (
              <div className="text-fgRed dark:text-fgRedDark">
                Library has &lt;60 or &gt;90 cards
              </div>
            )}

            {cryptHasBanned && (
              <div className="text-fgRed dark:text-fgRedDark">
                Crypt has banned cards
              </div>
            )}
            {libraryHasBanned && (
              <div className="text-fgRed dark:text-fgRedDark">
                Library has banned cards
              </div>
            )}
          </div>
        ) : (
          <>Loading...</>
        )}
      </>
    </div>
  );
};

export default TwdEvent;
