import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import tournaments from '@/assets/data/etda.json';
import { Spinner, ButtonIconed } from '@/components';
import { setAnalyzeDecks, setAnalyzeInfo, setAnalyzeResults, clearAnalyzeForm } from '@/context';

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
            key={v.id}
            className="w-full"
            onClick={() => handlePrepared(v.id)}
            title={v.title}
            text={`${v.title} [${v.date}]`}
            icon={loadingDeck == v.id ? <Spinner /> : v.isNC ? <StarFill /> : null}
          />
        );
      })}
    </div>
  );
};

export default AnalyzeLoadPreparedButtons;
