import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Wrapper = ({ children, wide }) => {
  return (
   <div className={`wrapper ${wide ? 'wrapper--wide' : ''}`}>
     {children}
   </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  wide: PropTypes.bool,
};

Wrapper.defaultProps = {
  wide: false,
}

export default Wrapper;
