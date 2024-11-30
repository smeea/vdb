import React, { useEffect, useState } from 'react';
import Check2 from '@icons/check2.svg?react';
import {
  SearchAdditionalFormsText,
  SearchFormButtonLogicToggle,
  SearchFormButtonAddText,
  SearchFormButtonDel,
  Input,
  Checkbox,
  ButtonClose,
  ButtonIconed,
} from '@/components';
import { useDebounce } from '@/hooks';
import { useApp } from '@/context';
import { NAME, TEXT } from '@/constants';

const SearchFormTextAndButtons = ({
  searchForm,
  value,
  preresults,
  showLimit,
  onChange,
  onChangeOptions,
  handleShowResults,
  handleClear,
}) => {
  const {
    searchInventoryMode,
    setSearchInventoryMode,
    searchMissingInventoryMode,
    setSearchMissingInventoryMode,
    inventoryMode,
    isMobile,
  } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value[0].value ?? '');
  }, [value]);

  useDebounce(() => onChange(0, text), 300, [text]);

  const options = [
    {
      value: NAME,
      label: 'Only in Name',
    },
    {
      value: TEXT,
      label: 'Only in Text',
    },
    {
      value: 'regex',
      label: 'Regex',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div className="flex">
          <Input
            placeholder="Card Name / Text / RegEx"
            value={text}
            onChange={(e) => setText(e.target.value)}
            borderStyle="max-sm:border sm:border-y sm:border-l"
            roundedStyle="sm:rounded-r-none rounded"
          />
          {!isMobile && (
            <>
              {preresults > showLimit && (
                <ButtonIconed
                  className="whitespace-nowrap rounded-l-none rounded-r-none"
                  borderStyle="border-y border-l border-r-none"
                  onClick={handleShowResults}
                  text={`SHOW ${preresults}`}
                  icon={<Check2 />}
                />
              )}
              <ButtonClose
                title="Clear Forms & Results"
                className="rounded-l-none"
                handleClick={handleClear}
              />
            </>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex w-1/5 gap-1">
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
                  <SearchFormButtonDel searchForm={searchForm} i={0} />
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-end gap-4">
            {options.map((opt, idx) => {
              return (
                <Checkbox
                  className="text-sm"
                  key={idx}
                  prefix="text"
                  name={0}
                  value={opt.value}
                  onChange={onChangeOptions}
                  label={opt.label}
                  checked={
                    opt.value === 'regex' ? value[0].regex || false : value[0].in === opt.value
                  }
                />
              );
            })}
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
        <div className="flex justify-between gap-2">
          <Checkbox
            name={0}
            value="searchInventoryMode"
            label="Search In Inventory"
            checked={!!searchInventoryMode}
            onChange={() => {
              setSearchInventoryMode(!searchInventoryMode);
              if (searchMissingInventoryMode) setSearchMissingInventoryMode(false);
            }}
          />
          <Checkbox
            name={0}
            value="missingInventoryMode"
            label="Missing In Inventory"
            checked={!!searchMissingInventoryMode}
            onChange={() => {
              setSearchMissingInventoryMode(!searchMissingInventoryMode);
              if (searchInventoryMode) setSearchInventoryMode(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchFormTextAndButtons;
