import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'src/components/Icon'

import './style.scss'

const Loader = ({ size }) => {
    const classes = classNames('loader', size && `loader--${size}`)

    return (
        <div className={classes}>
            <Icon name="spinner" />
        </div>
    )
}

Loader.propTypes = {
    size: PropTypes.string,
}

Loader.defaultProps = {
    size: '',
}

export default Loader
