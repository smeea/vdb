import tournaments from "@/assets/data/etda.json";
import { ButtonIconed, Spinner } from "@/components";
import { DATE, ID, TITLE } from "@/constants";
import { clearTdaForm, setTdaDecks, setTdaInfo, setTdaResults } from "@/context";
import StarFill from "@icons/star-fill.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router";

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
          <ButtonIconed
            key={v[ID]}
            className="w-full"
            onClick={() => handlePrepared(v[ID])}
            title={v[TITLE]}
            text={`${v[TITLE]} [${v[DATE]}]`}
            icon={loadingDeck === v[ID] ? <Spinner /> : v.isNC ? <StarFill /> : null}
          />
        );
      })}
    </div>
  );
};

export default TdaLoadPreparedButtons;
