import React from 'react';
import ReactSelect from 'react-select';

const Select = React.forwardRef(
  (
    {
      defaultMenuIsOpen = false,
      autoFocus = false,
      filterOption,
      isClearable = false,
      isDisabled = false,
      isSearchable,
      maxMenuHeight,
      menuPlacement,
      name,
      noBorder,
      noDropdown,
      onChange,
      options,
      placeholder,
      value,
      borderStyle = 'border',
      roundedStyle = 'rounded',
    },
    ref
  ) => {
    return (
      <ReactSelect
        defaultMenuIsOpen={defaultMenuIsOpen}
        autoFocus={autoFocus}
        filterOption={filterOption}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        maxMenuHeight={maxMenuHeight}
        menuPlacement={menuPlacement}
        name={name}
        onChange={onChange}
        options={options}
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
          placeholder: () => 'text-midGray dark:text-midGrayDark',
          valueContainer: () =>
            'px-2 min-h-[40px] text-fgPrimary dark:text-fgPrimaryDark bg-bgPrimary dark:bg-bgPrimaryDark rounded',
          noOptionsMessage: () => 'rounded p-2',
          clearIndicator: () => 'text-lightGray dark:text-lightGrayDark pr-2',
        }}
      />
    );
  }
);
Select.displayName = 'Select';

export default Select;
