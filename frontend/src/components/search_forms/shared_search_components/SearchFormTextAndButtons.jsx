import React, { useEffect, useState } from 'react';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import {
  SearchAdditionalFormsText,
  SearchFormButtonLogicToggle,
  SearchFormButtonAddText,
  SearchFormButtonDelText,
} from '../shared_search_components';
import { Input, Checkbox, Button, ButtonIconed } from 'components';
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

  return (
    <>
      <div className="flex items-stretch justify-between">
        {isMobile ? (
          <Input
            placeholder="Card Name / Text / RegEx"
            name={0}
            value={text}
            onChange={onTextChange}
          />
        ) : (
          <>
            <Input
              /* TODO ignore enter */
              placeholder="Card Name / Text / RegEx"
              name={0}
              value={text}
              onChange={onTextChange}
              className="rounded-r-none w-full"
            />
            {preresults > showLimit && (
              <ButtonIconed
                className="flex flex-nowrap rounded-l-none rounded-r-none"
                variant="primary"
                onClick={handleShowResults}
                text={`SHOW ${preresults}`}
                icon=<Check2 />
              />
            )}
            <Button
              title="Clear Forms & Results"
              variant="primary"
              onClick={handleClearButton}
              className="rounded-l-none"
            >
              <div className="flex items-center">
                <X />
              </div>
            </Button>
          </>
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
        <div className="flex justify-end items-start space-x-3">
          {options.map((opt, idx) => {
            return (
              <Checkbox
                key={idx}
                prefix="text"
                name={0}
                value={opt.value}
                onChange={onChangeOptions}
                label={opt.label}
                checked={
                  opt.value === 'regex'
                    ? value[0].regex || false
                    : value[0].in === opt.value
                }
                onChange={onChangeOptions}
              />
            );
          })}
        </div>
      </div>
      <SearchAdditionalFormsText
        value={value}
        onChange={onChange}
        onChangeOptions={onChangeOptions}
        searchForm={searchForm}
      />
      {inventoryMode && (
        <Checkbox
          name={0}
          value="hideMissing"
          label="Search In Inventory"
          checked={hideMissing}
          onChange={() => setHideMissing(!hideMissing)}
        />
      )}
    </>
  );
};

export default SearchFormTextAndButtons;
