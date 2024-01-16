import React from 'react';
import AsyncSelect from 'react-select/async';

const SelectAsync = React.forwardRef(
  (
    {
      autoFocus,
      cacheOptions,
      getOptionLabel,
      isClearable = false,
      isDisabled = false,
      loadOptions,
      menuPlacement,
      noBorder,
      noDropdown,
      onChange,
      placeholder,
      value,
      borderStyle = 'border',
      roundedStyle = 'rounded',
    },
    ref
  ) => {
    return (
      <AsyncSelect
        autoFocus={autoFocus}
        cacheOptions={cacheOptions}
        getOptionLabel={getOptionLabel}
        isClearable={isClearable}
        isDisabled={isDisabled}
        loadOptions={loadOptions}
        menuPlacement={menuPlacement}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        unstyled
        value={value}
        classNames={{
          control: (state) => `
            ${
              noBorder
                ? ''
                : state.isFocused
                ? `${roundedStyle} ${borderStyle} bg-bgPrimary dark:bg-bgPrimaryDark border-bgCheckboxSelected dark:border-bgCheckboxSelectedDark`
                : `${roundedStyle} ${borderStyle} bg-bgPrimary dark:bg-bgPrimaryDark border-borderSecondary dark:border-borderSecondaryDark`
            }`,
          dropdownIndicator: () =>
            noDropdown
              ? 'max-w-[0px] max-h-[0px]'
              : 'px-2 text-borderSecondary dark:text-borderSecondaryDark',
          indicatorsContainer: () => `rounded
            ${noDropdown ? 'max-h-[0px] max-w-[0px]' : 'py-1.5 '}`,
          indicatorSeparator: () =>
            'bg-borderSecondary dark:bg-borderSecondaryDark',
          menu: () =>
            'my-2 rounded border border-borderThird dark:border-borderThirdDark',
          menuList: () => 'bg-bgPrimary dark:bg-bgPrimaryDark',
          option: (state) => `p-2 text-fgPrimary dark:text-fgPrimaryDark
          ${
            state.isFocused
              ? 'bg-borderPrimary dark:bg-bgCheckboxSelectedDark'
              : state.isSelected
              ? 'bg-borderSecondary dark:bg-borderPrimaryDark'
              : ''
          }
`,
          noOptionsMessage: () => 'rounded p-2',
          loadingMessage: () => 'rounded p-2',
          placeholder: () => 'text-midGray dark:text-midGrayDark',
          valueContainer: () =>
            'px-2 min-h-[40px] text-fgPrimary dark:text-fgPrimaryDark bg-bgPrimary dark:bg-bgPrimaryDark rounded',
          clearIndicator: () => 'text-lightGray dark:text-lightGrayDark pr-2',
          loadingIndicator: () => 'text-lightGray dark:text-lightGrayDark pr-2',
        }}
      />
    );
  }
);
SelectAsync.displayName = 'SelectAsync';

export default SelectAsync;
