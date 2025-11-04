import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useSnapshot } from "valtio";
import {
  ButtonClose,
  ButtonFloatClose,
  ButtonFloatSearch,
  Checkbox,
  CryptSearchFormClan,
  CryptSearchFormSect,
  TdaSearchFormRank,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  TwdSearchFormCrypt,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormTags,
} from "@/components";
import {
  CAPACITY,
  CARDTYPES,
  CLAN,
  CRYPT,
  DECKS,
  DISCIPLINES,
  LIBRARY,
  LIBRARY_TOTAL,
  MONOCLAN,
  NAME,
  RANK,
  SECT,
  STAR,
  TAGS,
  TDA,
  TRAITS,
} from "@/constants";
import { clearTdaForm, searchTdaForm, setTdaResults, tdaStore, useApp } from "@/context";
import { filterDecks, sanitizeFormState } from "@/utils";

const TdaSearchForm = ({ setShowForm }) => {
  const { cryptCardBase, libraryCardBase, showFloatingButtons, isMobile } = useApp();
  const tdaFormState = useSnapshot(searchTdaForm);
  const decks = useSnapshot(tdaStore)[DECKS];
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        searchTdaForm[i] = query[i];
      });
    }
  }, []);

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState(TDA, tdaFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) setSearchParams();
        setTdaResults();
        setError(false);
      } else {
        processSearch();
      }
    } else if (isMobile && query && tdaFormState && cryptCardBase && libraryCardBase) {
      processSearch();
    }
  }, [tdaFormState, cryptCardBase, libraryCardBase]);

  const handleMultiSelectChange = (event, id) => {
      const i = id[NAME];
      const { name, value } = event;
      searchTdaForm[name].value[i] = value;
    }

  const handleChangeWithOpt = (event, id) => {
      const i = id[NAME];
      const { name, value } = event;

      searchTdaForm[i][name] = value;
    }

  const handleDisciplinesChange = (name) => {
      searchTdaForm[DISCIPLINES][name] = !searchTdaForm[DISCIPLINES][name];
    }

  const handleMultiChange = (event) => {
      const { name, value } = event.currentTarget;
      searchTdaForm[name][value] = !searchTdaForm[name][value];
    }

  const handleTagsChange = (name, target, value) => {
      searchTdaForm[name][target] = value;
    }

  const handleClear = () => {
    clearTdaForm();
    setTdaResults();
    setError(false);
  }

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(TDA, searchTdaForm);

    if (Object.entries(sanitizedForm).length === 0) {
      setShowForm();
      return;
    }

    const filteredDecks = filterDecks(decks, sanitizedForm);

    if (isMobile && filteredDecks.length === 0) {
      setError("NO DECKS FOUND");
      return;
    }

    setSearchParams({ q: JSON.stringify(sanitizedForm) });
    setTdaResults(filteredDecks);
    setShowForm();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <TdaSearchFormRank value={tdaFormState[RANK]} onChange={handleChangeWithOpt} />
        <ButtonClose title="Clear Forms & Results" handleClick={handleClear} />
      </div>
      {cryptCardBase && (
        <TwdSearchFormCrypt value={tdaFormState[CRYPT]} form={searchTdaForm[CRYPT]} />
      )}
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={STAR}
          label="With Star"
          checked={tdaFormState[TRAITS][STAR]}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary value={tdaFormState[LIBRARY]} form={searchTdaForm[LIBRARY]} />
      )}
      <TwdSearchFormLibraryTotal value={tdaFormState[LIBRARY_TOTAL]} onChange={handleMultiChange} />
      <CryptSearchFormClan
        value={tdaFormState[CLAN]}
        onChange={handleMultiSelectChange}
        searchForm={searchTdaForm}
      />
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={MONOCLAN}
          label="Mono Clan"
          checked={tdaFormState[TRAITS][MONOCLAN]}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={tdaFormState[SECT]}
        onChange={handleMultiSelectChange}
        searchForm={searchTdaForm}
      />
      <TwdSearchFormCapacity value={tdaFormState[CAPACITY]} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={tdaFormState[DISCIPLINES]}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={tdaFormState[CARDTYPES]} onChange={handleChangeWithOpt} />
      <TwdSearchFormTags value={tdaFormState[TAGS]} onChange={handleTagsChange} />
      {showFloatingButtons && (
        <>
          <ButtonFloatClose className="sm:hidden" handleClose={handleClear} position="middle" />
          <ButtonFloatSearch className="sm:hidden" handleSearch={processSearch} error={error} />
        </>
      )}
    </div>
  );
};

export default TdaSearchForm;
