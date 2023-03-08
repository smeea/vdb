import React from 'react';
import AsyncSelect from 'react-select/async';

const SelectAsync = React.forwardRef(
  (
    {
      autoFocus,
      cacheOptions,
      getOptionLabel,
      isClearable,
      loadOptions,
      menuPlacement,
      noDropdown,
      onChange,
      placeholder,
      value,
    },
    ref
  ) => {
    return (
      <AsyncSelect
        isClearable={isClearable}
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
          control: (state) =>
            state.isFocused
              ? 'rounded border border-bgCheckboxSelected dark:border-bgCheckboxSelectedDark'
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
            'my-2 rounded border border-bgThird dark:border-bgThirdDark',
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
          noOptionsMessage: () => 'rounded p-2',
          loadingMessage: () => 'rounded p-2',
          placeholder: () => 'text-midGray dark:text-midGrayDark',
          valueContainer: () =>
            'px-2 min-h-[40px] bg-bgPrimary dark:bg-bgPrimaryDark rounded',
          clearIndicator: () => 'text-lightGray dark:text-lightGrayDark px-2',
          loadingIndicator: () => 'text-lightGray dark:text-lightGrayDark px-2',
        }}
      />
    );
  }
);
SelectAsync.displayName = 'SelectAsync';

export default SelectAsync;
