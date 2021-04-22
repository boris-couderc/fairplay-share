import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
 
const CardLink = ({ children, isLogged, id, onClick }) => { 
    return (
        <>
            {isLogged ? (
                <Link to={`/activity/${id}`} className="card__link">
                    {children}
                </Link>
            ) : ( 
                <div onClick={onClick} className="card__link">
                    {children}
                </div>
            )}
        </>
    )
}

PropTypes.PropTypes = {
    children: PropTypes.node.isRequired,
    isLogged: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default CardLink