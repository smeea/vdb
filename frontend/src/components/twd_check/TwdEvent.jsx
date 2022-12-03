import React, { useState, useEffect } from 'react';

const TwdEvent = ({ eventId, setEventId }) => {
  const [event, setEvent] = useState({});

  const fetchEvent = async (eventId) => {
    // const url = `https:www.vekn.net/event-calendar/event/${eventId}`;
    // const options = {
    //   method: 'GET',
    // };
    // const response = await fetch(url, options);
    // const json = await response.json();
    const json = await {
      Id: 1000,
      Name: "Nosferatu Hosting Loughman's Birthday",
      Location: 'Heath, Ohio',
      Date: 'December 5th 2021',
      Format: '2R + F',
      Players: '13 players',
      Winner: 'Karl Schaefer',
      Link: `https://www.vekn.net/event-calendar/event/${eventId}`,
      Scores: '2gw8 + 3vp in final',
    };
    setEvent(json);
  };

  useEffect(() => {
    if (eventId && eventId != event.Id) {
      fetchEvent(eventId);
    }
  }, [eventId]);

  return (
    <>
      <div className="flex ps-4">
        <h5>EVENT IN VEKN.NET</h5>
      </div>
      <div className="mt-1.5">
        <pre className="mb-0">{event.Name}</pre>
        <pre className="mb-0">{event.Location}</pre>
        <pre className="mb-0">{event.Date}</pre>
        <pre className="mb-0">{event.Format}</pre>
        <pre className="mb-0">{event.Players}</pre>
        <pre className="mb-0">{event.Winner}</pre>
        <pre>
          <a href={event.Link} rel="noreferrer" target="_blank">
            {event.Link}
          </a>
        </pre>
        <pre className="mb-0"> </pre>
        <pre className="mb-0">-- {event.Scores}</pre>
      </div>
    </>
  );
};

export default TwdEvent;
