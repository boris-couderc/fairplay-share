import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from 'src/components/Wrapper';

import './style.scss';

const Footer = () => (
  <footer className="footer">
    <Wrapper wide>
      <div className="footer__content">
        <p className="footer__copyright">FairPlay © 2020 - Tous droits réservés</p>
        <ul className="footer__links">
        <Link to="/equipe"><li>Equipe</li></Link>
        <Link to="#"><li>Contact</li></Link>
        <Link to="#"><li>CGU</li></Link>
        </ul>
      </div>
    </Wrapper>
  </footer>
);

export default Footer;
