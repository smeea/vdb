import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonFill from '@/assets/images/icons/person-fill.svg';
import TagFill from '@/assets/images/icons/tag-fill.svg';
import CalendarEvent from '@/assets/images/icons/calendar-event.svg';
import { TwdResultTags, TwdResultDescriptionTextTr } from '@/components';
import { useApp, searchTwdForm, clearSearchForm } from '@/context';
import { useTags } from '@/hooks';

const PdaResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const tags = useTags(deck.crypt, deck.library);
  const lastUpdated = new Date(deck['timestamp']).toISOString().slice(0, 10);

  const handleClick = (target, value) => {
    clearSearchForm('twd');
    searchTwdForm[target] = value;
    navigate(
      `/pda?q=${encodeURIComponent(JSON.stringify({ [target]: value }))}`
    );
  };

  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr
            title={isMobile ? <TagFill /> : <>Deck:</>}
          >
            {deck.name}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={isMobile ? <PersonFill /> : <>Author:</>}
          >
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(deck['author'])}
            >
              {deck['author']}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            title={isMobile ? <CalendarEvent /> : <>Created:</>}
          >
            {deck['creation_date']}
          </TwdResultDescriptionTextTr>
          {lastUpdated !== deck['creation_date'] && (
            <TwdResultDescriptionTextTr
              title={isMobile ? <CalendarEvent /> : <>Updated:</>}
            >
              {lastUpdated}
            </TwdResultDescriptionTextTr>
          )}
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );
};

export default PdaResultDescriptionText;
