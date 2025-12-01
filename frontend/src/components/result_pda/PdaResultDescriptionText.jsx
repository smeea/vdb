import CalendarEvent from "@icons/calendar-event.svg?react";
import PersonFill from "@icons/person-fill.svg?react";
import TagFill from "@icons/tag-fill.svg?react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { ResultLibraryTypeImage, TwdResultDescriptionTextTr, TwdResultTags } from "@/components";
import {
  AUTHOR,
  BASE,
  CREATION_DATE,
  LIBRARY,
  NAME,
  PDA,
  SUPERIOR,
  TAGS,
  TIMESTAMP,
} from "@/constants";
import { clearSearchForm, searchPdaForm, useApp } from "@/context";
import { useDeckLibrary } from "@/hooks";

const PdaResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const { libraryByTypeTotal } = useDeckLibrary(deck[LIBRARY]);
  const lastUpdated = format(deck[TIMESTAMP], "yyyy-MM-dd");
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
      <div className="flex flex-col gap-1 max-sm:hidden">
        {hasTags && <TwdResultTags tags={deck[TAGS]} />}
        <div>
          {Object.keys(libraryByTypeTotal).map((i) => (
            <div key={i} className="inline-block whitespace-nowrap pr-2.5">
              <div className="flex items-center gap-0.5">
                <ResultLibraryTypeImage value={i} />
                <div className="flex">{libraryByTypeTotal[i]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PdaResultDescriptionText;
