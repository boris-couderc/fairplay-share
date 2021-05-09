import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Form = ({ children, onSubmit, width, classProps }) => {

    const classes = classNames(
        'form',
        width && `form--${width}`,
        classProps && `${classProps}`,
    )

  return (
   <form className={classes} onSubmit={onSubmit}>
     {children}
   </form>
  );
};

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func,
    width: PropTypes.string,
};

Form.defaultProps = {
    onSubmit: () => {},
    width: null,
}

export default Form;
