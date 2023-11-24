import React, { memo } from 'react';
import { components } from 'react-select';

const Option = props => {
  const {
    selectProps: { OptionComponent, primaryKey, labelKey },
  } = props;
  return (
    <components.Option {...props}>
      {OptionComponent ? (
        React.cloneElement(OptionComponent, {
          key: props.data[String(primaryKey)],
          data: props.data,
          primaryKey,
          labelKey,
          ...props,
        })
      ) : (
        <>{props.children}</>
      )}
    </components.Option>
  );
};

export default memo(Option);
