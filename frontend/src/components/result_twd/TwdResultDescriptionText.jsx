import CalendarEvent from "@icons/calendar-event.svg?react";
import GeoAltFill from "@icons/geo-alt-fill.svg?react";
import PersonFill from "@icons/person-fill.svg?react";
import TagFill from "@icons/tag-fill.svg?react";
import TrophyFill from "@icons/trophy-fill.svg?react";
import { useNavigate } from "react-router";
import { ResultLibraryTypeImage, TwdResultDescriptionTextTr, TwdResultTags } from "@/components";
import {
  AUTHOR,
  BASE,
  CREATION_DATE,
  EVENT,
  LIBRARY,
  LOCATION,
  NAME,
  SUPERIOR,
  TAGS,
  TWD,
} from "@/constants";
import { useDeckLibrary } from "@/hooks";
import { clearSearchForm, searchTwdForm, useApp } from "@/context";

const TwdResultDescriptionText = ({ deck }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();
  const { libraryByTypeTotal } = useDeckLibrary(deck[LIBRARY]);
  const hasTags = [...deck[TAGS][SUPERIOR], ...deck[TAGS][BASE]].length > 0;

  const handleClick = (target, value) => {
    clearSearchForm(TWD);
    const finalValue = target === LOCATION ? { city: value } : value;

    searchTwdForm[target] = finalValue;
    navigate(`/twd?q=${encodeURIComponent(JSON.stringify({ [target]: finalValue }))}`);
  };

  return (
    <>
      <table>
        <tbody>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <CalendarEvent /> : "Date:"}
          >
            {deck[CREATION_DATE]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <TrophyFill /> : "Event:"}
          >
            {deck[EVENT]}
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <GeoAltFill /> : "Place:"}
          >
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(LOCATION, deck[LOCATION])}
            >
              {deck[LOCATION]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr
            iconed={isMobile}
            title={isMobile ? <PersonFill /> : "Player:"}
          >
            <div
              className="text-fgSecondary hover:underline dark:text-fgSecondaryDark"
              onClick={() => handleClick(AUTHOR, deck[AUTHOR])}
            >
              {deck[AUTHOR]}
            </div>
          </TwdResultDescriptionTextTr>
          <TwdResultDescriptionTextTr iconed={isMobile} title={isMobile ? <TagFill /> : "Deck:"}>
            {deck[NAME]}
          </TwdResultDescriptionTextTr>
        </tbody>
      </table>
      <div className='flex flex-col gap-1 max-sm:hidden'>
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

export default TwdResultDescriptionText;
