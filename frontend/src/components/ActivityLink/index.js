import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ActivityLink = ({ children, isLogged, id, onClick, classProps }) => {
    return (
        <>
            {/* {isLogged ? ( */}
                <Link to={`/activity/${id}`} className={classProps}>
                    {children}
                </Link>
            {/* ) : (
                <div onClick={onClick} className={classProps}>
                    {children}
                </div>
            )} */}
        </>
    )
}

ActivityLink.propTypes = {
    children: PropTypes.node.isRequired,
    isLogged: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    classProps: PropTypes.string,
}

ActivityLink.defaultProps = {
    classProps: '',
}

export default ActivityLink
