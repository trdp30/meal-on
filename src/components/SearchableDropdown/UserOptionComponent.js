import React, { memo } from 'react';
import PropTypes from 'prop-types';
import User from 'components/base/UserDetails/user';

const UserOptionComponent = props => {
  const { option } = props;
  if (option && option.user) {
    return <User data={option.user} size="xs" border="border-none" />;
  }
  return <></>;
};

UserOptionComponent.propTypes = {
  option: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default memo(UserOptionComponent);
