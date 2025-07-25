import CalendarEvent from "@icons/calendar-event.svg?react";
import PersonFill from "@icons/person-fill.svg?react";
import TagFill from "@icons/tag-fill.svg?react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { TwdResultDescriptionTextTr, TwdResultTags } from "@/components";
import { AUTHOR, BASE, CREATION_DATE, NAME, PDA, SUPERIOR, TAGS, TIMESTAMP } from "@/constants";
import { clearSearchForm, searchPdaForm, useApp } from "@/context";

const PdaResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const lastUpdated = dayjs(deck[TIMESTAMP]).format("YYYY-MM-DD");
  const hasTags = [...deck[TAGS][SUPERIOR], ...deck[TAGS][BASE]].length > 0;

  const handleClick = (value) => {
    clearSearchForm(PDA);
    searchPdaForm[AUTHOR] = value;
    navigate(`/pda?q=${encodeURIComponent(JSON.stringify({ [AUTHOR]: value }))}`);
  };

  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr title={isMobile ? <TagFill /> : "Deck:"}>
            {deck[NAME]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <PersonFill /> : "Author:"}>
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(deck[AUTHOR])}
            >
              {deck[AUTHOR]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : "Created:"}>
            {deck[CREATION_DATE]}
          </TwdResultDescriptionTextTr>
          {lastUpdated > deck[CREATION_DATE] && (
            <TwdResultDescriptionTextTr title={isMobile ? <CalendarEvent /> : "Updated:"}>
              {lastUpdated}
            </TwdResultDescriptionTextTr>
          )}
        </tbody>
      </table>
      {hasTags && <TwdResultTags tags={deck[TAGS]} />}
    </>
  );
};

export default PdaResultDescriptionText;
