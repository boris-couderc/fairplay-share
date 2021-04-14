import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/containers/Header';
import Footer from 'src/components/Footer';
import LoginModal from 'src/containers/LoginModal';
import Wrapper from 'src/components/Wrapper';

import './style.scss';

const View = ({ children, layoutClass }) => {
  return (
    <>
      <Header />
      <Wrapper>
      <div className={`view ${layoutClass}`}>
        {children}
      </div>
      </Wrapper>
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
