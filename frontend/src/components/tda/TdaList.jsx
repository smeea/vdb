import Globe2 from "@icons/globe2.svg?react";
import StarFill from "@icons/star-fill.svg?react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Spinner } from "@/components";
import { COUNTRY, DATE, DECKS, ID, CITY, PLAYERS, NAME } from "@/constants";
import { clearTdaForm, setTdaDecks, setTdaInfo, setTdaResults } from "@/context";
import { archiveServices } from "@/services";
import { getCountryName } from "@/utils";


const TdaLoadPreparedButtons = ({ setError }) => {
  const navigate = useNavigate();
  const [loadingEvent, setLoadingEvent] = useState();
  const [tournaments, setTournaments] = useState({})

  const handlePrepared = (id) => {
    setLoadingEvent(id);
    clearTdaForm();
    setError(false);
    setTdaInfo();
    setTdaDecks();
    setTdaResults();
    navigate(`/tda/${id}`);
  };

  useEffect(() => {
    (async () => {
      const t = await archiveServices.getAllTda()
      setTournaments(t);
    })()
  }, []);


  return (
    <div className="flex flex-col gap-2">
      {Object.entries(tournaments).toSorted(([_a, vA], [_b, vB]) => vB[DATE] > vA[DATE]).map(([id, v]) => {
        return (
          <Button
            key={id}
            className="w-full"
            onClick={() => handlePrepared(id)}
            title={v[NAME]}
          >
            <div className="flex w-full items-center justify-between gap-2 sm:gap-5">
              <div className="flex items-center justify-between max-sm:text-sm">{v[DATE]}</div>
              <div className="flex w-full flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  {loadingEvent === id ? <Spinner /> : v.isNC ? <StarFill /> : null}
                  {v[NAME]}
                </div>
                <div className="flex w-full items-center justify-center gap-1 text-sm">
                  <div>
                    {v[COUNTRY] ? (
                      getUnicodeFlagIcon(v[COUNTRY])
                    ) : (
                      <Globe2 width="15" height="15" />
                    )}
                  </div>
                  <div>
                    {v[COUNTRY] ? (
                      <>
                        {v[CITY]}, {getCountryName(v[COUNTRY])}
                      </>
                    ) : (
                      "Online"
                    )}
                  </div>
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
