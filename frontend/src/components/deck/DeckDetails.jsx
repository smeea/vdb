import React, { useState, useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
  defer,
} from 'react-router-dom';
import Shuffle from 'assets/images/icons/shuffle.svg';
import At from 'assets/images/icons/at.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import ChatLeftQuoteFill from 'assets/images/icons/chat-left-quote-fill.svg';
import List from 'assets/images/icons/list.svg';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import {
  AccountLogin,
  AccountRegister,
  DeckSelectMy,
  DeckSelectRecent,
  DeckSelectPrecon,
  DeckSelectAdvModal,
  DeckQrModal,
  DeckTags,
  DeckDraw,
  DeckButtons,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
  DeckRecommendation,
  DeckChangeName,
  DeckChangeBranchName,
  DeckChangeAuthor,
  DeckChangeDescription,
  DeckImport,
  Seating,
  Modal,
  Button,
  Radio,
} from 'components';
import { deckStore, useApp, setDeck, deckUpdate } from 'context';
import { useDeck, useDeckMissing, useTags } from 'hooks';

const DeckDetails = ({ deck, allTagsOptions, folded, setFolded }) => {
  const { isMobile } = useApp();

  return (
    <>
      <div className="flex space-x-2">
        <div
          className={`${deck.isBranches ? 'md:basis-6/12' : 'md:basis-8/12'}`}
        >
          <DeckChangeName deck={deck} />
        </div>
        {deck.isBranches && (
          <div className="md:basis-2/12">
            <DeckChangeBranchName deck={deck} />
          </div>
        )}
        <div className="md:basis-4/12">
          <DeckChangeAuthor deck={deck} />
        </div>
      </div>
      {folded && !isMobile && (
        <div className="flex space-x-2 ">
          <div className="md:basis-6/12">
            <DeckChangeDescription
              deck={deck}
              folded={isMobile ? false : folded}
              setFolded={setFolded}
            />
          </div>
          {(deck.tags?.length > 0 || deck.isAuthor || !deck.isPublic) && (
            <div className="md:basis-6/12">
              <DeckTags deck={deck} allTagsOptions={allTagsOptions} bordered />
            </div>
          )}
        </div>
      )}
      {(!folded || isMobile) &&
        (deck.tags?.length > 0 || deck.isAuthor || !deck.isPublic) && (
          <>
            <div className={isMobile ? '' : ''}>
              <DeckChangeDescription
                deck={deck}
                folded={isMobile ? false : folded}
                setFolded={setFolded}
              />
            </div>
            <div className={isMobile ? '' : ''}>
              <DeckTags deck={deck} allTagsOptions={allTagsOptions} bordered />
            </div>
          </>
        )}
    </>
  );
};

export default DeckDetails;
