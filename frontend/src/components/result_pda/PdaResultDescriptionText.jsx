import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import TagFill from '@/assets/images/icons/tag-fill.svg?react';
import CalendarEvent from '@/assets/images/icons/calendar-event.svg?react';
import { TwdResultTags, TwdResultDescriptionTextTr } from '@/components';
import { useApp, searchPdaForm, clearSearchForm } from '@/context';
import { useTags } from '@/hooks';
import { CRYPT, LIBRARY, NAME, CREATION_DATE, TIMESTAMP, AUTHOR, PDA } from '@/constants';

const PdaResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const tags = useTags(deck[CRYPT], deck[LIBRARY]);
  const lastUpdated = new Date(deck[TIMESTAMP]).toISOString().split('T')[0];

  const handleClick = (value) => {
    clearSearchForm(PDA);
    searchPdaForm[AUTHOR] = value;
    navigate(`/pda?q=${encodeURIComponent(JSON.stringify({ author: value }))}`);
  };

  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr title={isMobile ? <TagFill /> : <>Deck:</>}>
            {deck[NAME]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <PersonFill /> : <>Author:</>}>
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(deck[AUTHOR])}
            >
              {deck[AUTHOR]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : <>Created:</>}>
            {deck[CREATION_DATE]}
          </TwdResultDescriptionTextTr>
          {lastUpdated !== deck[CREATION_DATE] && (
            <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : <>Updated:</>}>
              {lastUpdated}
            </TwdResultDescriptionTextTr>
          )}
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && <TwdResultTags tags={tags} />}
    </>
  );
};

export default PdaResultDescriptionText;
