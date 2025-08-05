import StarFill from "@icons/star-fill.svg?react";
import Globe2 from "@icons/globe2.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router";
import tournaments from "@/assets/data/etda.json";
import { Button, Spinner } from "@/components";
import { DATE, DECKS, ID, LOCATION, PLAYERS, TITLE } from "@/constants";
import { clearTdaForm, setTdaDecks, setTdaInfo, setTdaResults } from "@/context";

const TdaLoadPreparedButtons = ({ setTempDecks, setTempArchon, setError }) => {
  const navigate = useNavigate();
  const [loadingDeck, setLoadingDeck] = useState();

  const handlePrepared = (id) => {
    setLoadingDeck(id);
    clearTdaForm();
    setError(false);
    setTempArchon();
    setTempDecks();
    setTdaInfo();
    setTdaDecks();
    setTdaResults();
    navigate(`/tda/${id}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {tournaments.map(async (v) => {
        const { [v.country]: Flag } = await import("country-flag-icons/react/3x2");

        return (
          <Button
            key={v[ID]}
            className="w-full"
            onClick={() => handlePrepared(v[ID])}
            title={v[TITLE]}
          >
            <div className="flex w-full items-center justify-between gap-2 sm:gap-5">
              <div className="flex items-center justify-between max-sm:text-sm">{v[DATE]}</div>
              <div className="flex flex-col w-full items-center gap-1">
                <div className="flex items-center gap-1">
                  {loadingDeck === v[ID] ? <Spinner /> : v.isNC ? <StarFill /> : null}
                  {v[TITLE]}
                </div>
                <div className="flex items-center w-full justify-center gap-1.5 text-sm">
                  {Flag ? <Flag className="max-w-4.5" /> : <Globe2 width="15" height="15"/>}
                  {v[LOCATION]}
                </div>
              </div>
              <div className="flex justify-between gap-0.5">
                <div className="flex gap-0.5 text-sm">
                  {v[DECKS]}
                  <div>/</div>
                </div>
                <div className="font-bold">{v[PLAYERS]}</div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default TdaLoadPreparedButtons;
