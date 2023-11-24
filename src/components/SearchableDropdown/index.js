/* eslint-disable react/no-unstable-nested-components */
import React, { memo, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { get } from 'lodash';
import fetchData from 'utils/fetchData';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import classNames from 'classnames';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import CustomOption from './Option';

export const reactSelectDefaultStyles = {
  input: props => ({
    ...props,
    input: {
      boxShadow: 'none !important',
    },
  }),
};

// eslint-disable-next-line no-shadow
function DropdownIndicator(props) {
  if (props.selectProps.isSearchIcon) {
    return (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faSearch} className="text-gray-600 w-[18px] h-[18px]" />
      </components.DropdownIndicator>
    );
  }
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faChevronDown} className="text-gray-600" />
    </components.DropdownIndicator>
  );
}

function RemoteDropdown(props) {
  const {
    placeholder,
    labelKey,
    isMulti = false,
    primaryKey,
    selectedItems,
    setSelected,
    emptyLabel,
    OptionComponent,
    value,
    isDisabled,
    query,
    controlShouldRenderValue = true,
    isClearable,
    customFormatOptionLabel,
    customStyles = {},
    isSearchIcon = false,
  } = props;
  const { queryString, queryKey, queryVariables = {} } = query;

  const loadComponent = useMemo(() => queryString && queryKey, [query]);

  const formatOptionLabel = option => get(option, labelKey, option);
  const getOptionValue = option => get(option, primaryKey, option);

  const handleChange = data => {
    setSelected(data);
  };
  const timer = useRef(null);

  const loadOptions = (searchText, callback) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      clearTimeout(timer.current);
      const response = await fetchData({
        queryString,
        queryKey,
        queryVariables: {
          searchString: searchText ? `%${searchText}%` : '%%',
          ...queryVariables,
        },
      });
      callback(response);
    }, 500);
  };

  const noOptionsMessage = () => emptyLabel;

  if (loadComponent) {
    return (
      <AsyncSelect
        onChange={handleChange}
        value={value}
        isSearchIcon={isSearchIcon}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable
        isMulti={isMulti}
        cacheOptions
        placeholder={placeholder}
        loadOptions={loadOptions}
        defaultOptions
        noOptionsMessage={noOptionsMessage}
        selectedOptions={selectedItems}
        primaryKey={primaryKey}
        labelKey={labelKey}
        OptionComponent={OptionComponent}
        components={{ Option: CustomOption, DropdownIndicator }}
        controlShouldRenderValue={controlShouldRenderValue}
        formatOptionLabel={customFormatOptionLabel || formatOptionLabel}
        styles={{ ...reactSelectDefaultStyles, ...customStyles }}
        getOptionValue={getOptionValue}
        className="chromatic-ignore"
        classNames={{
          control: ({ isFocused }) =>
            classNames(
              'border rounded px-1.5 !shadow-0 !bg-gray-50',
              isFocused ? '!border-blue-300' : '!border-gray-200',
            ),
          placeholder: () => 'text-sm font-normal leading-1 !mx-0 !text-gray-400',
          singleValue: () => 'text-sm font-normal leading-1 !mx-0 !text-gray-900',
          valueContainer: () => '!p-0',
          input: () => '!m-0 !shadow-0',
          indicatorContainer: () => '!p-0',
          indicatorSeparator: () => '!w-0',
          menuList: () => '!p-2 flex flex-col gap-1.5',
          option: ({ isSelected }) =>
            classNames(
              '!px-1.5 !py-2 !text-sm',
              isSelected ? '!bg-blue-50 !text-blue-700' : 'hover:!bg-gray-50 !bg-white',
            ),
        }}
      />
    );
  }
  return <></>;
}

RemoteDropdown.propTypes = {
  OptionComponent: PropTypes.any,
  value: PropTypes.any,
  setSelected: PropTypes.func,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  selectedItems: PropTypes.any,
  primaryKey: PropTypes.string,
  isDisabled: PropTypes.bool,
  emptyLabel: PropTypes.any,
  query: PropTypes.shape({
    queryString: PropTypes.string.isRequired,
    queryKey: PropTypes.string.isRequired,
    queryVariables: PropTypes.object,
  }).isRequired,
  isClearable: PropTypes.bool,
  customFormatOptionLabel: PropTypes.func,
  controlShouldRenderValue: PropTypes.bool,
};

RemoteDropdown.defaultProps = {
  isClearable: false,
};

export default memo(RemoteDropdown);
