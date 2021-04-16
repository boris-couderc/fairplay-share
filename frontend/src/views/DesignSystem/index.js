import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/View';
import Wrapper from 'src/components/Wrapper';
import Button from 'src/components/Button';
import Heading from 'src/components/Heading';

import './style.scss';

const PageTest = (props) => {
  return (
    <View layoutClass="page-test">
      <Wrapper>
        
        <Heading el="h1">
            Design system
        </Heading>

        <Heading el="h2">
            Buttons
        </Heading>

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
        <Button appearance="primary" route="/inscription">
            Inscription
        </Button>

        <Heading el="h2">
            Icons
        </Heading>

        {/* <Icon name="account" />
        <Icon name="checkmark" />
        <Icon name="clock" />
        <Icon name="cross" />
        <Icon name="grade" />
        <Icon name="pencil" />
        <Icon name="pin" /> */}

        <Heading el="h2">
            Heading
        </Heading>

        <Heading el="h1">
            Heading h1
        </Heading>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <Heading el="h2">
            Heading h2
        </Heading>
        <Heading el="h3">
            Heading h3
        </Heading>
        <Heading el="h4">
            Heading h4
        </Heading>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      </Wrapper>
    </View>
  );
};

PageTest.propTypes = {};

export default PageTest;
