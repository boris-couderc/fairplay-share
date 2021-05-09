import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss'

const Heading = ({ children, el, like, classProps}) => {
    const El = el

    const classes = classNames(
        'heading',
        like ? `heading--${like}` : `heading--${el}`,
        classProps && `${classProps}`,
    )

    return <El className={classes}>{children}</El>
}

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    el: PropTypes.string,
    like: PropTypes.string,
    classProps: PropTypes.string,
}

Heading.defaultProps = {
    el: 'p',
    like: null,
    classProps: null,
}

export default Heading
