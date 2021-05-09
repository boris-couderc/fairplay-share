import React, { Children } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const CardsGrid = ({ children }) => {
    return <ul className="cards-container">{children}</ul>
}

CardsGrid.propTypes = {
    children: PropTypes.node.isRequired,
}

export default CardsGrid
