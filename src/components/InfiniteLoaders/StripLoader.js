/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StripLoader = ({ strip }) => {
  const [lineLoader] = useState(Array(strip).fill(''));

  return (
    <div className="animate-pulse">
      <div className="flex-1 space-y-1">
        {lineLoader.map((d, i) => (
          <div key={i} className="h-4 bg-gray-300" />
        ))}
      </div>
    </div>
  );
};

export default StripLoader;

StripLoader.propTypes = {
  strip: PropTypes.number,
};

StripLoader.defaultProps = {
  strip: 1,
};
