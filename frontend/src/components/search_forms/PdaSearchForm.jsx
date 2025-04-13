import {
  ButtonFloatClose,
  ButtonFloatSearch,
  Checkbox,
  CryptSearchFormClan,
  CryptSearchFormSect,
  PdaSearchFormSrcSelector,
  TwdSearchFormButtons,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  TwdSearchFormCrypt,
  TwdSearchFormDate,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormMatchInventory,
  TwdSearchFormPlayer,
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
  LIBRARY,
  LIBRARY_TOTAL,
  MATCH_INVENTORY,
  MONOCLAN,
  NAME,
  NEW,
  PDA,
  RANDOM,
  SCALING,
  SECT,
  SRC,
  STAR,
  TAGS,
  TRAITS,
} from "@/constants";
import { clearSearchForm, searchPdaForm, setPdaResults, useApp } from "@/context";
import { archiveServices } from "@/services";
import { sanitizeFormState } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useSnapshot } from "valtio";

const PdaSearchForm = ({ error, setError }) => {
  const { username, cryptCardBase, libraryCardBase, showFloatingButtons, inventoryMode, isMobile } =
    useApp();
  const pdaFormState = useSnapshot(searchPdaForm);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        searchPdaForm[i] = query[i];
      });
      if (query[RANDOM]) searchRandom(query[RANDOM]);
      if (query[NEW]) searchNew(query[NEW]);
    }
  }, []);

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState(PDA, pdaFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query && !(query[RANDOM] || query[NEW])) setSearchParams();
        setError(false);
      } else {
        processSearch();
      }
    } else if (
      isMobile &&
      query &&
      !(query[RANDOM] || query[NEW]) &&
      pdaFormState &&
      cryptCardBase &&
      libraryCardBase
    ) {
      processSearch();
    }
  }, [pdaFormState, cryptCardBase, libraryCardBase]);

  const handleMultiSelectChange = useCallback(
    (event, id) => {
      const i = id[NAME];
      const { name, value } = event;
      searchPdaForm[name].value[i] = value;
    },
    [searchPdaForm],
  );

  const handleChangeWithOpt = useCallback(
    (event, id) => {
      const i = id[NAME];
      const { name, value } = event;
      searchPdaForm[i][name] = value;
    },
    [searchPdaForm],
  );

  const handleSrcChange = useCallback(
    (value) => {
      searchPdaForm[SRC] = value;
    },
    [searchPdaForm],
  );

  const handleDisciplinesChange = useCallback(
    (name) => {
      searchPdaForm[DISCIPLINES][name] = !searchPdaForm[DISCIPLINES][name];
    },
    [searchPdaForm],
  );

  const handleMultiChange = useCallback(
    (event) => {
      const { name, value } = event.currentTarget;
      searchPdaForm[name][value] = !searchPdaForm[name][value];
    },
    [searchPdaForm],
  );

  const handleTagsChange = useCallback(
    (name, target, value) => {
      searchPdaForm[name][target] = value;
    },
    [searchPdaForm],
  );

  const handleMatchInventoryScalingChange = useCallback(
    (e) => {
      searchPdaForm[MATCH_INVENTORY][SCALING] = e.currentTarget.value ? 0 : e.currentTarget[NAME];
    },
    [searchPdaForm],
  );

  const handleClear = useCallback(() => {
    setSearchParams();
    clearSearchForm(PDA);
    setError(false);
  }, [clearSearchForm]);

  const handleError = (e) => {
    switch (e.response.status) {
      case 400:
        setError("NO DECKS FOUND");
        break;
      default:
        setError("CONNECTION PROBLEM");
    }

    setPdaResults(null);
    if (isMobile) {
      setIsLoading(false);
      setSearchParams();
    }
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(PDA, searchPdaForm);
    if (Object.entries(sanitizedForm).length === 0) {
      setError("EMPTY REQUEST");
      return;
    }

    setSearchParams({ q: JSON.stringify(sanitizedForm) });

    setIsLoading(true);
    archiveServices
      .search(sanitizedForm, true)
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
      .getNewDecks(q, true)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  const searchRandom = (q) => {
    setError(false);
    setIsLoading(true);

    archiveServices
      .getRandomDecks(q, true)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-2">
      <TwdSearchFormButtons handleClear={handleClear} getNew={getNew} getRandom={getRandom} inPda />
      {username && (
        <PdaSearchFormSrcSelector value={pdaFormState[SRC]} onChange={handleSrcChange} />
      )}
      {inventoryMode && (
        <>
          <TwdSearchFormMatchInventory
            value={pdaFormState[MATCH_INVENTORY][CRYPT]}
            target={CRYPT}
            onChange={handleChangeWithOpt}
          />
          <TwdSearchFormMatchInventory
            value={pdaFormState[MATCH_INVENTORY][LIBRARY]}
            target={LIBRARY}
            onChange={handleChangeWithOpt}
          />
          <div className="flex justify-end gap-6">
            <Checkbox
              name={60}
              label="Scale to 60 cards"
              checked={pdaFormState[MATCH_INVENTORY][SCALING] === 60}
              value={pdaFormState[MATCH_INVENTORY][SCALING] === 60}
              onChange={handleMatchInventoryScalingChange}
            />
            <Checkbox
              name={75}
              label="Scale to 75 cards"
              checked={pdaFormState[MATCH_INVENTORY][SCALING] === 75}
              value={pdaFormState[MATCH_INVENTORY][SCALING] === 75}
              onChange={handleMatchInventoryScalingChange}
            />
          </div>
        </>
      )}
      <TwdSearchFormDate value={pdaFormState[DATE]} onChange={handleChangeWithOpt} inPda />
      {cryptCardBase && (
        <TwdSearchFormCrypt value={pdaFormState[CRYPT]} form={searchPdaForm[CRYPT]} />
      )}
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={STAR}
          label="With Star"
          checked={pdaFormState[TRAITS][STAR]}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary value={pdaFormState[LIBRARY]} form={searchPdaForm[LIBRARY]} />
      )}
      <TwdSearchFormLibraryTotal value={pdaFormState[LIBRARY_TOTAL]} onChange={handleMultiChange} />
      <CryptSearchFormClan
        value={pdaFormState[CLAN]}
        onChange={handleMultiSelectChange}
        searchForm={searchPdaForm}
      />
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={MONOCLAN}
          label="Mono Clan"
          checked={pdaFormState[TRAITS][MONOCLAN]}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={pdaFormState[SECT]}
        onChange={handleMultiSelectChange}
        searchForm={searchPdaForm}
      />
      <TwdSearchFormCapacity value={pdaFormState[CAPACITY]} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={pdaFormState[DISCIPLINES]}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={pdaFormState[CARDTYPES]} onChange={handleChangeWithOpt} />
      <TwdSearchFormTags value={pdaFormState[TAGS]} onChange={handleTagsChange} />
      <TwdSearchFormPlayer value={pdaFormState[AUTHOR]} form={searchPdaForm} inPda />
      {showFloatingButtons && (
        <>
          <ButtonFloatClose className="sm:hidden" handleClose={handleClear} position="middle" />
          <ButtonFloatSearch
            className="sm:hidden"
            handleSearch={processSearch}
            error={error}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default PdaSearchForm;
