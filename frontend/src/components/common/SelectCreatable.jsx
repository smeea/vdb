import React from 'react';
import ReactSelectCreatable from 'react-select/creatable';

const SelectCreatable = ({
  isClearable = false,
  isDisabled,
  isMulti,
  noOptionsMessage,
  onChange,
  options,
  placeholder,
  value,
  noBorder,
  noRemove,
}) => {
  return (
    // TODO add outline
    // dark:outline-bgCheckboxSelectedDark focus:outline outline-bgCheckboxSelected
    <ReactSelectCreatable
      isClearable={isClearable}
      isDisabled={isDisabled}
      isMulti={isMulti}
      noOptionsMessage={noOptionsMessage}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
      classNames={{
        control: () =>
          noBorder
            ? ''
            : 'rounded border border-borderSecondary dark:border-borderSecondaryDark',
        dropdownIndicator: () => 'max-w-[0px] max-h-[0px]',
        indicatorsContainer: () => 'max-h-[0px] max-w-[0px]',
        menu: () =>
          'mt-2 rounded border border-bgThird dark:border-bgThirdDark',
        menuList: () => 'bg-bgPrimary dark:bg-bgPrimaryDark',
        option: (state) => `p-2
          ${
            state.isFocused
              ? 'bg-bgCheckboxSelected dark:bg-bgCheckboxSelectedDark'
              : state.isSelected
              ? 'bg-borderPrimary dark:bg-borderPrimaryDark'
              : ''
          }
`,
        valueContainer: () => 'flex px-[5px] min-h-[40px] gap-1 p-1',
        container: () => 'rounded bg-bgPrimary dark:bg-bgPrimaryDark',
        input: () => (noRemove ? 'max-w-[0px] max-h-[0px]' : ''),
        multiValue: () => 'bg-bgButton dark:bg-bgButtonDark rounded',
        multiValueLabel:
          () => `text-sm px-[5px] py-1 border-borderSecondary dark:border-borderSecondaryDark
          ${
            noRemove
              ? 'border rounded'
              : 'border-l border-y border-borderSecondary dark:border-borderSecondaryDark rounded-l rounded-y'
          }`,
        multiValueRemove: () =>
          noRemove
            ? 'max-w-[0px] max-h-[0px] hidden'
            : 'pr-1 bg-bgButton dark:bg-bgButtonDark rounded-r border-r border-y border-borderSecondary dark:border-borderSecondaryDark',
        noOptionsMessage: () => 'rounded p-2',
        /* clearIndicator: () => ''), */
        /* group: () => '', */
        /* groupHeading: () => '', */
        /* indicators: () => '', */
        /* inputContainer: () => '', */
        /* loadingIndicator: () => '', */
        /* loadingMessage: () => '', */
        /* menuPortal: () => '', */
        /* placeholder: () => '', */
        /* singleValue: () => '', */
        // indicatorSeparator: () => '',
      }}
      unstyled
    />
  );
};

export default SelectCreatable;
