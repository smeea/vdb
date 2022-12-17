import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Check2 from 'assets/images/icons/check2.svg';
import ArrowLeftRight from 'assets/images/icons/arrow-left-right.svg';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckSelectPrecon,
  DeckSelectRecent,
  Button,
  Radio,
} from 'components';
import { useApp } from 'context';

const DiffSelect = ({ decks, deck, deckTo, deckidFrom, deckidTo }) => {
  const { recentDecks, inventoryMode, username, isMobile } = useApp();
  const navigate = useNavigate();

  const [selectFrom, setSelectFrom] = useState('from-my');
  const [selectTo, setSelectTo] = useState('to-my');
  const [urlFrom, setUrlFrom] = useState('');
  const [urlTo, setUrlTo] = useState('');

  const handleSelectFrom = (e) => {
    navigate(`/diff/${e.value}/${deckidTo}`);
  };

  const handleSelectTo = (e) => {
    navigate(`/diff/${deckidFrom}/${e.value}`);
  };

  const handleUrlChange = (e) => {
    if (e.taret.name === 'from') {
      setUrlFrom(e.target.value);
    } else {
      setUrlTo(e.target.value);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();

    let newId;
    if (e.taret.name === 'from') {
      newId = urlFrom.replace(`${process.env.ROOT_URL}decks/`, '');
      navigate(`/diff/${newId}/${deckidTo}`);
    } else {
      newId = urlTo.replace(`${process.env.ROOT_URL}decks/`, '');
      navigate(`/diff/${deckidFrom}/${newId}`);
    }
  };

  const handleSwap = () => {
    navigate(`/diff/${deckidTo}/${deckidFrom}`);
  };

  useEffect(() => {
    if (deckidFrom?.includes(':')) {
      setSelectFrom('from-precons');
    } else if (decks && decks[deckidFrom]) {
      setSelectFrom('from-my');
    } else {
      setSelectFrom('from-recent');
    }
  }, [deckidFrom, decks]);

  useEffect(() => {
    if (deckidTo?.includes(':')) {
      setSelectTo('to-precons');
    } else if (decks && decks[deckidTo]) {
      setSelectTo('to-my');
    } else {
      setSelectTo('to-recent');
    }
  }, [deckidTo, decks]);

  return (
    <div className="flex flex-row space-x-5">
      <div className="md:basis-1/2">
        <div className="text-blue font-bold">Deck You Edit:</div>
        {selectFrom === 'from-url' ? (
          <form
            name="from"
            onSubmit={handleUrlSubmit}
            className=" min-w-[270px]"
          >
            <input
              placeholder="First Deck (ID or URL)"
              type="text"
              name="from"
              value={urlFrom}
              onChange={handleUrlChange}
            />
            <Button variant="primary" type="submit">
              <Check2 />
            </Button>
            {isMobile && (
              <Button variant="primary" onClick={handleSwap}>
                <ArrowLeftRight />
              </Button>
            )}
          </form>
        ) : (
          <div
            className={
              inventoryMode || !isMobile ? 'flex' : 'flex justify-between'
            }
          >
            <div
              className={
                deck?.isBranches && selectFrom == 'from-my' ? 'w-3/4' : 'w-full'
              }
            >
              {selectFrom == 'from-my' && decks ? (
                <>
                  <DeckSelectMy
                    handleSelect={handleSelectFrom}
                    deckid={deck?.deckid}
                  />
                </>
              ) : selectFrom == 'from-recent' ? (
                <DeckSelectRecent
                  handleSelect={handleSelectFrom}
                  deckid={deck?.deckid}
                />
              ) : (
                <DeckSelectPrecon
                  handleSelect={handleSelectFrom}
                  deckid={deck?.deckid}
                />
              )}
            </div>
            {selectFrom == 'from-my' && decks && deck.isBranches && (
              <div className="w-1/4">
                <DeckBranchSelect handleSelect={handleSelectFrom} deck={deck} />
              </div>
            )}
            {isMobile && (
              <Button variant="primary" onClick={handleSwap}>
                <ArrowLeftRight />
              </Button>
            )}
          </div>
        )}
        <div className="flex items-center justify-between space-x-6">
          <div className="flex space-x-6">
            {username && decks && Object.keys(decks).length > 0 && (
              <Radio
                checked={selectFrom == 'from-my'}
                onChange={(e) => setSelectFrom(e.target.id)}
                id="from-my"
                value={isMobile ? 'My' : 'My Decks'}
              />
            )}
            <Radio
              checked={selectFrom == 'from-precons'}
              onChange={(e) => setSelectFrom(e.target.id)}
              id="from-precons"
              value="Precons"
            />
            {recentDecks.length > 0 && (
              <Radio
                checked={selectFrom == 'from-recent'}
                onChange={(e) => setSelectFrom(e.target.id)}
                id="from-recent"
                value="Recent"
              />
            )}
            <Radio
              checked={selectFrom == 'from-url'}
              onChange={(e) => setSelectFrom(e.target.id)}
              id="from-url"
              value="URL"
            />
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="flex">
          <Button variant="primary" onClick={handleSwap}>
            <ArrowLeftRight />
          </Button>
        </div>
      )}
      <div className="md:basis-1/2">
        <div className="text-blue font-bold">Show Changes Against:</div>
        {selectTo === 'to-url' ? (
          <form name="to" onSubmit={handleUrlSubmit} className=" min-w-[270px]">
            <input
              placeholder="First Deck (ID or URL)"
              type="text"
              name="to"
              value={urlTo}
              onChange={handleUrlChange}
            />
            <Button variant="primary" type="submit">
              <Check2 />
            </Button>
          </form>
        ) : (
          <div
            className={
              inventoryMode
                ? 'flex'
                : isMobile
                ? 'flex min-w-[270px] justify-between'
                : 'flex'
            }
          >
            <div
              className={
                deckTo?.isBranches && selectTo == 'to-my' ? 'w-3/4' : 'w-full'
              }
            >
              {selectTo == 'to-my' && decks ? (
                <DeckSelectMy
                  handleSelect={handleSelectTo}
                  deckid={deckTo?.deckid}
                />
              ) : selectTo == 'to-recent' ? (
                <DeckSelectRecent
                  handleSelect={handleSelectTo}
                  deckid={deckTo?.deckid}
                />
              ) : (
                <DeckSelectPrecon
                  handleSelect={handleSelectTo}
                  deckid={deckTo?.deckid}
                />
              )}
            </div>
            {selectTo == 'to-my' && decks && deckTo?.isBranches && (
              <div className="w-1/4">
                <DeckBranchSelect handleSelect={handleSelectTo} deck={deckTo} />
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-between space-x-6">
          <div className="flex space-x-6">
            {username && decks && Object.keys(decks).length > 0 && (
              <Radio
                checked={selectTo == 'to-my'}
                onChange={(e) => setSelectTo(e.target.id)}
                id="to-my"
                value={isMobile ? 'My' : 'My Decks'}
              />
            )}
            <Radio
              checked={selectTo == 'to-precons'}
              onChange={(e) => setSelectTo(e.target.id)}
              id="to-precons"
              value="Precons"
            />
            {recentDecks.length > 0 && (
              <Radio
                checked={selectTo == 'to-recent'}
                onChange={(e) => setSelectTo(e.target.id)}
                id="to-recent"
                value="Recent"
              />
            )}
            <Radio
              checked={selectTo == 'to-url'}
              onChange={(e) => setSelectTo(e.target.id)}
              id="to-url"
              value="URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffSelect;
