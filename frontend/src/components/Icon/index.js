import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Icon = ({ name, title }) => {
    return (
        <svg className="icon">
            {title && <title>{title}</title>}
            <use xlinkHref={`/icons/icons.svg#${name}`} />
        </svg>
    )
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
}

Icon.defaultProps = {
    title: null,
}

export default Icon
