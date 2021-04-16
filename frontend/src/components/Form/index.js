import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Form = ({ children, onSubmit, classProps }) => {

    const classes = classNames(
        'form',
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
};

Form.defaultProps = {
    onSubmit: () => {},
}

export default Form;
