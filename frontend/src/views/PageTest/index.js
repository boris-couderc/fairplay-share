import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View';
import Wrapper from 'src/components/Wrapper';

import './style.scss';

const PageTest = (props) => {
  return (
    <View layoutClass="page-test">
      <Wrapper>
        Lorem ipsum
      </Wrapper>
    </View>
  );
};

PageTest.propTypes = {};

export default PageTest;
