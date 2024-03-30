import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import { Spinner, ButtonIconed } from '@/components';
import {
  setAnalyzeDecks,
  setAnalyzeInfo,
  setAnalyzeResults,
  clearAnalyzeForm,
} from '@/context';

const AnalyzeLoadPreparedButtons = ({
  setTempDecks,
  setTempArchon,
  setError,
}) => {
  const navigate = useNavigate();
  const [loadingDeck, setLoadingDeck] = useState();

  const tournaments = [
    {
      id: 11196,
      title: 'Salut Brie! - Norwich, United Kingdom',
      date: '2024-03-09',
    },
    {
      id: 11192,
      title: 'White Turtle - Vác, Hungary',
      date: '2024-01-27',
    },
    {
      id: 11023,
      title: 'Finnish Nationals 2023 - Espoo, Finland',
      date: '2023-11-04',
      isNC: true,
    },
    {
      id: 10367,
      title: 'Finnish Nationals 2022 - Espoo, Finland',
      date: '2022-11-05',
      isNC: true,
    },
  ];

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
            icon={
              loadingDeck == v.id ? <Spinner /> : v.isNC ? <StarFill /> : null
            }
          />
        );
      })}
    </div>
  );
};

export default AnalyzeLoadPreparedButtons;
