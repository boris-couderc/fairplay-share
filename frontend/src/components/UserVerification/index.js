import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const UserVerification = ({ isLogged, isLoadingUser, checkLocalStorageUser, isCheckedLoginLocalStorage }) => {

    useEffect(() => {
        console.log('render UserVerification')
    })

    useEffect(() => {
        if(!isLogged && !isCheckedLoginLocalStorage) {
            console.log('checkLocalStorageUser')
            checkLocalStorageUser()
        }
    }, [])

    return null;
};

UserVerification.propTypes = {
  
};

export default UserVerification;
