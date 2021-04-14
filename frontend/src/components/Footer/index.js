import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from 'src/components/Wrapper';

import './style.scss';

const Footer = () => (
  <footer className="footer">
    <Wrapper wide>
      <div className="footer__content">
        <p className="footer__copyright">FairPlay © 2021 - Tous droits réservés</p>
        <ul className="footer__links">
          <li><Link to="/equipe">Equipe</Link></li>
          <li><a href="mailto:couderc.boris@gmail.com">Contact</a></li>
        </ul>
      </div>
    </Wrapper>
  </footer>
);

export default Footer;
