import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

import './style.scss'

const Icon = ({ name, title, classProps }) => {
    const classes = classNames(
        'icon',
        classProps && `${classProps}`,
    )

    return (
        <svg className={classes}>
            {title && <title>{title}</title>}
            <use xlinkHref={`/icons/icons.svg#${name}`} />
        </svg>
    )
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    classProps: PropTypes.string,
}

Icon.defaultProps = {
    title: null,
    classProps: null,
}

export default Icon
