import Globe2 from "@icons/globe2.svg?react";
import StarFill from "@icons/star-fill.svg?react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useState } from "react";
import { useNavigate } from "react-router";
import tournaments from "@/assets/data/etda.json";
import { Button, Spinner } from "@/components";
import { COUNTRY, DATE, DECKS, ID, LOCATION, PLAYERS, TITLE } from "@/constants";
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
      {tournaments.map((v) => {
        return (
          <Button
            key={v[ID]}
            className="w-full"
            onClick={() => handlePrepared(v[ID])}
            title={v[TITLE]}
          >
            <div className="flex w-full items-center justify-between gap-2 sm:gap-5">
              <div className="flex items-center justify-between max-sm:text-sm">{v[DATE]}</div>
              <div className="flex w-full flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  {loadingDeck === v[ID] ? <Spinner /> : v.isNC ? <StarFill /> : null}
                  {v[TITLE]}
                </div>
                <div className="flex w-full items-center justify-center gap-1 text-sm">
                  <div>
                    {v[COUNTRY] ? (
                      getUnicodeFlagIcon(v[COUNTRY])
                    ) : (
                      <Globe2 width="15" height="15" />
                    )}
                  </div>
                  <div>{v[LOCATION]}</div>
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
