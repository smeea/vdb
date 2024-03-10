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
      <ButtonIconed
        className="w-full"
        variant="primary"
        onClick={() => handlePrepared(11192)}
        title="White Turtle - Vác, Hungary"
        text="White Turtle - Vác, Hungary [2024-01-27]"
        icon={loadingDeck == 11192 ? <Spinner /> : null}
      />
      <ButtonIconed
        className="w-full"
        variant="primary"
        onClick={() => handlePrepared(11023)}
        title="Finnish Nationals 2023 - Espoo, Finland"
        icon={loadingDeck == 11023 ? <Spinner /> : <StarFill />}
        text="Finnish Nationals 2023 - Espoo, Finland [2023-11-04]"
      />
      <ButtonIconed
        className="w-full"
        variant="primary"
        onClick={() => handlePrepared(10367)}
        title="Finnish Nationals 2022 - Espoo, Finland"
        icon={loadingDeck == 10367 ? <Spinner /> : <StarFill />}
        text="Finnish Nationals 2022 - Espoo, Finland [2022-11-05]"
      />
    </div>
  );
};

export default AnalyzeLoadPreparedButtons;
