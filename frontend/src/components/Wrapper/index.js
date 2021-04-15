import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Wrapper = ({ children, wide }) => {
  const classes = classNames(
    'wrapper',
    {'wrapper--wide': wide}
  )

  return (
    <div className={classes}>
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
