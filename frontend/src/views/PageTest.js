import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View';
import Wrapper from 'src/components/Wrapper';

//import './style.scss';

const pageTest = (props) => {
  return (
    <View layoutClass="page-test">
      <Wrapper>
        <div>pageTest</div>
      </Wrapper>
    </View>
  );
};

pageTest.propTypes = {};

export default pageTest;
