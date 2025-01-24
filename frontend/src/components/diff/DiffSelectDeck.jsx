import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { RadioGroup } from '@headlessui/react';
import { useNavigate } from 'react-router';
import Check2 from '@icons/check2.svg?react';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckSelectPrecon,
  DeckSelectRecent,
  Button,
  Radio,
  Input,
} from '@/components';
import { useApp } from '@/context';
import { IS_BRANCHES, DECKID, FROM, MY, RECENT, PRECONS, URL } from '@/constants';

const DiffSelectDeck = ({ decks, deck, deckidFrom, deckidTo, target, title }) => {
  const { recentDecks, inventoryMode, username, isMobile } = useApp();
  const deckid = target === FROM ? deckidFrom : deckidTo;
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [source, setSource] = useState(`${FROM}-${MY}`);

  const handleSelect = (e) => {
    if (target == FROM) {
      navigate(`/diff/${e.value}/${deckidTo}`);
    } else {
      navigate(`/diff/${deckidFrom}/${e.value}`);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const newId = url.replace(`${import.meta.env.VITE_BASE_URL}/decks/`, '');

    if (target === FROM) {
      navigate(`/diff/${newId}/${deckidTo}`);
    } else {
      navigate(`/diff/${deckidFrom}/${newId}`);
    }
  };

  useEffect(() => {
    if (deckid?.includes(':')) {
      setSource(`${target}-${PRECONS}`);
    } else if (decks?.[deckid]) {
      setSource(`${target}-${MY}`);
    } else {
      setSource(`${target}-${RECENT}`);
    }
  }, [deckid, decks]);

  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">{title}</div>
      {source === `${target}-${URL}` ? (
        <form name={target} onSubmit={handleUrlSubmit} className="min-w-[270px]">
          <div className="flex">
            <Input
              roundedStyle="rounded-sm rounded-r-none"
              placeholder="First Deck (ID or URL)"
              name={target}
              value={url}
              onChange={handleUrlChange}
            />
            <Button className="rounded-l-none" type="submit">
              <Check2 />
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={twMerge('z-20 flex gap-1', !inventoryMode && isMobile && 'justify-between')}
        >
          <div className={deck?.[IS_BRANCHES] && source == `${target}-${MY}` ? 'w-3/4' : 'w-full'}>
            {source == `${target}-${MY}` && decks ? (
              <DeckSelectMy handleSelect={handleSelect} deckid={deck?.[DECKID]} />
            ) : source == `${target}-${RECENT}` ? (
              <DeckSelectRecent handleSelect={handleSelect} deckid={deck?.[DECKID]} />
            ) : (
              <DeckSelectPrecon handleSelect={handleSelect} deckid={deck?.[DECKID]} />
            )}
          </div>
          {source == `${target}-${MY}` && decks && deck?.[IS_BRANCHES] && (
            <div className="w-1/4">
              <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between gap-6">
        <RadioGroup
          value={source}
          onChange={setSource}
          aria-label="Server size"
          className="flex gap-4 sm:gap-6"
        >
          {username && decks && Object.keys(decks).length > 0 && (
            <Radio value={`${target}-${MY}`} label={isMobile ? 'My' : 'My Decks'} />
          )}
          <Radio value={`${target}-${PRECONS}`} label="Precons" />
          {recentDecks.length > 0 && <Radio value={`${target}-${RECENT}`} label="Recent" />}
          <Radio value={`${target}-${URL}`} label="URL" />
        </RadioGroup>
      </div>
    </div>
  );
};

export default DiffSelectDeck;
