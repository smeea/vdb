import React from 'react';
import ReactSelect from 'react-select';

const Select = React.forwardRef(
  (
    {
      filterOption,
      isSearchable,
      maxMenuHeight,
      menuPlacement,
      noBorder,
      noDropdown,
      onChange,
      options,
      placeholder,
      name,
      value,
    },
    ref
  ) => {
    return (
      // TODO add outline
      // dark:outline-bgCheckboxSelectedDark focus:outline outline-1 outline-bgCheckboxSelected
      <ReactSelect
        filterOption={filterOption}
        isSearchable={isSearchable}
        maxMenuHeight={maxMenuHeight}
        menuPlacement={menuPlacement}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        ref={ref}
        name={name}
        unstyled
        value={value}
        classNames={{
          control: (state) => `
            ${
              noBorder
                ? ''
                : state.isFocused
                ? 'rounded border border-bgCheckboxSelected dark:border-bgCheckboxSelectedDark'
                : 'rounded border border-borderSecondary dark:border-borderSecondaryDark'
            }`,
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
          placeholder: () => 'text-midGray dark:text-midGrayDark',
          valueContainer: () =>
            'px-2 min-h-[40px] bg-bgPrimary dark:bg-bgPrimaryDark rounded',
          noOptionsMessage: () => 'rounded p-2',
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
Select.displayName = 'Select';

export default Select;
