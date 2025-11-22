import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useSnapshot } from "valtio";
import {
  ButtonFloatClose,
  ButtonFloatSearch,
  Checkbox,
  CryptSearchFormClan,
  CryptSearchFormSect,
  TwdSearchFormButtons,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  TwdSearchFormCrypt,
  TwdSearchFormDate,
  TwdSearchFormDisciplines,
  TwdSearchFormEvent,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormLocation,
  TwdSearchFormMatchInventory,
  TwdSearchFormPlayer,
  TwdSearchFormPlayers,
  TwdSearchFormTags,
} from "@/components";
import {
  AUTHOR,
  CAPACITY,
  CARDTYPES,
  CLAN,
  CRYPT,
  DATE,
  DISCIPLINES,
  EVENT,
  LIBRARY,
  LIBRARY_TOTAL,
  LOCATION,
  MATCH_INVENTORY,
  MONOCLAN,
  NAME,
  NEW,
  PLAYERS,
  RANDOM,
  SCALING,
  SECT,
  STAR,
  TAGS,
  TRAITS,
  TWD,
} from "@/constants";
import { clearSearchForm, searchTwdForm, setTwdResults, useApp } from "@/context";
import { archiveServices } from "@/services";
import { sanitizeFormState } from "@/utils";

const TwdSearchForm = ({ error, setError }) => {
  const { cryptCardBase, libraryCardBase, showFloatingButtons, inventoryMode, isMobile } = useApp();
  const twdFormState = useSnapshot(searchTwdForm);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        searchTwdForm[i] = query[i];
      });
      if (query[RANDOM]) searchRandom(query[RANDOM]);
      if (query[NEW]) searchNew(query[NEW]);
    }
  }, []);

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState(TWD, twdFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query && !(query[RANDOM] || query[NEW])) setSearchParams();
        setError(false);
      } else if (!searchTwdForm[EVENT] || searchTwdForm[EVENT].length > 2) {
        processSearch();
      }
    } else if (
      isMobile &&
      query &&
      !(query[RANDOM] || query[NEW]) &&
      twdFormState &&
      cryptCardBase &&
      libraryCardBase
    ) {
      processSearch();
    }
  }, [twdFormState, cryptCardBase, libraryCardBase]);

  const handleEventChange = (event) => {
    searchTwdForm[EVENT] = event.target.value;
  };

  const handleMultiSelectChange = (event, id) => {
    const i = id[NAME];
    const { name, value } = event;
    searchTwdForm[name].value[i] = value;
  };

  const handleChangeWithOpt = (event, id) => {
    const i = id[NAME];
    const { name, value } = event;
    searchTwdForm[i][name] = value;
  };

  const handleDisciplinesChange = (name) => {
    searchTwdForm[DISCIPLINES][name] = !searchTwdForm[DISCIPLINES][name];
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.currentTarget;
    searchTwdForm[name][value] = !searchTwdForm[name][value];
  };

  const handleTagsChange = (name, target, value) => {
    searchTwdForm[name][target] = value;
  };

  const handleMatchInventoryScalingChange = (e) => {
    searchTwdForm[MATCH_INVENTORY][SCALING] = e.currentTarget.value ? 0 : e.currentTarget[NAME];
  };

  const handleClear = () => {
    setSearchParams();
    clearSearchForm(TWD);
    setError(false);
  };

  const handleError = (e) => {
    switch (e.response.status) {
      case 400:
        setError("NO DECKS FOUND");
        break;
      default:
        setError("CONNECTION PROBLEM");
    }

    setTwdResults();
    if (isMobile) {
      setIsLoading(false);
      setSearchParams();
    }
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(TWD, searchTwdForm);
    if (Object.entries(sanitizedForm).length === 0) {
      setError("EMPTY REQUEST");
      return;
    }

    setSearchParams({ q: JSON.stringify(sanitizedForm) });

    setIsLoading(true);
    archiveServices
      .search(sanitizedForm)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  const getRandom = (q) => {
    setSearchParams({ q: JSON.stringify({ random: q }) });
    searchRandom(q);
  };

  const getNew = (q) => {
    setSearchParams({ q: JSON.stringify({ new: q }) });
    searchNew(q);
  };

  const searchNew = (q) => {
    setError(false);
    setIsLoading(true);

    archiveServices
      .getNewDecks(q)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  const searchRandom = (q) => {
    setError(false);
    setIsLoading(true);

    archiveServices
      .getRandomDecks(q)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-2">
      <TwdSearchFormButtons handleClear={handleClear} getNew={getNew} getRandom={getRandom} />
      {inventoryMode && (
        <>
          <TwdSearchFormMatchInventory
            value={twdFormState[MATCH_INVENTORY][CRYPT]}
            target={CRYPT}
            onChange={handleChangeWithOpt}
          />
          <TwdSearchFormMatchInventory
            value={twdFormState[MATCH_INVENTORY][LIBRARY]}
            target={LIBRARY}
            onChange={handleChangeWithOpt}
          />
          <div className="flex justify-end gap-6">
            <Checkbox
              name={60}
              label="Scale to 60 cards"
              checked={twdFormState[MATCH_INVENTORY][SCALING] === 60}
              value={twdFormState[MATCH_INVENTORY][SCALING] === 60}
              onChange={handleMatchInventoryScalingChange}
            />
            <Checkbox
              name={75}
              label="Scale to 75 cards"
              checked={twdFormState[MATCH_INVENTORY][SCALING] === 75}
              value={twdFormState[MATCH_INVENTORY][SCALING] === 75}
              onChange={handleMatchInventoryScalingChange}
            />
          </div>
        </>
      )}
      <TwdSearchFormDate value={twdFormState[DATE]} onChange={handleChangeWithOpt} />
      <TwdSearchFormPlayers value={twdFormState[PLAYERS]} onChange={handleChangeWithOpt} />
      {cryptCardBase && (
        <TwdSearchFormCrypt value={twdFormState[CRYPT]} form={searchTwdForm[CRYPT]} />
      )}
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={STAR}
          label="With Star"
          checked={twdFormState[TRAITS][STAR]}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary value={twdFormState[LIBRARY]} form={searchTwdForm[LIBRARY]} />
      )}
      <TwdSearchFormLibraryTotal value={twdFormState[LIBRARY_TOTAL]} onChange={handleMultiChange} />
      <CryptSearchFormClan
        value={twdFormState[CLAN]}
        onChange={handleMultiSelectChange}
        searchForm={searchTwdForm}
        withoutNoPath
      />
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={MONOCLAN}
          label="Mono Clan"
          checked={twdFormState[TRAITS][MONOCLAN]}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={twdFormState[SECT]}
        onChange={handleMultiSelectChange}
        searchForm={searchTwdForm}
      />
      <TwdSearchFormCapacity value={twdFormState[CAPACITY]} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={twdFormState[DISCIPLINES]}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={twdFormState[CARDTYPES]} onChange={handleChangeWithOpt} />
      <TwdSearchFormTags value={twdFormState[TAGS]} onChange={handleTagsChange} />
      <TwdSearchFormEvent value={twdFormState[EVENT]} onChange={handleEventChange} />
      <TwdSearchFormLocation value={twdFormState[LOCATION]} form={searchTwdForm} />
      <TwdSearchFormPlayer value={twdFormState[AUTHOR]} form={searchTwdForm} />
      {isMobile && showFloatingButtons && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch handleSearch={processSearch} error={error} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default TwdSearchForm;
