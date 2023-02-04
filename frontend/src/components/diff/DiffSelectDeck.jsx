import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Check2 from '@/assets/images/icons/check2.svg';
import ArrowLeftRight from '@/assets/images/icons/arrow-left-right.svg';
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

const DiffSelectDeck = ({
  decks,
  deck,
  deckidFrom,
  deckidTo,
  target,
  title,
}) => {
  const { recentDecks, inventoryMode, username, isMobile } = useApp();
  const deckid = target === 'from' ? deckidFrom : deckidTo;
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('from-my');

  const handleSelect = (e) => {
    if (target == 'from') {
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

    if (target === 'from') {
      navigate(`/diff/${newId}/${deckidTo}`);
    } else {
      navigate(`/diff/${deckidFrom}/${newId}`);
    }
  };

  useEffect(() => {
    if (deckid?.includes(':')) {
      setSource(`${target}-precons`);
    } else if (decks?.[deckid]) {
      setSource(`${target}-my`);
    } else {
      setSource(`${target}-recent`);
    }
  }, [deckid, decks]);

  return (
    <>
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
        {title}
      </div>
      {source === `${target}-url` ? (
        <form
          name={target}
          onSubmit={handleUrlSubmit}
          className="min-w-[270px]"
        >
          <div className="flex">
            <Input
              className="w-full rounded-r-none"
              placeholder="First Deck (ID or URL)"
              type="text"
              name={target}
              value={url}
              onChange={handleUrlChange}
            />
            <Button className="rounded-l-none" variant="primary" type="submit">
              <Check2 />
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={
            inventoryMode || !isMobile ? 'flex' : 'flex justify-between'
          }
        >
          <div
            className={
              deck?.isBranches && source == `${target}-my` ? 'w-3/4' : 'w-full'
            }
          >
            {source == `${target}-my` && decks ? (
              <DeckSelectMy handleSelect={handleSelect} deckid={deck?.deckid} />
            ) : source == `${target}-recent` ? (
              <DeckSelectRecent
                handleSelect={handleSelect}
                deckid={deck?.deckid}
              />
            ) : (
              <DeckSelectPrecon
                handleSelect={handleSelect}
                deckid={deck?.deckid}
              />
            )}
          </div>
          {source == `${target}-my` && decks && deck?.isBranches && (
            <div className="w-1/4">
              <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between space-x-6">
        <div className="flex space-x-6">
          {username && decks && Object.keys(decks).length > 0 && (
            <Radio
              checked={source == `${target}-my`}
              onChange={(e) => setSource(e.target.id)}
              id={`${target}-my`}
              value={isMobile ? 'My' : 'My Decks'}
            />
          )}
          <Radio
            checked={source == `${target}-precons`}
            onChange={(e) => setSource(e.target.id)}
            id={`${target}-precons`}
            value="Precons"
          />
          {recentDecks.length > 0 && (
            <Radio
              checked={source == `${target}-recent`}
              onChange={(e) => setSource(e.target.id)}
              id={`${target}-recent`}
              value="Recent"
            />
          )}
          <Radio
            checked={source == `${target}-url`}
            onChange={(e) => setSource(e.target.id)}
            id={`${target}-url`}
            value="URL"
          />
        </div>
      </div>
    </>
  );
};

export default DiffSelectDeck;
