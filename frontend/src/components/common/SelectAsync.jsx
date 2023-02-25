import React from 'react';
import AsyncSelect from 'react-select/async';

const SelectAsync = React.forwardRef(
  (
    {
      autoFocus,
      cacheOptions,
      getOptionLabel,
      loadOptions,
      noBorder,
      noDropdown,
      onChange,
      placeholder,
      menuPlacement,
      value,
    },
    ref
  ) => {
    return (
      // TODO add outline
      // dark:outline-bgCheckboxSelectedDark focus:outline outline-bgCheckboxSelected
      <AsyncSelect
        autoFocus={autoFocus}
        cacheOptions={cacheOptions}
        getOptionLabel={getOptionLabel}
        loadOptions={loadOptions}
        menuPlacement={menuPlacement}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        unstyled
        value={value}
        classNames={{
          container: () => 'rounded bg-bgPrimary dark:bg-bgPrimaryDark',
          control: () =>
            noBorder
              ? ''
              : 'rounded border border-borderSecondary dark:border-borderSecondaryDark',
          dropdownIndicator: () =>
            noDropdown
              ? 'max-w-[0px] max-h-[0px]'
              : 'px-2 text-borderSecondary dark:text-borderSecondaryDark',
          indicatorsContainer: () =>
            noDropdown ? 'max-h-[0px] max-w-[0px]' : 'py-1.5 ',
          indicatorSeparator: () =>
            'bg-borderSecondary dark:bg-borderSecondaryDark',
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
          valueContainer: () =>
            'px-2 min-h-[40px] bg-bgPrimary dark:bg-bgPrimaryDark rounded',
          /* clearIndicator: '', */
          /* group: () => '', */
          /* groupHeading: () => '', */
          /* indicators: () => '', */
          /* input: () => '', */
          /* loadingIndicator: () => '', */
          /* loadingMessage: () => '', */
          /* menuPortal: () => '', */
          /* multiValue: () => '', */
          /* multiValueLabel: () => '', */
          /* multiValueRemove: () => '', */
          /* singleValue: () => '', */
        }}
      />
    );
  }
);
SelectAsync.displayName = 'SelectAsync';

export default SelectAsync;
