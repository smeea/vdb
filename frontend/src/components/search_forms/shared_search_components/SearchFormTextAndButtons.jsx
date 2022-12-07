import React, { useEffect, useState } from 'react';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import {
  SearchAdditionalFormsText,
  SearchFormButtonLogicToggle,
  SearchFormButtonAddText,
  SearchFormButtonDelText,
} from '../shared_search_components';
import { Button, ButtonIconed } from 'components';
import { useApp } from 'context';

const SearchFormTextAndButtons = ({
  searchForm,
  value,
  preresults,
  showLimit,
  onChange,
  onChangeOptions,
  handleShowResults,
  handleClearButton,
  hideMissing,
  setHideMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    if (!text && value[0].value) {
      setText(value[0].value);
    } else if (!value[0].value) {
      setText('');
    }
  }, [value]);

  const options = [
    {
      value: 'name',
      label: 'Only in Name',
    },
    {
      value: 'text',
      label: 'Only in Text',
    },
    {
      value: 'regex',
      label: 'Regex',
    },
  ];

  const onTextChange = (e) => {
    onChange(e);
    setText(e.target.value);
  };

  const OptionsForm = options.map((opt, index) => {
    return (
      // TODO add labels
      <input
        key={index}
        name={0}
        value={opt.value}
        type="checkbox"
        className="text-xs"
        id={`text-${opt.value}`}
        label={opt.label}
        checked={
          opt.value === 'regex'
            ? value[0].regex || false
            : value[0].in === opt.value
        }
        onChange={onChangeOptions}
      />
    );
  });

  return (
    <>
      <div className="ps-0 ps-md-1 mx-0 flex flex-row items-center">
        {isMobile ? (
          <input
            placeholder="Card Name / Text / RegEx"
            type="text"
            name={0}
            autoComplete="off"
            spellCheck="false"
            value={value[0].value}
            onChange={onChange}
          />
        ) : (
          <div className="TODO-input-group px-0">
            <input
              /* TODO ignore enter */
              className="text-search"
              placeholder="Card Name / Text / RegEx"
              type="text"
              name={0}
              autoComplete="off"
              spellCheck="false"
              value={text}
              onChange={onTextChange}
            />
            {preresults > showLimit && (
              <ButtonIconed
                variant="primary"
                onClick={handleShowResults}
                text={`FOUND ${preresults}`}
                icon=<Check2 />
              />
            )}
            <Button
              title="Clear Forms & Results"
              variant="primary"
              onClick={handleClearButton}
            >
              <div className="flex items-center">
                <X />
              </div>
            </Button>
          </div>
        )}
      </div>
      <div className="mx-0 flex flex-row px-1 pt-1">
        <div className="basis-2/12 md:basis-1/4">
          <div className="flex flex-row space-x-1">
            {value[0].value !== '' && (
              <>
                <SearchFormButtonLogicToggle
                  name="text"
                  value={value[0].logic}
                  i={0}
                  searchForm={searchForm}
                />
                {value.length == 1 ? (
                  <SearchFormButtonAddText searchForm={searchForm} />
                ) : (
                  <SearchFormButtonDelText searchForm={searchForm} i={0} />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col items-start space-x-3">
            {OptionsForm}
          </div>
        </div>
      </div>
      <SearchAdditionalFormsText
        value={value}
        onChange={onChange}
        onChangeOptions={onChangeOptions}
        searchForm={searchForm}
      />
      {inventoryMode && (
        <input
          name={0}
          value="hideMissing"
          type="checkbox"
          className="pt-1 text-xs"
          id="text-hideMissing"
          label="Search In Inventory"
          checked={hideMissing}
          onChange={() => setHideMissing(!hideMissing)}
        />
      )}
    </>
  );
};

export default SearchFormTextAndButtons;
