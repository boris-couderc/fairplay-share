import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'src/components/Icon'

import './style.scss'

const Loader = ({ size, classProps }) => {
    const classes = classNames(
        'loader', 
        size && `loader--${size}`,
        classProps && `${classProps}`,
    )

    return (
        <div className={classes}>
            <Icon name="spinner" />
        </div>
    )
}

Loader.propTypes = {
    size: PropTypes.string,
    classProps: PropTypes.string,
}

Loader.defaultProps = {
    size: null,
    classProps: null,
}

export default Loader
