import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import StarFill from '@icons/star-fill.svg?react';
import tournaments from '@/assets/data/etda.json';
import { Spinner, ButtonIconed } from '@/components';
import { setAnalyzeDecks, setAnalyzeInfo, setAnalyzeResults, clearAnalyzeForm } from '@/context';
import { ID, TITLE, DATE } from '@/constants';

const AnalyzeLoadPreparedButtons = ({ setTempDecks, setTempArchon, setError }) => {
  const navigate = useNavigate();
  const [loadingDeck, setLoadingDeck] = useState();

  const handlePrepared = (id) => {
    setLoadingDeck(id);
    clearAnalyzeForm();
    setError(false);
    setTempArchon();
    setTempDecks();
    setAnalyzeInfo();
    setAnalyzeDecks();
    setAnalyzeResults();
    navigate(`/tournament_analyze/${id}`);
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
            icon={loadingDeck == v[ID] ? <Spinner /> : v.isNC ? <StarFill /> : null}
          />
        );
      })}
    </div>
  );
};

export default AnalyzeLoadPreparedButtons;
