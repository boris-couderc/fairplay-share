import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/containers/Header';
import Footer from 'src/components/Footer';
import LoginModal from 'src/containers/LoginModal';

import './style.scss';

const View = ({ children, layoutClass }) => {
  return (
    <>
      <Header />
      <main className={`view ${layoutClass}`}>
        {children}
      </main>
      <Footer />
      <LoginModal />
    </>
  );
};

View.propTypes = {
  children: PropTypes.node.isRequired,
};

View.defaultProps = {
  layoutClass: '',
};

export default View;
