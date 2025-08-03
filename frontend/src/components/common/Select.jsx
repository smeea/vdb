import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import ReactSelectCreatable from "react-select/creatable";
import { twMerge } from "tailwind-merge";
import { useApp } from "@/context";

const Select = ({
  autoFocus = false,
  borderStyle = "border",
  textStyle,
  className,
  defaultMenuIsOpen = false,
  filterOption,
  isClearable = false,
  isDisabled = false,
  isSearchable = false,
  minMenuHeight,
  maxMenuHeight,
  menuHeight,
  menuPlacement = "auto",
  menuShouldScrollIntoView = true,
  name,
  noBorder,
  noDropdown,
  onChange,
  noMinHeight = false,
  options,
  placeholder,
  roundedStyle = "rounded-sm",
  value,
  variant = "select",
  justifyRight,
  ref,
  noBackground,

  // Async
  cacheOptions,
  getOptionLabel,
  loadOptions,

  // Creatable
  isMulti,
  noOptionsMessage,
  noRemove,
}) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const defaultMaxWidth = isWide ? 500 : isDesktop ? 450 : isMobile ? 350 : 400;

  let Component;
  switch (variant) {
    case "async":
      Component = AsyncSelect;
      break;
    case "creatable":
      Component = ReactSelectCreatable;
      break;
    default:
      Component = ReactSelect;
  }

  return (
    <Component
      autoFocus={autoFocus}
      defaultMenuIsOpen={defaultMenuIsOpen}
      filterOption={filterOption}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      minMenuHeight={menuHeight || minMenuHeight}
      maxMenuHeight={menuHeight || maxMenuHeight || defaultMaxWidth}
      menuShouldScrollIntoView={menuShouldScrollIntoView}
      menuPlacement={menuPlacement}
      name={name}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      ref={ref}
      unstyled
      value={value}
      classNames={{
        control: (state) =>
          twMerge(
            !noBackground && "bg-bgPrimary dark:bg-bgPrimaryDark",
            !noBorder && roundedStyle,
            !noBorder &&
            (state.isFocused
              ? "border-bgCheckboxSelected dark:border-bgCheckboxSelectedDark"
              : "border-borderSecondary dark:border-borderSecondaryDark"),
            !noBorder && borderStyle,
          ),
        dropdownIndicator: () =>
          noDropdown
            ? "max-w-0 max-h-0"
            : "px-2 text-borderSecondary dark:text-borderSecondaryDark",
        indicatorsContainer: () =>
          twMerge("cursor-pointer rounded-sm", noDropdown ? "max-h-0 max-w-0" : "py-1.5 "),
        indicatorSeparator: () => "bg-borderSecondary dark:bg-borderSecondaryDark",
        menu: () => "my-2 rounded-sm border border-borderThird dark:border-borderThirdDark",
        menuList: () => "rounded-sm bg-bgPrimary dark:bg-bgPrimaryDark",
        option: (state) =>
          twMerge(
            "p-2 text-fgPrimary dark:text-fgPrimaryDark",
            state.isFocused
              ? "bg-borderPrimary dark:bg-bgCheckboxSelectedDark"
              : state.isSelected && "bg-borderSecondary dark:bg-borderPrimaryDark",
          ),
        container: () =>
          twMerge(!noBackground && "bg-bgPrimary dark:bg-bgPrimaryDark", roundedStyle, className),
        placeholder: () => "text-midGray dark:text-midGrayDark",
        /* no bg- in creatable */
        valueContainer: () =>
          twMerge(
            "cursor-pointer rounded-sm",
            textStyle ?? "text-fgPrimary dark:text-fgPrimaryDark",
            !noBackground && "bg-bgPrimary dark:bg-bgPrimaryDark",
            justifyRight && "justify-end",
            !noMinHeight && "min-h-[40px]",
            variant === "creatable" && !noBorder && "p-1.5",
            variant === "creatable" ? "gap-1" : "px-2",
          ),
        noOptionsMessage: () => "rounded-sm p-2",
        clearIndicator: () => "text-lightGray dark:text-lightGrayDark pr-2",
        /* Async */
        loadingMessage: () => "rounded-sm p-2",
        loadingIndicator: () => "text-lightGray dark:text-lightGrayDark pr-2",
        /* Creatable */
        input: () => (noRemove ? "max-w-0 max-h-0" : ""),
        multiValue: () => "bg-bgButton dark:bg-bgButtonDark rounded-sm",
        multiValueLabel: () =>
          twMerge(
            "text-sm px-1.5 py-1 border-borderSecondary dark:border-borderSecondaryDark",
            noRemove
              ? "border rounded-sm"
              : "border-l border-y border-borderSecondary dark:border-borderSecondaryDark rounded-l rounded-y",
          ),
        multiValueRemove: () =>
          noRemove
            ? "max-w-0 max-h-0 hidden"
            : "pr-1 bg-bgButton dark:bg-bgButtonDark rounded-r border-r border-y border-borderSecondary dark:border-borderSecondaryDark",
      }}
      // Async
      cacheOptions={cacheOptions}
      getOptionLabel={getOptionLabel}
      loadOptions={loadOptions}
      // Creatable
      isMulti={isMulti}
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default Select;
