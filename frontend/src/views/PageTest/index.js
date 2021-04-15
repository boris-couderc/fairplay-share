import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View';
import Wrapper from 'src/components/Wrapper';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';

import './style.scss';

const PageTest = (props) => {
  return (
    <View layoutClass="page-test">
      <Wrapper>
        Lorem ipsum test

        <Button appearance="" size="small" route="/" icon="clock">
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

        <Button appearance="primary" size="big" icon="account">
          test avec icon
        </Button>

        <Button appearance="primary-outline" size="big">
          test
        </Button>

        <Button appearance="secondary">
          test
        </Button>

        <Button appearance="secondary-outline" icon="pin">
          test
        </Button>

        <br />

        <Button appearance="primary" onClick={()=>{console.log("click bt")}}>
          test
        </Button>

        <Button 
            appearance="primary"
            route="/inscription"
        >
            Inscription
        </Button>

        {/* <Icon name="account" />
        <Icon name="checkmark" />
        <Icon name="clock" />
        <Icon name="cross" />
        <Icon name="grade" />
        <Icon name="pencil" />
        <Icon name="pin" /> */}

      </Wrapper>
    </View>
  );
};

PageTest.propTypes = {};

export default PageTest;
