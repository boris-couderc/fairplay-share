import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const UserVerification = ({ isLogged, checkLocalStorageUser, isCheckedLoginLocalStorage }) => {

    useEffect(() => {
        if(!isLogged && !isCheckedLoginLocalStorage) {
            checkLocalStorageUser()
        }
    }, [])

    return null;
};

UserVerification.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    checkLocalStorageUser: PropTypes.func.isRequired,
    isCheckedLoginLocalStorage: PropTypes.bool.isRequired,
};

export default UserVerification;
