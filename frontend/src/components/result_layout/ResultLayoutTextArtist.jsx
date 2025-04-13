import { ARTIST, CRYPT, LIBRARY } from "@/constants";
import { clearSearchForm, searchCryptForm, searchLibraryForm } from "@/context";
import { useNavigate } from "react-router";

const ResultLayoutTextArtist = ({ handleClose, inCrypt, artists }) => {
  const navigate = useNavigate();

  const handleClick = (value) => {
    clearSearchForm(inCrypt ? CRYPT : LIBRARY);
    const form = inCrypt ? searchCryptForm : searchLibraryForm;
    form[ARTIST] = value;
    navigate(
      `/${inCrypt ? CRYPT : LIBRARY}?q=${encodeURIComponent(JSON.stringify({ artist: value }))}`,
    );
    handleClose();
  };

  return (
    <>
      {artists.map((artist, idx) => {
        return (
          <div
            className="inline-block cursor-pointer whitespace-nowrap text-fgSecondary hover:underline dark:text-fgSecondaryDark"
            key={idx}
            onClick={() => handleClick(artist)}
          >
            {artist}
          </div>
        );
      })}
    </>
  );
};

export default ResultLayoutTextArtist;
