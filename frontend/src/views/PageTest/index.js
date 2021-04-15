import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View';
import Wrapper from 'src/components/Wrapper';
import Button from 'src/components/Button';

import './style.scss';

const PageTest = (props) => {
  return (
    <View layoutClass="page-test">
      <Wrapper>
        Lorem ipsum test

        <Button appearance="" size="small" route="/">
          test
        </Button>

        <Button appearance="outline" size="small" href="https://www.google.com/">
          test
        </Button>

        <Button appearance="primary" size="small" onClick={()=>{console.log("click bt")}}>
          test
        </Button>

        <Button appearance="primary-outline" size="small" className="special">
          test
        </Button>

        <Button appearance="primary" size="big" icon="userIcon">
          test
        </Button>

        <Button appearance="primary-outline" size="big">
          test
        </Button>

        <Button appearance="secondary" >
          test
        </Button>

        <Button appearance="secondary-outline" >
          test
        </Button>

      </Wrapper>
    </View>
  );
};

PageTest.propTypes = {};

export default PageTest;
