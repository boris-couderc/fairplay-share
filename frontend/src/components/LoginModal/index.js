import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {Link} from 'react-router-dom';

import cross from 'src/assets/icons/cross.svg';

const LoginModal = ({ displayed, closeModal }) => {

  return (
    <>
      {displayed && (
        <div className="modal">
          <div className="modal__container">
            <img onClick={closeModal} src={cross} alt="" className="icon modal__bt-close" />
            <div onClick={closeModal}>inscrivez vous pour rejoindre cette activité !</div>
            <Link onClick={closeModal} to="/connexion" className="modal__signup">
              Inscription
            </Link>
            <Link onClick={closeModal} to="/connexion" className="modal__login">
              connexion
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

LoginModal.propTypes = {
  displayed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
