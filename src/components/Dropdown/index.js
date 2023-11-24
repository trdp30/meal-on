/**
 *
 * Dropdown
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { get, trim } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames';
import CustomOption from './Option';

function DropdownSearchIndicator(props) {
  if (props.selectProps.isSearchIcon) {
    return (
      <components.DropdownIndicator {...props} className="!p-0">
        <FontAwesomeIcon icon={faSearch} className="text-gray-900" />
      </components.DropdownIndicator>
    );
  }
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faChevronDown} className="text-gray-900 " />
    </components.DropdownIndicator>
  );
}

export const reactSelectDefaultStyles = {
  input: props => ({
    ...props,
    input: {
      boxShadow: 'none !important',
    },
  }),
};

export function Dropdown({
  value,
  isDisabled,
  isLoading,
  isClearable,
  name = 'dropdown',
  options,
  onChange,
  emptyLabel,
  labelKey,
  primaryKey,
  placeholder,
  isSearchable,
  isMulti = false,
  customStyles = {},
  controlShouldRenderValue,
  OptionComponent,
  icon,
  alternateLabelKey,
  customFormatOptionLabel,
  filterOption,
  isSearchIcon = false,
  lightBackground,
}) {
  const noOptionsMessage = () => emptyLabel;

  const formatOptionLabel = option => trim(get(option, labelKey)) || get(option, alternateLabelKey, option);
  const getOptionValue = option => get(option, primaryKey, option);
  return (
    <Select
      value={value}
      isSearchIcon={isSearchIcon}
      onChange={onChange}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      name={name}
      placeholder={placeholder}
      options={options}
      OptionComponent={OptionComponent}
      getOptionValue={getOptionValue}
      getOptionLabel={formatOptionLabel}
      formatOptionLabel={customFormatOptionLabel || formatOptionLabel}
      noOptionsMessage={noOptionsMessage}
      styles={{
        ...reactSelectDefaultStyles,
        ...customStyles,
      }}
      components={{
        Option: CustomOption,
        DropdownIndicator: DropdownSearchIndicator,
      }}
      classNames={{
        control: ({ isFocused }) =>
          classNames(
            'border rounded px-2 py-[3px] !shadow-0 ',
            isFocused ? '!border-blue-300' : '!border-gray-200',
            lightBackground ? '!bg-white' : '!bg-gray-50',
          ),
        placeholder: () => 'text-sm font-normal leading-[16px] !mx-0 !text-gray-400',
        input: () => '!m-0 !p-0',
        indicatorSeparator: () => 'hidden',
        indicatorsContainer: () => 'h-8',
        singleValue: () => 'text-sm font-normal leading-[16px] !mx-0 !text-gray-900',
        valueContainer: () => '!p-0',
        menuList: () => '!p-2 flex flex-col gap-1.5',
        option: ({ isSelected }) =>
          classNames(
            '!px-1.5 !py-2 !text-sm',
            isSelected ? '!bg-blue-50 !text-blue-700' : 'hover:!bg-gray-50 !bg-white',
          ),
      }}
      isMulti={isMulti}
      controlShouldRenderValue={controlShouldRenderValue}
      menuPlacement="auto"
      data-testid={isDisabled ? 'selectDisabled' : 'selectEnabled'}
      indicatorIcon={icon}
      filterOption={filterOption}
      backspaceRemovesValue={false}
    />
  );
}

Dropdown.propTypes = {
  value: PropTypes.any,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  emptyLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelKey: PropTypes.string,
  primaryKey: PropTypes.string,
  isSearchable: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  isMulti: PropTypes.bool,
  controlShouldRenderValue: PropTypes.bool,
  alternateLabelKey: PropTypes.string,
  filterOption: PropTypes.func,
  lightBackground: PropTypes.bool,
};

Dropdown.defaultProps = {
  isSearchable: false,
  isMulti: false,
  controlShouldRenderValue: true,
  alternateLabelKey: 'username',
};

export default memo(Dropdown);
