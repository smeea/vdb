import CalendarEvent from "@icons/calendar-event.svg?react";
import PersonFill from "@icons/person-fill.svg?react";
import TagFill from "@icons/tag-fill.svg?react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { TwdResultDescriptionTextTr, TwdResultTags } from "@/components";
import { AUTHOR, CREATION_DATE, NAME, PDA, TAGS, TIMESTAMP } from "@/constants";
import { clearSearchForm, searchPdaForm, useApp } from "@/context";

const PdaResultDescriptionText = ({ deck }) => {
  const { isNarrow, isMobile } = useApp();
  const navigate = useNavigate();
  const lastUpdated = format(deck[TIMESTAMP], "yyyy-MM-dd");

  const handleClick = (value) => {
    clearSearchForm(PDA);
    searchPdaForm[AUTHOR] = value;
    navigate(`/pda?q=${encodeURIComponent(JSON.stringify({ [AUTHOR]: value }))}`);
  };

  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr iconed={isMobile} title={isMobile ? <TagFill /> : "Deck:"}>
            {deck[NAME]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <PersonFill /> : "Author:"}
          >
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(deck[AUTHOR])}
            >
              {deck[AUTHOR]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <CalendarEvent /> : "Created:"}
          >
            {deck[CREATION_DATE]}
          </TwdResultDescriptionTextTr>
          {lastUpdated > deck[CREATION_DATE] && (
            <TwdResultDescriptionTextTr
              iconed={isMobile}
              title={isMobile ? <CalendarEvent /> : "Updated:"}
            >
              {lastUpdated}
            </TwdResultDescriptionTextTr>
          )}
        </tbody>
      </table>
      {!isNarrow && <TwdResultTags tags={deck[TAGS]} />}
    </>
  );
};

export default PdaResultDescriptionText;
