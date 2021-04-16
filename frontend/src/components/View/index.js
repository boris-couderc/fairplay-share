import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/containers/Header';
import Footer from 'src/components/Footer';
import LoginModal from 'src/containers/LoginModal';

import './style.scss';

const View = ({ children, layoutClass }) => {
  return (
    <div className={`view view--${layoutClass}`}>
      <Header />
      <main className="main">
        {children}
      </main>
      <Footer />
      <LoginModal />
    </div>
  );
};

View.propTypes = {
  children: PropTypes.node.isRequired,
};

View.defaultProps = {
  layoutClass: '',
};

export default View;
